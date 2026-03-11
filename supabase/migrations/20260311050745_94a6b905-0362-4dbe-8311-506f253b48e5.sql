
-- Create app roles enum
CREATE TYPE public.app_role AS ENUM ('author', 'reviewer', 'editor');

-- Create manuscript status enum
CREATE TYPE public.manuscript_status AS ENUM (
  'submitted', 'under_review', 'in_peer_review', 'revision_required', 
  'revised', 'accepted', 'rejected', 'published'
);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by authenticated users" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roles" ON public.user_roles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Editors can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'editor'));

-- Manuscripts table (no cross-ref policies yet)
CREATE TABLE public.manuscripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  article_type TEXT NOT NULL,
  abstract TEXT NOT NULL,
  keywords TEXT NOT NULL,
  corresponding_author TEXT NOT NULL,
  email TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  co_authors TEXT DEFAULT '',
  cover_letter TEXT DEFAULT '',
  file_url TEXT,
  status manuscript_status NOT NULL DEFAULT 'submitted',
  assigned_editor_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authors can view own manuscripts" ON public.manuscripts
  FOR SELECT TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Authors can insert manuscripts" ON public.manuscripts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own manuscripts" ON public.manuscripts
  FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Editors can view all manuscripts" ON public.manuscripts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors can update all manuscripts" ON public.manuscripts
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'editor'));

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id UUID NOT NULL REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recommendation TEXT CHECK (recommendation IN ('accept', 'minor_revision', 'major_revision', 'reject')),
  comments TEXT,
  confidential_comments TEXT,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE (manuscript_id, reviewer_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviewers can view own reviews" ON public.reviews
  FOR SELECT TO authenticated USING (auth.uid() = reviewer_id);
CREATE POLICY "Reviewers can update own reviews" ON public.reviews
  FOR UPDATE TO authenticated USING (auth.uid() = reviewer_id);
CREATE POLICY "Editors can manage all reviews" ON public.reviews
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Authors can view completed reviews" ON public.reviews
  FOR SELECT TO authenticated USING (
    is_completed = true AND EXISTS (
      SELECT 1 FROM public.manuscripts WHERE manuscripts.id = reviews.manuscript_id AND manuscripts.author_id = auth.uid()
    )
  );

-- Now add cross-ref policy on manuscripts
CREATE POLICY "Reviewers can view assigned manuscripts" ON public.manuscripts
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.reviews 
      WHERE reviews.manuscript_id = manuscripts.id 
      AND reviews.reviewer_id = auth.uid()
    )
  );

-- Status history table
CREATE TABLE public.manuscript_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id UUID NOT NULL REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  old_status manuscript_status,
  new_status manuscript_status NOT NULL,
  changed_by UUID NOT NULL REFERENCES auth.users(id),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.manuscript_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authors can view own manuscript history" ON public.manuscript_status_history
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.manuscripts WHERE manuscripts.id = manuscript_id AND manuscripts.author_id = auth.uid())
  );
CREATE POLICY "Editors can view all history" ON public.manuscript_status_history
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Editors can insert history" ON public.manuscript_status_history
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'editor'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_manuscripts_updated_at
  BEFORE UPDATE ON public.manuscripts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for manuscript files
INSERT INTO storage.buckets (id, name, public) VALUES ('manuscripts', 'manuscripts', false);

CREATE POLICY "Users can upload manuscript files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'manuscripts' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own manuscript files" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'manuscripts' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Editors can view all manuscript files" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'manuscripts' AND public.has_role(auth.uid(), 'editor'));
