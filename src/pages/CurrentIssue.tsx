import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const articles = [
  {
    type: "Full Length Article",
    title: "Impact of Climate Change on Crop Yield Variability in Semi-Arid Regions: A Multi-Year Study",
    authors: "Ahmad K., Rahman M., Ali S., Khan I.",
    pages: "1-15",
    doi: "10.xxxx/xxxx.2024.001",
  },
  {
    type: "Review Article",
    title: "Sustainable Livestock Management: Integrating Traditional and Modern Practices for Enhanced Productivity",
    authors: "Khan N., Hussain T., Suhail S.M., Rahman A.",
    pages: "16-32",
    doi: "10.xxxx/xxxx.2024.002",
  },
  {
    type: "Short Communication",
    title: "Novel Plant-Soil Interactions in Nitrogen-Deficient Environments",
    authors: "Dawar K.M., Mian I.A., Mussarat M.",
    pages: "33-38",
    doi: "10.xxxx/xxxx.2024.003",
  },
  {
    type: "Full Length Article",
    title: "Genetic Diversity and Population Structure of Indigenous Cattle Breeds",
    authors: "Jadoon S.A., Gul R., Shah S.M.A.",
    pages: "39-52",
    doi: "10.xxxx/jape.2024.004",
  },
];

export default function CurrentIssue() {
  return (
    <Layout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Current Issue</h1>
            <p className="text-muted-foreground">Volume 1, Issue 1 (2024)</p>
          </div>
          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Download Issue PDF
          </Button>
        </div>

        <div className="space-y-4">
          {articles.map((article, i) => (
            <Card key={i} className="journal-article-card">
              <CardContent className="pt-4">
                <Badge variant="secondary" className="mb-2">{article.type}</Badge>
                <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{article.authors}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Pages: {article.pages}</span>
                  <span>DOI: {article.doi}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
