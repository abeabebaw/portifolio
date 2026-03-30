import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20">
      <div className="container mx-auto max-w-4xl">
        <p className="text-primary font-mono text-sm mb-4 animate-fade-in">
          Hi, my name is
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
          Alex Chen.
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-6 text-balance">
          I build things for the web.
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed">
          {"I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at "}
          <Link href="#" className="text-primary hover:underline">
            TechCorp
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <Link href="#about" aria-label="Scroll to about section">
          <ArrowDown className="text-muted-foreground hover:text-primary transition-colors" size={28} />
        </Link>
      </div>
    </section>
  )
}
