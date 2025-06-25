"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Play,
  Tv,
  Gamepad2,
  Star,
  Quote,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import StoryboardSlideshow from "./components/storyboard-slideshow"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  projectType: z.string().min(1, { message: "Project type is required." }),
  details: z.string().min(1, { message: "Please provide some project details." }),
})

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      projectType: "",
      details: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.")
      }

      toast.success("Message sent successfully! I'll get back to you soon.")
      form.reset()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const portfolioItems = [
    {
      title: "Red Bull BGW",
      category: "Film",
      image: "/portfolio/bostons-got-wings.jpg",
      images: ["/portfolio/bostons-got-wings.jpg"],
      description: "Video boards drawn for Red Bull's \"Boston's Got Wings\" campaign with Rajon Rondo",
    },
    {
      title: "Reebok Boxing",
      category: "Advertising",
      image: "/portfolio/gearing-up.jpg",
      images: ["/portfolio/gearing-up.jpg", "/portfolio/gearing-up-page2.jpg"],
      description: "Concept boards for Reebok, created as part of a series of short films used in product promotion",
    },
    {
      title: "Necro - Gore",
      category: "Animation",
      image: "/portfolio/necro-gore.jpg",
      images: ["/portfolio/necro-gore.jpg"],
      description:
        "Designed, directed, and animated the music video for Gore, a hip-hop track released by music artist Necro",
    },
    {
      title: "Subway - Finding Dory",
      category: "Advertising",
      image: "/portfolio/subway-p1.png",
      images: ["/portfolio/subway-p1.png", "/portfolio/subway-p2.png"],
      description: "Director boards for a Subway spot marketing their Finding Dory toys promotion",
    },
    {
      title: "CRI Explainer",
      category: "Animation",
      image: "/portfolio/cri-1.png",
      images: [
        "/portfolio/cri-1.png",
        "/portfolio/cri-2.png",
        "/portfolio/cri-3.png",
        "/portfolio/cri-4.png",
        "/portfolio/cri-5.png",
        "/portfolio/cri-6.png",
      ],
      description: "Drawn and animated for the Cancer Research Institute as an informational demo video",
    },
    {
      title: "Red Bull Creation",
      category: "Film",
      image: "/portfolio/RB-creations-00.jpg",
      images: ["/portfolio/RB-creations-00.jpg"],
      description: "Concept boards for Red Bull's Creation series, featuring maker's from around the US",
    },
  ]

  const services = [
    {
      icon: <Tv className="h-8 w-8" />,
      title: "Television & Streaming",
      description: "Episodic content storyboarding for series, pilots, and streaming platform productions.",
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Commercials & Ads",
      description: "High-impact visual storytelling for brand campaigns and product advertisements.",
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Video Games",
      description: "Interactive narrative sequences, cutscenes, and gameplay visualization.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Film Director",
      company: "Midnight Studios",
      content:
        "Will's storyboards brought our vision to life before we even stepped on set. The attention to detail and understanding of cinematic language is exceptional.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "BrandForge Agency",
      content:
        "Working with Will transformed our commercial concepts into compelling visual narratives. Every frame tells a story.",
      rating: 5,
    },
    {
      name: "Jennifer Walsh",
      role: "Animation Producer",
      company: "Pixel Dreams",
      content:
        "The storyboards were so detailed and expressive, they practically animated themselves. Will understands character and emotion perfectly.",
      rating: 5,
    },
  ]

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && selectedProject && currentImageIndex < selectedProject.images.length - 1) {
      nextImage()
    }
    if (isRightSwipe && currentImageIndex > 0) {
      prevImage()
    }
  }

  const openModal = (project: any) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject && currentImageIndex < selectedProject.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

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
            <Link href="#about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#portfolio" className="hover:text-primary transition-colors">
              Portfolio
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
              <Link href="#about" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link
                href="#portfolio"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
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
      <section className="relative py-12 md:py-12 pb-4 md:pb-4 overflow-hidden">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <div className="space-y-8 flex flex-col justify-center">
              <div className="space-y-3">
                <Badge variant="outline" className="w-fit px-4 py-1 text-md">
                  Professional Storyboard Artist
                </Badge>
                <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
                  Bringing Ideas to <span className="text-primary">Life</span>
                </h1>
                <p className="text-xl">Helping directors and brands communicate their vision through drawings.</p>
                <p className="text-md text-muted-foreground">
                  With a history in the film and animation industry, I'm familiar with production flows and have a
                  strong understanding of film language. My experience has ranged from entertainment to commercial
                  advertising.
                </p>
              </div>

              <div>
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="#contact">
                    Get In Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <StoryboardSlideshow />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="pt-8 pb-12">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-4 md:p-6 border border-muted/30">
            <div className="text-center space-y-2 mb-6 mt-2">
              <Badge variant="outline" className="bg-white">
                Portfolio
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
            </div>

            <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div
                    className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                    onClick={() => openModal(item)}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className={
                        index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5
                          ? "w-full h-full object-cover object-center scale-150 group-hover:scale-[1.65] transition-transform duration-300"
                          : "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      }
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="p-4 md:p-5">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-xl
                  ">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button size="lg" variant="outline">
                View Complete Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Image Modal with Touch Support */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div
            ref={modalRef}
            className="relative max-w-6xl max-h-[90vh] w-full h-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation arrows - larger on mobile */}
            {selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  disabled={currentImageIndex === 0}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 md:p-2 transition-colors touch-manipulation"
                >
                  <ChevronLeft className="h-8 w-8 md:h-6 md:w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  disabled={currentImageIndex === selectedProject.images.length - 1}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/75 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 md:p-2 transition-colors touch-manipulation"
                >
                  <ChevronRight className="h-8 w-8 md:h-6 md:w-6" />
                </button>
              </>
            )}

            {/* Page indicator */}
            {selectedProject.images.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                Page {currentImageIndex + 1} of {selectedProject.images.length}
              </div>
            )}

            {/* Main image - clickable areas for navigation on mobile */}
            <div className="relative w-full h-full">
              <Image
                src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${selectedProject.title} - Page ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
                priority
                quality={90}
                sizes="100vw"
              />

              {/* Invisible click areas for mobile navigation */}
              {selectedProject.images.length > 1 && (
                <>
                  {/* Left click area */}
                  {currentImageIndex > 0 && (
                    <div
                      className="absolute left-0 top-0 w-1/3 h-full z-5 md:hidden"
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                    />
                  )}
                  {/* Right click area */}
                  {currentImageIndex < selectedProject.images.length - 1 && (
                    <div
                      className="absolute right-0 top-0 w-1/3 h-full z-5 md:hidden"
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                    />
                  )}
                </>
              )}
            </div>

            {/* Dot navigation - larger on mobile */}
            {selectedProject.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-3 md:space-x-2">
                {selectedProject.images.map((_image: string, index: number) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToImage(index)
                    }}
                    className={`w-4 h-4 md:w-3 md:h-3 rounded-full transition-all touch-manipulation ${
                      index === currentImageIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Swipe instruction for mobile */}
            {selectedProject.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-xs md:hidden opacity-60">
                Swipe or tap sides to navigate
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-6 bg-muted/80">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
              <Badge variant="outline" className="bg-white">About Me</Badge>
                <h2 className="text-2xl md:text-2xl font-bold">Artist and Motion Designer</h2>
                <p className="text-md text-muted-foreground">
                  I continue to enjoy working as an animator. I've had a traditional art background,
                  with the pleasure of evolving alongside technology over the years. I was inspired by Japanese animation and video games growing up. 
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
              
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">wsamatis@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-muted-foreground">+1 (781) 983-7173</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-muted-foreground">Boston, MA</div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Start Your Project</CardTitle>
                <CardDescription>
                  For more information, reach out directly or submit the form below and I'll get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <FormControl>
                            <Input placeholder="Feature Film, Commercial, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project, timeline, and any specific requirements..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
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
