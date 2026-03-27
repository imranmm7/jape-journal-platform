import { Layout } from "@/components/layout/Layout";

const scopeTopics = [
  "Crop Production, Physiology and Management",
  "Plant Genetics, Breeding and Biotechnology",
  "Soil Science, Nutrient Management and Plant–Soil Interactions",
  "Pest, Disease and Weed Management",
  "Postharvest Biology and Technology",
  "Animal Production, Nutrition and Husbandry",
  "Animal Genetics, Breeding and Reproductive Biology",
  "Veterinary and Animal Health Sciences",
  "Agroecology and Ecosystem-Based Agriculture",
  "Sustainable and Climate-Smart Agricultural Practices",
  "Climate Change Impacts on Plant, Animal and Ecosystem Systems",
  "Biodiversity Conservation and Ecological Interactions",
  "Food Science, Quality and Nutritional Studies",
  "Precision Agriculture and Digital Farming Technologies",
  "Applications of Artificial Intelligence and Information Technology in Agriculture",
  "Agricultural Economics, Policy and Rural Development",
];

export default function AimsScope() {
  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Aims & Scope</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Aims</h2>
          <p className="text-muted-foreground mb-4">
            [Journal Name] ([Abbreviation]) aims to advance scientific understanding 
            and innovation. The journal provides an international, peer-reviewed platform for the publication of 
            high-quality original research, reviews and short communications. [Customize aims]
          </p>
          <p className="text-muted-foreground mb-4">
            [Journal Abbreviation] seeks to promote interdisciplinary research that supports 
            scientific advancement and knowledge dissemination. [Customize this paragraph]
          </p>
          <p className="text-muted-foreground">
            [Journal Abbreviation] supports research that enhances knowledge while maintaining 
            scientific rigor. [Customize this paragraph]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Scope of the Journal</h2>
          <p className="text-muted-foreground mb-4">
            [Journal Name] publishes research covering a broad range of topics. 
            Areas of interest include, but are not limited to:
          </p>
          <ul className="space-y-2">
            {scopeTopics.map((topic, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <span className="text-primary font-bold">•</span>
                {topic}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-6">
            By encompassing these diverse yet interconnected disciplines, [Journal Abbreviation] aims to facilitate 
            knowledge exchange among researchers, practitioners and policymakers, fostering scientific 
            advancements. [Customize this paragraph]
          </p>
        </section>
      </div>
    </Layout>
  );
}
