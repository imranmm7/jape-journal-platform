import { Layout } from "@/components/layout/Layout";
import { CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Manuscript Submission", desc: "Authors submit their manuscript through the online submission system." },
  { title: "Initial Editorial Screening", desc: "The editor-in-chief conducts an initial assessment of the manuscript's scope, quality, and adherence to journal guidelines." },
  { title: "Double-Blind Peer Review", desc: "Suitable manuscripts are assigned to at least two expert reviewers. Both authors and reviewers remain anonymous throughout the process." },
  { title: "Review Decision (2–3 weeks)", desc: "The first review decision is typically communicated within 2–3 weeks after the manuscript enters the review stage." },
  { title: "Revision & Resubmission", desc: "Manuscripts requiring revision must be resubmitted after addressing all reviewer and editor recommendations." },
  { title: "Final Evaluation & Acceptance", desc: "Following satisfactory revision and final evaluation, the manuscript is accepted for publication." },
];

export default function PeerReview() {
  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Peer Review Process</h1>
        <p className="text-muted-foreground mb-8">
          All manuscripts submitted to the Journal of Animal, Plant and Ecology (JAPE) undergo a 
          rigorous double-blind peer review process to ensure scientific quality, originality and relevance.
        </p>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
              </div>
              <div className="pb-6">
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
