import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Send, Users, BookOpen, Globe, Shield } from "lucide-react";

const journalInfo = [
  { label: "Frequency", value: "Quarterly (4 issues per year)" },
  { label: "Areas Covered", value: "[Subject Areas]" },
  { label: "Language", value: "English" },
  { label: "Article Types", value: "Original Research, Reviews, Short Communications" },
];

const recentArticles = [
  {
    type: "Full Length Article",
    title: "Impact of Climate Change on Crop Yield Variability in Semi-Arid Regions",
    authors: "Ahmad K., Rahman M., Ali S.",
    doi: "10.xxxx/xxxx.2024.001",
  },
  {
    type: "Review Article",
    title: "Sustainable Livestock Management: Integrating Traditional and Modern Practices",
    authors: "Khan N., Hussain T., Suhail S.M.",
    doi: "10.xxxx/xxxx.2024.002",
  },
  {
    type: "Short Communication",
    title: "Novel Plant-Soil Interactions in Nitrogen-Deficient Environments",
    authors: "Dawar K.M., Mian I.A., Mussarat M.",
    doi: "10.xxxx/xxxx.2024.003",
  },
];

export default function Index() {
  return (
    <Layout showSidebar={false}>
      {/* Hero Banner */}
      <section className="journal-banner py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              [Journal Name Here]
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              An international, peer-reviewed, open-access journal advancing scientific understanding 
              and innovation. [Customize this tagline]
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/submit">
                <Button size="lg" variant="secondary" className="font-semibold">
                  <Send className="mr-2" size={18} />
                  Submit Manuscript
                </Button>
              </Link>
              <Link to="/aims-scope">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <BookOpen className="mr-2" size={18} />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="text-primary" size={24} />
                About the Journal
              </h2>
              <div className="prose max-w-none text-muted-foreground">
                <p className="mb-4">
                  The <strong>Journal of Animal, Plant and Ecology (JAPE)</strong> aims to advance 
                  scientific understanding and innovation at the interface of animal science, plant 
                  science, and ecological systems. The journal provides an international, peer-reviewed 
                  platform for the publication of high-quality original research, reviews, and short 
                  communications that address fundamental and applied aspects of biological and 
                  agricultural sciences.
                </p>
                <p>
                  JAPE seeks to promote interdisciplinary research that supports sustainable food 
                  production, biodiversity conservation, ecosystem resilience, and environmentally 
                  responsible agricultural practices.
                </p>
              </div>
            </section>

            {/* Latest Articles */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <Link to="/current-issue" className="text-primary hover:underline text-sm font-medium">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentArticles.map((article, index) => (
                  <Card key={index} className="journal-article-card">
                    <CardContent className="pt-4">
                      <Badge variant="secondary" className="mb-2">{article.type}</Badge>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">{article.authors}</p>
                      <p className="text-xs text-muted-foreground">DOI: {article.doi}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Journal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Journal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="journal-info-table">
                  <tbody>
                    {journalInfo.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <th className="text-xs uppercase">{item.label}</th>
                        <td className="text-sm">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Submit CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">Submit Your Research</h3>
                <p className="text-sm opacity-90 mb-4">
                  Share your findings with the global scientific community.
                </p>
                <Link to="/submit">
                  <Button variant="secondary" className="w-full">
                    Online Submission
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Publish with JAPE?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Globe className="text-primary shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-sm">Open Access</h4>
                    <p className="text-xs text-muted-foreground">Free worldwide access to all articles</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="text-primary shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-sm">Expert Review</h4>
                    <p className="text-xs text-muted-foreground">Rigorous double-blind peer review</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="text-primary shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-sm">Ethical Standards</h4>
                    <p className="text-xs text-muted-foreground">COPE guidelines compliance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
