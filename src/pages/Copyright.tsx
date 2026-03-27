import { Layout } from "@/components/layout/Layout";
import { Copyright } from "lucide-react";

export default function CopyrightPage() {
  return (
    <Layout>
      <div className="max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold">Copyright & Licensing</h1>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Copyright className="text-primary" size={24} />
            Copyright Policy
          </h2>
          <p className="text-muted-foreground mb-4">
            Authors retain full copyright of their articles published in [Journal Abbreviation]. By submitting a 
            manuscript, authors grant the journal a non-exclusive license to publish, archive, 
            and disseminate the content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Creative Commons License</h2>
          <p className="text-muted-foreground mb-4">
            All articles in JAPE are published under the Creative Commons Attribution License 
            (CC BY 4.0). This license permits:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li>• <strong>Sharing:</strong> Copying and redistributing the material in any medium or format</li>
            <li>• <strong>Adapting:</strong> Remixing, transforming, and building upon the material</li>
            <li>• <strong>Commercial Use:</strong> Using the material for commercial purposes</li>
          </ul>
          <p className="text-muted-foreground">
            The only condition is that appropriate credit must be given to the original author(s) 
            and source, with a link to the license and indication of any changes made.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Third-Party Content</h2>
          <p className="text-muted-foreground">
            Authors are responsible for obtaining permission to use any third-party content 
            (figures, tables, images) in their manuscripts. Such content may not be covered 
            by the CC BY license.
          </p>
        </section>
      </div>
    </Layout>
  );
}
