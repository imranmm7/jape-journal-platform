import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Users, CheckCircle, Clock } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

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

export function EditorDashboard() {
  const [manuscripts, setManuscripts] = useState<Tables<"manuscripts">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("manuscripts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setManuscripts(data ?? []);
        setLoading(false);
      });
  }, []);

  const stats = {
    total: manuscripts.length,
    pending: manuscripts.filter((m) => m.status === "submitted").length,
    inReview: manuscripts.filter((m) => ["under_review", "in_peer_review"].includes(m.status)).length,
    decided: manuscripts.filter((m) => ["accepted", "rejected", "published"].includes(m.status)).length,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Editorial Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <FileText className="mx-auto text-primary mb-2" size={24} />
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <Clock className="mx-auto text-yellow-600 mb-2" size={24} />
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <Users className="mx-auto text-blue-600 mb-2" size={24} />
            <p className="text-2xl font-bold">{stats.inReview}</p>
            <p className="text-xs text-muted-foreground">In Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-2" size={24} />
            <p className="text-2xl font-bold">{stats.decided}</p>
            <p className="text-xs text-muted-foreground">Decided</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase text-muted-foreground">All Manuscripts</h3>
          {manuscripts.map((m) => (
            <Card key={m.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link to={`/manuscript/${m.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">
                    {m.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {m.corresponding_author} • {new Date(m.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{statusLabels[m.status] ?? m.status}</Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/manuscript/${m.id}`}>Manage</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
