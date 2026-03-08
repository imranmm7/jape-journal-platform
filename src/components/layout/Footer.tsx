import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Journal of Animal, Plant and Ecology</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              JAPE is an international, peer-reviewed, open-access journal dedicated to advancing 
              scientific understanding at the interface of animal science, plant science, and ecological systems.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail size={16} />
                editor@jape-journal.org
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/aims-scope" className="text-muted-foreground hover:text-primary">Aims & Scope</Link></li>
              <li><Link to="/editorial-board" className="text-muted-foreground hover:text-primary">Editorial Board</Link></li>
              <li><Link to="/submit" className="text-muted-foreground hover:text-primary">Submit Manuscript</Link></li>
              <li><Link to="/author-guidelines" className="text-muted-foreground hover:text-primary">Author Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/open-access" className="text-muted-foreground hover:text-primary">Open Access</Link></li>
              <li><Link to="/peer-review" className="text-muted-foreground hover:text-primary">Peer Review</Link></li>
              <li><Link to="/ethics" className="text-muted-foreground hover:text-primary">Publication Ethics</Link></li>
              <li><Link to="/copyright" className="text-muted-foreground hover:text-primary">Copyright</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Journal of Animal, Plant and Ecology (JAPE). All rights reserved.</p>
          <p className="mt-1">ISSN: XXXX-XXXX (Online)</p>
        </div>
      </div>
    </footer>
  );
}
