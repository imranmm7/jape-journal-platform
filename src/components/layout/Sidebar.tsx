import { Link, useLocation } from "react-router-dom";

const sidebarSections = [
  {
    title: "Journal Home",
    links: [
      { label: "Aims and Scope", href: "/aims-scope" },
      { label: "Editorial Board", href: "/editorial-board" },
      { label: "Open Access Policy", href: "/open-access" },
      { label: "Peer Review Process", href: "/peer-review" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Current Issue", href: "/current-issue" },
      { label: "In Press Papers", href: "/in-press" },
      { label: "Archives", href: "/archives" },
    ],
  },
  {
    title: "For Authors",
    links: [
      { label: "Author Guidelines", href: "/author-guidelines" },
      { label: "Submit Manuscript", href: "/submit" },
      { label: "Publication Ethics", href: "/ethics" },
      { label: "Copyright & Licensing", href: "/copyright" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-24 space-y-6">
        <Link 
          to="/" 
          className="block text-sm text-muted-foreground hover:text-primary mb-4"
        >
          ← Home
        </Link>

        {sidebarSections.map((section) => (
          <div key={section.title} className="journal-sidebar-section">
            <h3 className="journal-sidebar-title">{section.title}</h3>
            <nav className="space-y-1">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`journal-sidebar-link ${
                    location.pathname === link.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-primary"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
