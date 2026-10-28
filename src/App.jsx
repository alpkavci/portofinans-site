import Hero from "./components/Hero";
import { Footer, HowWeWork, Partnership, Posts } from "./components/Sections";

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Posts />
        <HowWeWork />
        <Partnership />
      </main>
      <Footer />
    </>
  );
}
