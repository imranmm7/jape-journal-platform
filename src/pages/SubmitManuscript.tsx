import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SubmitManuscript() {
  const [formData, setFormData] = useState({
    title: "",
    articleType: "",
    correspondingAuthor: "",
    email: "",
    affiliation: "",
    coAuthors: "",
    abstract: "",
    keywords: "",
    coverLetter: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Manuscript submitted successfully! You will receive a confirmation email shortly.");
  };

  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Submit Manuscript</h1>
        <p className="text-muted-foreground mb-8">
          Submit your research for consideration in JAPE. Please ensure your manuscript follows 
          the author guidelines before submission.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText size={20} className="text-primary" />
                Manuscript Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Manuscript Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter the full title of your manuscript"
                />
              </div>

              <div>
                <Label htmlFor="articleType">Article Type *</Label>
                <Select
                  value={formData.articleType}
                  onValueChange={(value) => setFormData({ ...formData, articleType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select article type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-length">Full Length Article</SelectItem>
                    <SelectItem value="review">Review Article</SelectItem>
                    <SelectItem value="short-communication">Short Communication</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="abstract">Abstract *</Label>
                <Textarea
                  id="abstract"
                  required
                  rows={6}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Provide a structured abstract (max 300 words)"
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords *</Label>
                <Input
                  id="keywords"
                  required
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="Enter 4-6 keywords separated by commas"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Author Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Corresponding Author *</Label>
                  <Input
                    id="author"
                    required
                    value={formData.correspondingAuthor}
                    onChange={(e) => setFormData({ ...formData, correspondingAuthor: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@institution.edu"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="affiliation">Affiliation *</Label>
                <Input
                  id="affiliation"
                  required
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  placeholder="Department, University, City, Country"
                />
              </div>

              <div>
                <Label htmlFor="coAuthors">Co-Authors</Label>
                <Textarea
                  id="coAuthors"
                  rows={3}
                  value={formData.coAuthors}
                  onChange={(e) => setFormData({ ...formData, coAuthors: e.target.value })}
                  placeholder="List co-authors with their affiliations (one per line)"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload size={20} className="text-primary" />
                File Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto text-muted-foreground mb-3" size={32} />
                <p className="font-medium mb-1">Upload Manuscript File</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Accepted formats: .doc, .docx, .pdf (Max 20MB)
                </p>
                <Button type="button" variant="outline">Choose File</Button>
              </div>

              <div>
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Include a cover letter addressed to the editor"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">Save Draft</Button>
            <Button type="submit" className="journal-cta-button">
              <Send size={18} className="mr-2" />
              Submit Manuscript
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
