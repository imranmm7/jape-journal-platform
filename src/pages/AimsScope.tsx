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
            The Journal of Animal, Plant and Ecology (JAPE) aims to advance scientific understanding 
            and innovation at the interface of animal science, plant science and ecological systems. 
            The journal provides an international, peer-reviewed platform for the publication of 
            high-quality original research, reviews and short communications that address fundamental 
            and applied aspects of biological and agricultural sciences.
          </p>
          <p className="text-muted-foreground mb-4">
            JAPE seeks to promote interdisciplinary research that supports sustainable food production, 
            biodiversity conservation, ecosystem resilience and environmentally responsible agricultural 
            practices. The journal aspires to serve as a leading source of scholarly knowledge that 
            contributes to global food security, climate-smart agriculture and the sustainable management 
            of natural resources.
          </p>
          <p className="text-muted-foreground">
            By encouraging the integration of ecological principles with animal and plant sciences, JAPE 
            supports research that enhances productivity while maintaining environmental balance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Scope of the Journal</h2>
          <p className="text-muted-foreground mb-4">
            The Journal of Animal, Plant and Ecology publishes research covering a broad range of topics 
            related to agriculture, biology and ecological sciences. Areas of interest include, but are 
            not limited to:
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
            By encompassing these diverse yet interconnected disciplines, JAPE aims to facilitate 
            knowledge exchange among researchers, practitioners and policymakers, fostering scientific 
            advancements that support sustainable agriculture and ecological integrity.
          </p>
        </section>
      </div>
    </Layout>
  );
}
