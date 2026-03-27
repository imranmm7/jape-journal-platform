import { Layout } from "@/components/layout/Layout";
import { Globe, FileText, Copyright } from "lucide-react";

export default function OpenAccess() {
  return (
    <Layout>
      <div className="max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold">Open Access Policy</h1>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Open Access Statement</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            [Journal Name] ([Abbreviation]) is a fully Open Access journal, providing 
            immediate, worldwide and unrestricted access to all published articles. All content is freely 
            available to readers without subscription or access fees, ensuring the widest possible 
            dissemination of research findings.
          </p>
          <p className="text-muted-foreground">
            Publication costs are covered by authors, their affiliated institutions, or research funding 
            bodies. Authors retain copyright of their work while granting the journal the right to 
            publish and distribute the article.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Open Access Policy</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            JAPE is committed to the principles of Open Access and publishes all articles under the 
            Creative Commons Attribution License (CC BY 4.0). This license permits unrestricted use, 
            distribution, reproduction, and adaptation of the published work in any medium, provided 
            the original authors and source are properly credited.
          </p>
          <p className="text-muted-foreground">
            The Open Access model adopted by JAPE promotes transparency, knowledge sharing and the 
            rapid global exchange of scientific information among researchers, practitioners, 
            policymakers, and the wider public.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Cost Coverage</h2>
          <p className="text-muted-foreground">
            Article processing charges (if applicable) are borne by the authors, their institutions 
            or designated research funding agencies. This cost-sharing approach ensures the sustainability 
            of the journal while maintaining free and open access to published research.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Copyright className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Copyright and Licensing</h2>
          </div>
          <p className="text-muted-foreground">
            Authors retain full copyright of their articles. By submitting their work to JAPE, authors 
            grant the journal a non-exclusive license to publish, archive, and disseminate the content 
            in accordance with the CC BY 4.0 license. This policy safeguards authors' intellectual 
            property rights while enabling broad reuse and citation of their work.
          </p>
        </section>
      </div>
    </Layout>
  );
}
