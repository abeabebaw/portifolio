import Image from "next/image"
import { Github, ExternalLink, Folder, Sparkles, ArrowUpRight } from "lucide-react"

const featuredProjects = [
  {
    title: "Spotify Profile Dashboard",
    description:
      "A web app for visualizing personalized Spotify data. View your top artists, tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    image: "/projects/spotify-dashboard.jpg",
    tech: ["React", "Node.js", "Express", "Spotify API"],
    github: "https://github.com",
    external: "https://spotify-profile.com",
    highlights: ["Real-time data visualization", "Playlist management", "Audio analytics"]
  },
  {
    title: "AI Code Assistant",
    description:
      "An intelligent code completion tool powered by machine learning. Features real-time suggestions, multi-language support, and seamless IDE integration. Built with a focus on developer productivity.",
    image: "/projects/ai-assistant.jpg",
    tech: ["Python", "TensorFlow", "FastAPI", "VS Code API"],
    github: "https://github.com",
    external: "https://ai-assistant.dev",
    highlights: ["ML-powered suggestions", "Multi-language support", "IDE integration"]
  },
  {
    title: "Cloud Infrastructure Manager",
    description:
      "A comprehensive dashboard for managing cloud infrastructure across multiple providers. Monitor resources, track costs, and automate deployments with an intuitive interface.",
    image: "/projects/cloud-manager.jpg",
    tech: ["Next.js", "TypeScript", "AWS SDK", "Terraform"],
    github: "https://github.com",
    external: "https://cloud-manager.io",
    highlights: ["Multi-cloud support", "Cost tracking", "Automated deployments"]
  },
]

const otherProjects = [
  {
    title: "CLI Weather App",
    description:
      "A command-line weather application with beautiful terminal output and multiple location support.",
    tech: ["Go", "Cobra", "OpenWeather API"],
    github: "https://github.com",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    title: "Markdown Note Taker",
    description:
      "A minimal markdown note-taking app with real-time preview and local storage sync.",
    tech: ["React", "Marked.js", "IndexedDB"],
    github: "https://github.com",
    external: "https://notes.app",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    title: "E-Commerce API",
    description:
      "RESTful API for e-commerce applications with authentication, payments, and inventory management.",
    tech: ["Node.js", "Express", "MongoDB", "Stripe"],
    github: "https://github.com",
    gradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    title: "Portfolio Generator",
    description:
      "A tool to generate portfolio websites from JSON configuration files with multiple themes.",
    tech: ["TypeScript", "Handlebars", "CSS"],
    github: "https://github.com",
    external: "https://portfolio-gen.dev",
    gradient: "from-orange-500/10 to-red-500/10"
  },
  {
    title: "Task Automation Bot",
    description:
      "Discord bot for automating repetitive tasks with custom commands and scheduling.",
    tech: ["Python", "Discord.py", "PostgreSQL"],
    github: "https://github.com",
    gradient: "from-indigo-500/10 to-purple-500/10"
  },
  {
    title: "Real-time Chat App",
    description:
      "WebSocket-based chat application with rooms, direct messaging, and file sharing.",
    tech: ["Next.js", "Socket.io", "Redis"],
    github: "https://github.com",
    external: "https://chat.demo",
    gradient: "from-yellow-500/10 to-amber-500/10"
  },
]

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section header with animation */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4">
            <Sparkles size={16} />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Some Things I&apos;ve Built
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my passion for creating 
            intuitive and performant web experiences.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-32">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`relative grid md:grid-cols-12 gap-6 items-center group ${
                index % 2 === 1 ? "md:text-right" : ""
              }`}
            >
              {/* Image container with hover effects */}
              <div
                className={`md:col-span-7 relative aspect-video rounded-xl overflow-hidden ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-linear-to-tr from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-all duration-500 z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating tech tags on hover */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-background/90 backdrop-blur-sm rounded-full text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 text-xs font-mono bg-background/90 backdrop-blur-sm rounded-full text-foreground">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div
                className={`md:col-span-6 md:absolute ${
                  index % 2 === 1
                    ? "md:left-0 md:text-left"
                    : "md:right-0 md:text-right"
                } z-20`}
              >
                <div
                  className={`bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 ${
                    index % 2 === 1 ? "md:ml-0" : "md:mr-0"
                  }`}
                >
                  <p className="text-primary font-mono text-sm mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Featured Project
                  </p>
                  
                  <h3 className="text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className={`flex flex-wrap gap-3 mb-6 ${
                    index % 2 === 1 ? "md:justify-start" : "md:justify-end"
                  }`}>
                    {project.highlights?.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <ul
                    className={`flex flex-wrap gap-3 text-sm font-mono text-muted-foreground mb-6 ${
                      index % 2 === 1 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="px-3 py-1 bg-muted/50 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div
                    className={`flex gap-4 ${
                      index % 2 === 1 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <Github size={22} />
                    </a>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                      aria-label="External Link"
                    >
                      <ExternalLink size={22} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Other Noteworthy Projects
            </h3>
            <p className="text-muted-foreground">
              A collection of smaller projects and experiments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div
                key={project.title}
                className="group relative bg-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Folder className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </a>
                      {project.external && (
                        <a
                          href={project.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                          aria-label="External Link"
                        >
                          <ArrowUpRight size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                    {project.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2 text-xs font-mono">
                    {project.tech.map((tech, i) => (
                      <li
                        key={tech}
                        className="px-2 py-1 bg-muted/50 rounded-md text-muted-foreground group-hover:bg-background/80 transition-colors"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Show more button */}
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-card hover:bg-primary/10 border border-border rounded-full text-foreground hover:text-primary transition-all duration-300">
              <span>Show More Projects</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}