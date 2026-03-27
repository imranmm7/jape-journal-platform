import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileCheck, Users, BookOpen } from "lucide-react";

const policyLinks = [
  {
    icon: BookOpen,
    title: "Open Access Policy",
    desc: "Immediate, worldwide access to all published articles under CC BY 4.0.",
    href: "/open-access",
  },
  {
    icon: Users,
    title: "Peer Review Process",
    desc: "Rigorous double-blind peer review with decisions within 2–3 weeks.",
    href: "/peer-review",
  },
  {
    icon: Shield,
    title: "Publication Ethics",
    desc: "JAPE adheres to COPE guidelines and international publication ethics standards.",
    href: "/ethics",
  },
  {
    icon: FileCheck,
    title: "Copyright & Licensing",
    desc: "Authors retain copyright. All articles published under CC BY 4.0 license.",
    href: "/copyright",
  },
];

export default function Policies() {
  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Journal Policies</h1>
        <p className="text-muted-foreground mb-8">
          JAPE is committed to maintaining the highest standards of editorial quality, transparency, and ethical publishing practices.
        </p>

        <div className="grid gap-4">
          {policyLinks.map((policy) => (
            <Link key={policy.href} to={policy.href}>
              <Card className="journal-article-card hover:border-primary transition-colors">
                <CardContent className="flex items-start gap-4 pt-4">
                  <policy.icon className="text-primary shrink-0" size={28} />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{policy.title}</h3>
                    <p className="text-sm text-muted-foreground">{policy.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
