import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { AuthorDashboard } from "@/components/dashboard/AuthorDashboard";
import { ReviewerDashboard } from "@/components/dashboard/ReviewerDashboard";
import { EditorDashboard } from "@/components/dashboard/EditorDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user, roles, loading, profile } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const hasMultipleRoles = roles.length > 1;

  return (
    <Layout>
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Welcome back, {profile?.full_name || user.email}
        </p>

        {hasMultipleRoles ? (
          <Tabs defaultValue={roles[0]}>
            <TabsList>
              {roles.includes("author") && <TabsTrigger value="author">Author</TabsTrigger>}
              {roles.includes("reviewer") && <TabsTrigger value="reviewer">Reviewer</TabsTrigger>}
              {roles.includes("editor") && <TabsTrigger value="editor">Editor</TabsTrigger>}
            </TabsList>
            {roles.includes("author") && (
              <TabsContent value="author"><AuthorDashboard /></TabsContent>
            )}
            {roles.includes("reviewer") && (
              <TabsContent value="reviewer"><ReviewerDashboard /></TabsContent>
            )}
            {roles.includes("editor") && (
              <TabsContent value="editor"><EditorDashboard /></TabsContent>
            )}
          </Tabs>
        ) : roles.includes("editor") ? (
          <EditorDashboard />
        ) : roles.includes("reviewer") ? (
          <ReviewerDashboard />
        ) : (
          <AuthorDashboard />
        )}
      </div>
    </Layout>
  );
}
