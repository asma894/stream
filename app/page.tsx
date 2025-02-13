import Cta from "./components/cta";
import Features from "./components/features";
import Hero from "./components/hero";
import Navbar from "./components/navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Features />
        <Cta />
      </main>
    </>
  )
}

