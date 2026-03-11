import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [review, setReview] = useState<Tables<"reviews"> | null>(null);
  const [manuscript, setManuscript] = useState<Tables<"manuscripts"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState("");
  const [comments, setComments] = useState("");
  const [confidentialComments, setConfidentialComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id || !user) return;
    supabase.from("reviews").select("*").eq("id", id).single().then(async ({ data: rev }) => {
      if (rev) {
        setReview(rev);
        setComments(rev.comments ?? "");
        setConfidentialComments(rev.confidential_comments ?? "");
        setRecommendation(rev.recommendation ?? "");
        const { data: ms } = await supabase.from("manuscripts").select("*").eq("id", rev.manuscript_id).single();
        setManuscript(ms);
      }
      setLoading(false);
    });
  }, [id, user]);

  if (authLoading || loading) return <Layout><Skeleton className="h-64 w-full" /></Layout>;
  if (!user) return <Navigate to="/login" replace />;
  if (!review || !manuscript) return <Layout><p>Review not found.</p></Layout>;

  const handleSubmit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("reviews").update({
      recommendation,
      comments,
      confidential_comments: confidentialComments,
      is_completed: true,
      completed_at: new Date().toISOString(),
    }).eq("id", review.id);

    if (error) { toast.error(error.message); }
    else { toast.success("Review submitted!"); navigate("/dashboard"); }
    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="max-w-3xl">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold mb-2">Peer Review</h1>
        <p className="text-muted-foreground mb-6">Manuscript: {manuscript.title}</p>

        <Card className="mb-6">
          <CardHeader><CardTitle className="text-lg">Abstract</CardTitle></CardHeader>
          <CardContent><p className="text-sm leading-relaxed">{manuscript.abstract}</p></CardContent>
        </Card>

        {review.is_completed ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-lg font-semibold text-primary">Review already submitted</p>
              <p className="text-muted-foreground mt-2">Recommendation: {review.recommendation?.replace("_", " ")}</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader><CardTitle className="text-lg">Your Review</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Recommendation *</Label>
                <Select value={recommendation} onValueChange={setRecommendation}>
                  <SelectTrigger><SelectValue placeholder="Select recommendation" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accept">Accept</SelectItem>
                    <SelectItem value="minor_revision">Minor Revision</SelectItem>
                    <SelectItem value="major_revision">Major Revision</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Comments to Author *</Label>
                <Textarea rows={6} value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Provide detailed feedback..." />
              </div>
              <div>
                <Label>Confidential Comments to Editor</Label>
                <Textarea rows={3} value={confidentialComments} onChange={(e) => setConfidentialComments(e.target.value)} placeholder="Optional notes for the editor only..." />
              </div>
              <Button onClick={handleSubmit} disabled={!recommendation || !comments || submitting} className="w-full">
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
