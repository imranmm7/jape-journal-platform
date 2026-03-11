import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Plus, Clock } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

const statusColors: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  in_peer_review: "bg-orange-100 text-orange-800",
  revision_required: "bg-red-100 text-red-800",
  revised: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-destructive/10 text-destructive",
  published: "bg-primary/10 text-primary",
};

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  in_peer_review: "In Peer Review",
  revision_required: "Revision Required",
  revised: "Revised",
  accepted: "Accepted",
  rejected: "Rejected",
  published: "Published",
};

export function AuthorDashboard() {
  const { user } = useAuth();
  const [manuscripts, setManuscripts] = useState<Tables<"manuscripts">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("manuscripts")
      .select("*")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setManuscripts(data ?? []);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Manuscripts</h2>
        <Button asChild>
          <Link to="/submit"><Plus size={18} className="mr-2" />New Submission</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : manuscripts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">No manuscripts yet</h3>
            <p className="text-muted-foreground mb-4">Submit your first manuscript to get started.</p>
            <Button asChild><Link to="/submit">Submit Manuscript</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {manuscripts.map((m) => (
            <Card key={m.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <Link to={`/manuscript/${m.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">
                      {m.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={14} />{new Date(m.created_at).toLocaleDateString()}</span>
                      <span>{m.article_type.replace("-", " ")}</span>
                    </div>
                  </div>
                  <Badge className={statusColors[m.status] ?? ""} variant="secondary">
                    {statusLabels[m.status] ?? m.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
