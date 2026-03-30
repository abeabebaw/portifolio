"use client"

import { FormEvent, useState } from 'react'
import { OwnerProfile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react'

interface ContactProps {
  profile: OwnerProfile
}

export function Contact({ profile }: ContactProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: profile.github },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: Twitter, label: 'Twitter', href: profile.twitter },
  ].filter((item) => Boolean(item.href))

  const emailHref = `mailto:${profile.email}`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)

    const params = new URLSearchParams({
      subject: form.subject || `Portfolio inquiry from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    })

    window.location.href = `${emailHref}?${params.toString()}`
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="relative py-24 md:py-28 section-reveal overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[72vw] h-[38vw] max-w-5xl max-h-96 rounded-full bg-primary/14 blur-3xl" />
        <div className="absolute bottom-6 right-1/4 w-[40vw] h-[30vw] max-w-2xl rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <p className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-mono text-primary mb-5 tracking-wide">
            CONTACT
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or want to chat? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 items-start">
          <Card className="md:col-span-2 rounded-3xl border-border/60 bg-card/50 backdrop-blur-xl panel-sheen shadow-[0_28px_60px_-42px_rgba(0,0,0,0.9)]">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Get in Touch</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a
                      href={emailHref}
                      className="text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm text-foreground">Remote / Worldwide</p>
                  </div>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-8">
                  <p className="text-sm font-semibold text-foreground mb-3">Social</p>
                  <div className="flex gap-2">
                    {socialLinks.map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={label}
                        className="h-10 w-10 rounded-xl bg-card/70 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all hover:-translate-y-0.5"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-3 rounded-3xl border-border/60 bg-card/50 backdrop-blur-xl panel-sheen shadow-[0_28px_60px_-42px_rgba(0,0,0,0.9)]">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-muted-foreground text-sm">Name</Label>
                    <Input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      placeholder="Your name"
                      className="bg-white/5 border-border/70 text-foreground placeholder:text-muted-foreground/70 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-muted-foreground text-sm">Email</Label>
                    <Input
                      id="contact-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      placeholder="your@email.com"
                      className="bg-white/5 border-border/70 text-foreground placeholder:text-muted-foreground/70 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject" className="text-muted-foreground text-sm">Subject</Label>
                  <Input
                    id="contact-subject"
                    value={form.subject}
                    onChange={(event) => setForm({ ...form, subject: event.target.value })}
                    placeholder="What is this about?"
                    className="bg-white/5 border-border/70 text-foreground placeholder:text-muted-foreground/70 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-muted-foreground text-sm">Message</Label>
                  <Textarea
                    id="contact-message"
                    required
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    placeholder="Tell me about your project..."
                    className="bg-white/5 border-border/70 text-foreground placeholder:text-muted-foreground/70 rounded-xl min-h-35 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-xl py-6 text-base bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-[0_16px_36px_-24px_rgba(0,0,0,0.9)]"
                >
                  {sending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Message Prepared
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  The button opens your email app with your message pre-filled.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
