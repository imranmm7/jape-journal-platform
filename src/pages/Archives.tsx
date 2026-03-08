import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

const volumes = [
  {
    volume: 1,
    year: 2024,
    issues: [
      { issue: 1, articles: 4, status: "Current" },
    ],
  },
];

export default function Archives() {
  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Archives</h1>
        <p className="text-muted-foreground mb-8">
          Browse all published volumes and issues of the Journal of Animal, Plant and Ecology.
        </p>

        <div className="space-y-6">
          {volumes.map((vol) => (
            <div key={vol.volume}>
              <h2 className="text-xl font-bold mb-4">Volume {vol.volume} ({vol.year})</h2>
              <div className="grid gap-4">
                {vol.issues.map((issue) => (
                  <Link key={issue.issue} to="/current-issue">
                    <Card className="journal-article-card hover:border-primary transition-colors">
                      <CardContent className="flex items-center gap-4 pt-4">
                        <FolderOpen className="text-primary" size={24} />
                        <div>
                          <h3 className="font-semibold">
                            Issue {issue.issue}
                            {issue.status && (
                              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                                {issue.status}
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{issue.articles} articles</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
