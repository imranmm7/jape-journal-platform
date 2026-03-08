import { Layout } from "@/components/layout/Layout";

export default function AuthorGuidelines() {
  return (
    <Layout>
      <div className="max-w-3xl prose prose-sm">
        <h1 className="text-3xl font-bold mb-6">Author Guidelines</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">General Information</h2>
          <p className="text-muted-foreground mb-4">
            The Journal of Animal, Plant and Ecology (JAPE) welcomes submissions of original research articles, 
            review articles, and short communications. All manuscripts must be written in English and should 
            not have been published or be under consideration elsewhere.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Manuscript Preparation</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong>Title Page:</strong> Full title, author names, affiliations, and corresponding author contact details.</li>
            <li><strong>Abstract:</strong> A structured abstract of no more than 300 words summarizing the objectives, methods, results, and conclusions.</li>
            <li><strong>Keywords:</strong> 4–6 keywords for indexing purposes.</li>
            <li><strong>Introduction:</strong> Provide context and clearly state the objectives.</li>
            <li><strong>Materials and Methods:</strong> Sufficient detail to allow replication of the study.</li>
            <li><strong>Results:</strong> Present findings clearly with appropriate tables and figures.</li>
            <li><strong>Discussion:</strong> Interpret results and compare with existing literature.</li>
            <li><strong>References:</strong> Follow APA style. All cited references must appear in the reference list and vice versa.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Formatting</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>Use 12-point Times New Roman font</li>
            <li>Double-space all text including references</li>
            <li>Use SI units throughout</li>
            <li>Tables and figures should be numbered consecutively and cited in the text</li>
            <li>Figures should be high resolution (minimum 300 dpi)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Submission</h2>
          <p className="text-muted-foreground">
            Manuscripts should be submitted through our online submission system. Authors are required to 
            provide a cover letter, manuscript file (.doc, .docx, or .pdf), and any supplementary materials.
          </p>
        </section>
      </div>
    </Layout>
  );
}
