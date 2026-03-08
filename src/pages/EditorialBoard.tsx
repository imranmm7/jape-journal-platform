import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

interface BoardMember {
  name: string;
  department: string;
}

const editorialBoard: Record<string, BoardMember[]> = {
  "Agronomy": [
    { name: "Prof. Dr. Muhammad Arif", department: "Agronomy" },
    { name: "Prof. Dr. Amanullah Khan", department: "Agronomy" },
    { name: "Prof. Dr. Inamullah Khan", department: "Agronomy" },
    { name: "Prof. Dr. Ahmad Khan", department: "Agronomy" },
    { name: "Dr. Shahenshah", department: "Agronomy" },
    { name: "Dr. Asim Muhammad", department: "Agronomy" },
    { name: "Dr. Ihsanullah Daur", department: "Agronomy" },
    { name: "Dr. Shazma Anwar", department: "Agronomy" },
    { name: "Dr. Asad Ali Khan", department: "Agronomy" },
  ],
  "Horticulture": [
    { name: "Prof. Dr. Gohar Ayub", department: "Horticulture" },
    { name: "Prof. Dr. Muhammad Sajid", department: "Horticulture" },
    { name: "Dr. Imran Ahmad", department: "Horticulture" },
    { name: "Dr. Mehboob Alam", department: "Horticulture" },
    { name: "Dr. Neelam Ara", department: "Horticulture" },
    { name: "Mr. Fazal I Wahid", department: "Horticulture" },
    { name: "Dr. Masood Ahmad", department: "Horticulture" },
    { name: "Dr. Farzana Fatima", department: "Horticulture" },
    { name: "Dr. Saeed Ul Haq", department: "Horticulture" },
    { name: "Dr. Faiza Aman", department: "Horticulture" },
    { name: "Dr. Naveed Ahmad", department: "Horticulture" },
  ],
  "Soil & Environmental Sciences": [
    { name: "Prof. Dr. Dost Muhammad", department: "Soil & Environmental Sciences" },
    { name: "Dr. Ishaq A. Mian Kakakhel", department: "Soil & Environmental Sciences" },
    { name: "Dr. Khadim Muhammad Dawar", department: "Soil & Environmental Sciences" },
    { name: "Dr. Maria Mussarat", department: "Soil & Environmental Sciences" },
  ],
  "Plant Breeding & Genetics": [
    { name: "Prof. Dr. Syed Mehar Ali Shah", department: "Plant Breeding & Genetics" },
    { name: "Prof. Dr. Rozina Gul", department: "Plant Breeding & Genetics" },
    { name: "Dr. Sultan Akbar Jadoon", department: "Plant Breeding & Genetics" },
    { name: "Dr. Laila Fayyaz", department: "Plant Breeding & Genetics" },
  ],
  "Animal Nutrition": [
    { name: "Prof. Dr. Muhammad Tahir", department: "Animal Nutrition" },
    { name: "Dr. Nazir Ahmad Khan", department: "Animal Nutrition" },
    { name: "Dr. Muhammad Mobashar", department: "Animal Nutrition" },
    { name: "Dr. Shoaib Sultan", department: "Animal Nutrition" },
    { name: "Dr. Muhammad Tahir Khan", department: "Animal Nutrition" },
  ],
  "Livestock Management, Breeding & Genetics": [
    { name: "Prof. Dr. Abdur Rahman", department: "Livestock Management, Breeding & Genetics" },
    { name: "Prof. Dr. Syed Muhammad Suhail", department: "Livestock Management, Breeding & Genetics" },
    { name: "Dr. Ijaz Ahmed", department: "Livestock Management, Breeding & Genetics" },
    { name: "Dr. Rajwali Khan", department: "Livestock Management, Breeding & Genetics" },
    { name: "Iftikhar Ahmad", department: "Livestock Management, Breeding & Genetics" },
    { name: "Dr. Asim Ijaz", department: "Livestock Management, Breeding & Genetics" },
    { name: "Dr. Syeda Maryam Hussain", department: "Livestock Management, Breeding & Genetics" },
  ],
};

export default function EditorialBoard() {
  return (
    <Layout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Editorial Board</h1>
        <p className="text-muted-foreground mb-8">
          The Editorial Board of JAPE comprises distinguished scientists and academics from 
          diverse fields of agriculture, animal sciences, and ecology.
        </p>

        <div className="space-y-8">
          {Object.entries(editorialBoard).map(([department, members]) => (
            <section key={department}>
              <h2 className="text-lg font-bold mb-4 text-primary border-b pb-2">
                {department}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {members.map((member, i) => (
                  <Card key={i} className="journal-article-card">
                    <CardContent className="py-3 px-4">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.department}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
