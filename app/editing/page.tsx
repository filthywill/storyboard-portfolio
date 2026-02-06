"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Play,
  Tv,
  Film,
  Video,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
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

export default function EditingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
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

  const editingItems = [
    {
      title: "Colonial Mills",
      category: "Documentary",
      image: "/portfolio/colonial.jpg",
      images: ["/portfolio/colonial.jpg"],
      previewVideo: "/videos/colonial-preview.mp4",
      video: "https://player.vimeo.com/video/1110352278?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "A look into the historical relationship between Beacon Mutual Insurance and their client Colonial Mills.",
    },
    {
      title: "Midrex Recruitment",
      category: "Documentary",
      image: "/portfolio/midrex-recruiting.jpg",
      images: ["/portfolio/midrex-recruiting.jpg"],
      previewVideo: "/videos/midrex-recruit-preview.mp4",
      video: "https://player.vimeo.com/video/1110339145?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Highlighting the benefits and culture of working at Midrex for potential recruits.",
    },
    {
      title: "GW&K 50th Anniversary",
      category: "Documentary",
      image: "/portfolio/gwk50.jpg",
      images: ["/portfolio/gwk50.jpg"],
      previewVideo: "/videos/gwk50-preview.mp4",
      video: "https://player.vimeo.com/video/1110982458?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Celebrating the firm's 50 years in business through personal interviews.",
    },
    {
      title: "Converse Newline",
      category: "Corporate",
      image: "/portfolio/converse-newline.jpg",
      images: ["/portfolio/converse-newline.jpg"],
      previewVideo: "/videos/converse-newline-preview.mp4",
      video: "https://player.vimeo.com/video/1110477031?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Internal sizzle reel showcasing global retail location setups.",
    },
    {
      title: "Celebrating 40 Years",
      category: "Corporate",
      image: "/portfolio/midrex40.jpg",
      images: ["/portfolio/midrex40.jpg"],
      previewVideo: "/videos/midrex40-preview.mp4",
      video: "https://player.vimeo.com/video/1162616542?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Showcasing Midrex's 40 years of evolution as a company.",
    },
    {
      title: "New England Council",
      category: "Advertising",
      image: "/portfolio/necouncil.jpg",
      images: ["/portfolio/necouncil.jpg"],
      previewVideo: "/videos/necouncil-preview.mp4",
      video: "https://player.vimeo.com/video/1110339347?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Promotional video for the New England Council.",
    },
    {
      title: "The Cooperative Bank",
      category: "Advertising",
      image: "/portfolio/tcbgeneral.jpg",
      images: ["/portfolio/tcbgeneral.jpg"],
      previewVideo: "/videos/tcbgeneral-preview.mp4?v=2",
      video: "https://player.vimeo.com/video/1162593876?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "General brand local AD for TCB.",
    },
    {
      title: "Project Seven",
      category: "Social Media",
      image: "/placeholder.svg",
      images: ["/placeholder.svg"],
      previewVideo: undefined,
      video: undefined,
      description: "Placeholder description for promotional editing project.",
    },
    {
      title: "Project Eight",
      category: "Social Media",
      image: "/placeholder.svg",
      images: ["/placeholder.svg"],
      previewVideo: undefined,
      video: undefined,
      description: "Placeholder description for promotional editing project.",
    },
  ]

  const services = [
    {
      icon: <Film className="h-8 w-8" />,
      title: "Documentary Editing",
      description: "Crafting compelling narratives from raw documentary footage with attention to pacing and storytelling.",
    },
    {
      icon: <Tv className="h-8 w-8" />,
      title: "Corporate Video",
      description: "Professional corporate video editing for presentations, training, and brand communications.",
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Advertising & Commercials",
      description: "Dynamic commercial editing that captures attention and drives engagement.",
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Promotional Content",
      description: "Engaging promotional videos that effectively communicate your message and brand.",
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
    
    // Preload all images for the selected project
    project.images.forEach((imageSrc: string) => {
      const img = new window.Image()
      img.src = imageSrc
    })
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
          <Link href="/about" className="flex items-center space-x-2">
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
            <Link href="/editing" className="hover:text-primary transition-colors">
              Editing
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
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
                href="/editing"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Editing
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
      <section className="relative py-8 md:py-8 pb-4 md:pb-4 overflow-hidden">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <Badge variant="outline" className="w-fit px-4 py-1 text-md">
              Video Editor
            </Badge>
            <h1 className="text-4xl md:text-4xl font-bold tracking-tight max-w-3xl">
              Telling Stories Through <span className="text-primary">Film</span>
            </h1>
            <p className="text-xl" hidden>Where structure, rhythm, and emotion align.</p>
            <p className="text-md md:text-md text-muted-foreground max-w-2xl" style={{ lineHeight: '1.3' }}>
            My editing approach focuses on clarity and intent, designed to tell stories that land their message effectively. I’ve cut a wide range of work, from documentaries to promotional and advertising pieces for social media, shaping raw footage with an emphasis on pacing, structure, and flow.
            </p>
          </div>
        </div>
      </section>

     
      {/* Documentary Section */}
      <section id="documentary" className="pt-0 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
              <Badge variant="outline" className="px-4 py-1 text-xl">
                Documentary
              </Badge>
            </div>

            <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[editingItems[0], editingItems[1], editingItems[2]].map((item, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div
                    className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                    onClick={() => openModal(item)}
                    onMouseEnter={() => setHoveredProject(item.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Video Preview */}
                    {item.previewVideo && hoveredProject === item.title && (
                      <video
                        src={item.previewVideo}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    )}
                    
                    {/* Fallback Image */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <CardHeader className="p-3 md:p-4">
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-xs leading-snug">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section id="corporate" className="pt-0 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
              <Badge variant="outline" className="px-4 py-1 text-xl">
                Corporate
              </Badge>
            </div>

            <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[editingItems[3], editingItems[4]].map((item, index) => (
                <Card key={index + 2} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div
                    className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                    onClick={() => openModal(item)}
                    onMouseEnter={() => setHoveredProject(item.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Video Preview */}
                    {item.previewVideo && hoveredProject === item.title && (
                      <video
                        src={item.previewVideo}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    )}
                    
                    {/* Fallback Image */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <CardHeader className="p-3 md:p-4">
                    <div className="flex items-center justify-between hidden">
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-xs leading-snug">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Section */}
      <section id="advertising" className="pt-0 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
              <Badge variant="outline" className="px-4 py-1 text-xl">
                Advertising
              </Badge>
            </div>

            <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 gap-4">
              {[editingItems[5], editingItems[6]].map((item, index) => (
                <Card key={index + 4} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div
                    className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                    onClick={() => openModal(item)}
                    onMouseEnter={() => setHoveredProject(item.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Video Preview */}
                    {item.previewVideo && hoveredProject === item.title && (
                      <video
                        src={item.previewVideo}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    )}
                    
                    {/* Fallback Image */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <CardHeader className="p-3 md:p-4">
                    <div className="flex items-center justify-between hidden">
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-xs leading-snug">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section - hidden for now */}
      <section id="social-media" className="pt-1 pb-8 hidden">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
              <Badge variant="outline" className="px-4 py-1 text-xl">
                Social Media
              </Badge>
            </div>

            <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[editingItems[7], editingItems[8]].map((item, index) => (
                <Card key={index + 6} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div
                    className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                    onClick={() => openModal(item)}
                    onMouseEnter={() => setHoveredProject(item.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Video Preview */}
                    {item.previewVideo && hoveredProject === item.title && (
                      <video
                        src={item.previewVideo}
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    )}
                    
                    {/* Fallback Image */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <CardHeader className="p-3 md:p-4">
                    <div className="flex items-center justify-between hidden">
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-xs leading-snug">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
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
            {selectedProject.images.length > 1 && !selectedProject.video && (
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
            {selectedProject.images.length > 1 && !selectedProject.video && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                Page {currentImageIndex + 1} of {selectedProject.images.length}
              </div>
            )}

            {/* Main content - video or image */}
            <div className="relative w-full h-full">
              {selectedProject.video ? (
                <div className="w-full h-full">
                  <iframe
                    src={selectedProject.video}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={selectedProject.title}
                  />
                </div>
              ) : (
                <>
                  <Image
                    src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${selectedProject.title} - Page ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    onClick={(e) => e.stopPropagation()}
                    priority
                    quality={90}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                </>
              )}
            </div>

            {/* Dot navigation - larger on mobile */}
            {selectedProject.images.length > 1 && !selectedProject.video && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-3 md:space-x-2">
                {selectedProject.images.map((_image: string, index: number) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToImage(index)
                    }}
                    className={`w-4 h-4 md:w-3 md:h-3 rounded-full transition-all touch-manipulation ${
                      index === currentImageIndex ? "bg-foreground scale-110" : "bg-foreground/50 hover:bg-foreground/75"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Swipe instruction for mobile */}
            {selectedProject.images.length > 1 && !selectedProject.video && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-xs md:hidden opacity-60">
                Swipe or tap sides to navigate
              </div>
            )}
          </div>
        </div>
      )}

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
                <CardTitle>Start Your Editing Project</CardTitle>
                <CardDescription>
                  For more information about video editing services, reach out directly or submit the form below and I'll get back to you within 24
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
                            <Input placeholder="Documentary, Corporate, Advertising, etc." {...field} />
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
                              placeholder="Tell me about your editing project, timeline, and any specific requirements..."
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

    </div>
  )
}



