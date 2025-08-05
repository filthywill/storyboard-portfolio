"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-[1025px] mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Will Samatis Logo" width={48} height={48} className="rounded-md" />
            <span className="font-bold text-xl">Will Samatis</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/storyboards" className="hover:text-primary transition-colors">
              Storyboards
            </Link>
            <Link href="/animation" className="hover:text-primary transition-colors">
              Animation
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex flex-col space-y-4 p-4">
              <Link href="/storyboards" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Storyboards
              </Link>
              <Link
                href="/animation"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Animation
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-6 md:py-6 pb-4 md:pb-4 overflow-hidden">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="text-center space-y-3">
          <Badge variant="outline" className="bg-white">About Me</Badge>
            <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
              Artist and Motion Designer
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Storyboard Design 〡 Motion Graphics 〡 Character Animation 〡 Visual Effects
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-6 bg-muted/80">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                
              
                <p className="text-md text-muted-foreground">
                  I've had a traditional art background,
                  with an introduction to digital art using some of the first versions of Photoshop as a kid. While studying animation in college, I developed a passion for 3D animation and visual effects. I love opportunities to evolve as an artist and learn new technology. 
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">My Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Technical Skills</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Illustration & Concept Art</li>
                      <li>• 2D & 3D Animation</li>
                      <li>• Cinematic composition</li>
                      <li>• Character design</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Industry Knowledge</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Film & Animation production</li>
                      <li>• Online marketing</li>
                      <li>• Commercial advertising</li>
                      <li>• Software & Games</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                <iframe
                  src="https://player.vimeo.com/video/996804148?autoplay=1&loop=1&autopause=0&muted=1&title=0&byline=0&portrait=0"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10 bg-muted/50">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="text-center space-y-4 mb-10">
            <Badge variant="outline">Contact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how I can help bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-lg">Email</div>
                <div className="text-muted-foreground">wsamatis@gmail.com</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-lg">Phone</div>
                <div className="text-muted-foreground">+1 (781) 983-7173</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-lg">Location</div>
                <div className="text-muted-foreground">Boston, MA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Will Samatis Logo" width={48} height={48} className="rounded-md" />
              <span className="font-bold text-xl">Will Samatis</span>
            </div>

            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Will Samatis. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 