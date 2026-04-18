import Image from "next/image"

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
]

export function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12">
      <div className="container mx-auto max-w-4xl">
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-12">
          <span className="text-primary font-mono text-xl">01.</span>
          About Me
          <span className="hidden md:block h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Hello! My name is abebaw and I enjoy creating things that live on the internet. 
              My interest in web development started back in 2012 when I decided to try 
              editing custom Tumblr themes — turns out hacking together a custom reblog 
              button taught me a lot about HTML & CSS!
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fast-forward to today, and I&apos;ve had the privilege of working at an 
              advertising agency, a start-up, a huge corporation, and a student-led 
              design studio. My main focus these days is building accessible, inclusive 
              products and digital experiences at{" "}
              <span className="text-primary"> wollo university</span> for a variety of clients.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I also recently launched a course that covers everything you need to build 
              a web app with the Spotify API using Node & React.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-6">
              Here are a few technologies I&apos;ve been working with recently:
            </p>
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group mx-auto md:mx-0">
            <div className="relative w-64 h-64 rounded overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-300 z-10" />
              <Image
                src="/profile.png"
                alt="Alex Chen"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-64 h-64 border-2 border-primary rounded -z-10 group-hover:-bottom-3 group-hover:-right-3 transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
