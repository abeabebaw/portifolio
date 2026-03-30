import { Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

export function Footer() {
  return (
    <footer className="py-8 px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Side Social Links - Desktop */}
        <div className="hidden md:flex fixed bottom-0 left-8 flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-muted-foreground">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Side Email - Desktop */}
        <div className="hidden md:flex fixed bottom-0 right-8 flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-muted-foreground">
          <a
            href="mailto:alex@example.com"
            className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm tracking-widest"
            style={{ writingMode: "vertical-rl" }}
          >
            alex@example.com
          </a>
        </div>

        {/* Mobile Social Links */}
        <div className="flex md:hidden justify-center gap-6 mb-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-muted-foreground text-sm font-mono">
          Designed & Built by Alex Chen
        </p>
      </div>
    </footer>
  )
}
