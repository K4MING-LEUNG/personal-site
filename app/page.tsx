import Cover from "./components/Cover";
import InternshipMap from "./components/InternshipMap";
import Projects from "./components/Projects";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Ending from "./components/Ending";

export default function Home() {
  return (
    <main className="relative z-10">
      <Cover />
      <InternshipMap />
      <Projects />
      <Portfolio />
      <Skills />
      <Ending />
    </main>
  );
}
