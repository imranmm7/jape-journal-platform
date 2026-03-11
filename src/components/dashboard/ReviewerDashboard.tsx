import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardCheck, FileText } from "lucide-react";

interface ReviewWithManuscript {
  id: string;
  manuscript_id: string;
  is_completed: boolean;
  assigned_at: string;
  recommendation: string | null;
  manuscripts: { title: string; article_type: string } | null;
}

export function ReviewerDashboard() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewWithManuscript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("reviews")
      .select("id, manuscript_id, is_completed, assigned_at, recommendation, manuscripts(title, article_type)")
      .eq("reviewer_id", user.id)
      .order("assigned_at", { ascending: false })
      .then(({ data }) => {
        setReviews((data as unknown as ReviewWithManuscript[]) ?? []);
        setLoading(false);
      });
  }, [user]);

  const pending = reviews.filter((r) => !r.is_completed);
  const completed = reviews.filter((r) => r.is_completed);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <ClipboardCheck size={22} className="text-primary" /> Review Assignments
      </h2>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : reviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">No review assignments</h3>
            <p className="text-muted-foreground">You'll be notified when a manuscript is assigned to you.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {pending.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase text-muted-foreground mb-3">Pending Reviews ({pending.length})</h3>
              <div className="space-y-3">
                {pending.map((r) => (
                  <Card key={r.id} className="border-l-4 border-l-yellow-500">
                    <CardContent className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{r.manuscripts?.title ?? "Untitled"}</p>
                        <p className="text-sm text-muted-foreground">Assigned: {new Date(r.assigned_at).toLocaleDateString()}</p>
                      </div>
                      <Button asChild size="sm">
                        <Link to={`/review/${r.id}`}>Submit Review</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {completed.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase text-muted-foreground mb-3">Completed ({completed.length})</h3>
              <div className="space-y-3">
                {completed.map((r) => (
                  <Card key={r.id} className="opacity-75">
                    <CardContent className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{r.manuscripts?.title ?? "Untitled"}</p>
                        <p className="text-sm text-muted-foreground">{new Date(r.assigned_at).toLocaleDateString()}</p>
                      </div>
                      <Badge variant="secondary">{r.recommendation?.replace("_", " ") ?? "Done"}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
