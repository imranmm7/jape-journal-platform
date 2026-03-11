import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { FileText, User, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function ManuscriptDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, roles, loading: authLoading } = useAuth();
  const [manuscript, setManuscript] = useState<Tables<"manuscripts"> | null>(null);
  const [history, setHistory] = useState<Tables<"manuscript_status_history">[]>([]);
  const [reviews, setReviews] = useState<Tables<"reviews">[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");

  const isEditor = roles.includes("editor");

  useEffect(() => {
    if (!id || !user) return;
    Promise.all([
      supabase.from("manuscripts").select("*").eq("id", id).single(),
      supabase.from("manuscript_status_history").select("*").eq("manuscript_id", id).order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").eq("manuscript_id", id),
    ]).then(([mRes, hRes, rRes]) => {
      setManuscript(mRes.data);
      setHistory(hRes.data ?? []);
      setReviews(rRes.data ?? []);
      setLoading(false);
    });
  }, [id, user]);

  if (authLoading || loading) {
    return <Layout><div className="space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-64 w-full" /></div></Layout>;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!manuscript) return <Layout><p className="text-muted-foreground">Manuscript not found.</p></Layout>;

  const handleStatusChange = async () => {
    if (!newStatus || !id) return;
    const { error } = await supabase.from("manuscripts").update({ status: newStatus as any }).eq("id", id);
    if (error) { toast.error(error.message); return; }

    await supabase.from("manuscript_status_history").insert({
      manuscript_id: id,
      old_status: manuscript.status,
      new_status: newStatus as any,
      changed_by: user.id,
      note: statusNote || null,
    });

    toast.success("Status updated!");
    setManuscript({ ...manuscript, status: newStatus as any });
    setNewStatus("");
    setStatusNote("");
    // Refresh history
    const { data } = await supabase.from("manuscript_status_history").select("*").eq("manuscript_id", id).order("created_at", { ascending: false });
    setHistory(data ?? []);
  };

  const handleAssignReviewer = async () => {
    if (!reviewerEmail || !id) return;
    // Look up user by email in profiles
    const { data: prof } = await supabase.from("profiles").select("user_id").eq("email", reviewerEmail).single();
    if (!prof) { toast.error("Reviewer not found. They must be registered."); return; }

    const { error } = await supabase.from("reviews").insert({ manuscript_id: id, reviewer_id: prof.user_id });
    if (error) {
      toast.error(error.message.includes("duplicate") ? "Reviewer already assigned" : error.message);
      return;
    }
    toast.success("Reviewer assigned!");
    setReviewerEmail("");
    const { data } = await supabase.from("reviews").select("*").eq("manuscript_id", id);
    setReviews(data ?? []);
  };

  return (
    <Layout>
      <div className="max-w-4xl">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{manuscript.title}</h1>
            <p className="text-muted-foreground mt-1">{manuscript.corresponding_author} • {manuscript.article_type.replace("-", " ")}</p>
          </div>
          <Badge className={`${statusColors[manuscript.status] ?? ""} text-sm px-3 py-1`} variant="secondary">
            {statusLabels[manuscript.status] ?? manuscript.status}
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText size={18} /> Abstract</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-relaxed">{manuscript.abstract}</p></CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Details</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Keywords</span><span>{manuscript.keywords}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{manuscript.email}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Affiliation</span><span>{manuscript.affiliation}</span></div>
                {manuscript.co_authors && <div><span className="text-muted-foreground block">Co-authors</span><span>{manuscript.co_authors}</span></div>}
                {manuscript.cover_letter && <div><span className="text-muted-foreground block">Cover Letter</span><p className="mt-1">{manuscript.cover_letter}</p></div>}
              </CardContent>
            </Card>

            {/* Status History */}
            <Card>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock size={18} /> Status History</CardTitle></CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No status changes yet.</p>
                ) : (
                  <div className="space-y-3">
                    {history.map((h) => (
                      <div key={h.id} className="flex items-start gap-3 text-sm border-l-2 border-primary/30 pl-3">
                        <div>
                          <p className="font-medium">
                            {h.old_status ? `${statusLabels[h.old_status]} → ` : ""}{statusLabels[h.new_status]}
                          </p>
                          {h.note && <p className="text-muted-foreground">{h.note}</p>}
                          <p className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar actions */}
          <div className="space-y-6">
            {isEditor && (
              <>
                <Card>
                  <CardHeader><CardTitle className="text-base">Update Status</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusLabels).map(([val, label]) => (
                          <SelectItem key={val} value={val}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="Add a note..." value={statusNote} onChange={(e) => setStatusNote(e.target.value)} rows={2} />
                    <Button onClick={handleStatusChange} className="w-full" disabled={!newStatus}>Update</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base flex items-center gap-2"><User size={16} /> Assign Reviewer</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <Input placeholder="reviewer@email.com" value={reviewerEmail} onChange={(e) => setReviewerEmail(e.target.value)} />
                    <Button onClick={handleAssignReviewer} className="w-full" variant="outline" disabled={!reviewerEmail}>Assign</Button>
                    {reviews.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Assigned ({reviews.length})</p>
                        {reviews.map((r) => (
                          <div key={r.id} className="text-sm py-1 flex justify-between">
                            <span className="text-muted-foreground">{r.reviewer_id.slice(0, 8)}...</span>
                            <Badge variant={r.is_completed ? "default" : "outline"} className="text-xs">
                              {r.is_completed ? r.recommendation?.replace("_", " ") : "Pending"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            <Card>
              <CardHeader><CardTitle className="text-base">Submission Info</CardTitle></CardHeader>
              <CardContent className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Submitted:</span> {new Date(manuscript.created_at).toLocaleDateString()}</p>
                <p><span className="text-muted-foreground">Last Updated:</span> {new Date(manuscript.updated_at).toLocaleDateString()}</p>
                <p><span className="text-muted-foreground">ID:</span> {manuscript.id.slice(0, 8)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
