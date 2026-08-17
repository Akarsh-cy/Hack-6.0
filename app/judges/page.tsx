import Navbar from "@/components/navbar";
import JudgesSection from "@/components/judges";
import Footer from "@/components/footer";
import ParticleBackground from "@/components/particle-background";

export const metadata = {
  title: "Judges & Mentors | Hack 5.0",
  description: "Meet the expert panel of judges and mentors for Hack 5.0.",
};

export default function JudgesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <ParticleBackground />
      <Navbar />
      <div className="pt-20 flex-1">
        <JudgesSection />
      </div>
      <Footer />
    </main>
  );
}
