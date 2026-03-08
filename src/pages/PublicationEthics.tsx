import { Layout } from "@/components/layout/Layout";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function PublicationEthics() {
  return (
    <Layout>
      <div className="max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold">Publication Ethics</h1>
        <p className="text-muted-foreground">
          JAPE is committed to upholding the highest standards of publication ethics and follows 
          the guidelines of the Committee on Publication Ethics (COPE).
        </p>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-primary" size={24} />
            Author Responsibilities
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Submit only original work that has not been published elsewhere</li>
            <li>• Properly cite and acknowledge the work of others</li>
            <li>• Declare any conflicts of interest</li>
            <li>• Ensure all co-authors have approved the final version</li>
            <li>• Provide accurate data and present findings objectively</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="text-primary" size={24} />
            Editorial Responsibilities
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Evaluate manuscripts solely on academic merit</li>
            <li>• Maintain confidentiality of submitted manuscripts</li>
            <li>• Ensure fair and unbiased peer review</li>
            <li>• Disclose any conflicts of interest</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-primary" size={24} />
            Misconduct Policy
          </h2>
          <p className="text-muted-foreground">
            JAPE takes allegations of research misconduct seriously. Cases of suspected plagiarism, 
            data fabrication, or falsification will be investigated following COPE guidelines. 
            Confirmed misconduct may result in rejection or retraction of articles.
          </p>
        </section>
      </div>
    </Layout>
  );
}
