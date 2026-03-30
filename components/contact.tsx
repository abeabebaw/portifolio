import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 lg:px-12">
      <div className="container mx-auto max-w-2xl text-center">
        <p className="text-primary font-mono text-sm mb-4">04. What&apos;s Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Get In Touch
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          {"I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you! My inbox is always open."}
        </p>
        <Button size="lg" asChild>
          <a href="mailto:alex@example.com">Say Hello</a>
        </Button>
      </div>
    </section>
  )
}
