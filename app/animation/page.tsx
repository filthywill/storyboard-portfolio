"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeaderBadge } from "@/components/section-header-badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
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
import StoryboardSlideshow from "@/components/storyboard-slideshow"

export default function AnimationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const animationItems = [
    {
      title: "Innovation",
      category: "Motion Graphics",
      image: "https://vumbnail.com/1107190955.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1107190955.jpg?v=" + Date.now()],
      previewVideo: "/videos/innovation-preview.mp4",
      video: "https://player.vimeo.com/video/1107190955?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "A design piece using the movement of shapes and text to tell a story.",
    },
    {
      title: "Under Armour Fit Series",
      category: "Visual Effects",
      image: "https://vumbnail.com/164464186.jpg?v=" + Date.now(),
      images: [
        "/portfolio/cri-1.png",
        "/portfolio/cri-2.png",
        "/portfolio/cri-3.png",
        "/portfolio/cri-4.png",
        "/portfolio/cri-5.png",
        "/portfolio/cri-6.png",
      ],
      previewVideo: "/videos/ua-mens-fit-preview.mp4",
      video: "https://player.vimeo.com/video/164464186?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "3D Modeling, compositing, and animation design for product promo.",
    },
    {
      title: "Jassby Bells",
      category: "2D Animation",
      image: "https://vumbnail.com/1107202656.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1107202656.jpg?v=" + Date.now()],
      previewVideo: "/videos/jassby-bells-preview.mp4",
      video: "https://player.vimeo.com/video/1107202656?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Music Video produced as a holiday promotion for the Jassby app.",
    },
    {
      title: "SolidWorks Design",
      category: "Visual Effects",
      image: "https://vumbnail.com/1107211380.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1107211380.jpg?v=" + Date.now()],
      previewVideo: "/videos/solidworks-design-preview.mp4",
      video: "https://player.vimeo.com/video/1107211380?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Roto, animation, and time ramping effects on clips used for a marketing series.",
    },
    {
      title: "Women's Fit Collection",
      category: "Visual Effects",
      image: "https://vumbnail.com/1107215919.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1107215919.jpg?v=" + Date.now()],
      previewVideo: "/videos/womens-fit-collection-preview.mp4",
      video: "https://player.vimeo.com/video/1107215919?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Environmental effects, as well as 3D Modeling, compositing, and animation.",
    },
    {
      title: "Promoboxx",
      category: "Motion Graphics",
      image: "https://vumbnail.com/183907502.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/183907502.jpg?v=" + Date.now()],
      previewVideo: "/videos/promoboxx-preview.mp4",
      video: "https://player.vimeo.com/video/183907502?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Infodesign video produced to promote company growth.",
    },
    {
      title: "Boston's Got Wings",
      category: "Motion Graphics",
      image: "/portfolio/bostons-got-wings.jpg",
      images: ["/portfolio/bostons-got-wings.jpg"],
      previewVideo: "/videos/bostons-got-wings-preview.mp4",
      video: "https://player.vimeo.com/video/92287203?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Kinetic type and motion graphics design to promote BGW.",
    },
    {
      title: "Surface Pro",
      category: "Motion Graphics",
      image: "/portfolio/surface-pro-thumb.jpg",
      images: ["/portfolio/surface-pro-thumb.jpg"],
      previewVideo: "/videos/surface-pro-preview.mp4",
      video: "https://player.vimeo.com/video/102261960?badge=0&autopause=0&player_id=0&app_id=58479",
             description: "Promotional video designed and animated for internal use."},
    {
      title: "Necro 'GORE'",
      category: "2D Animation",
      image: "/portfolio/GORE-thumb.jpg",
      images: ["/portfolio/GORE-thumb.jpg"],
      previewVideo: "/videos/necro-gore-preview.mp4",
      video: "https://player.vimeo.com/video/62319684?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Music video produced using 2D animation.",
    },
    {
      title: "Walker Bot",
      category: "3D Animation",
      image: "https://vumbnail.com/38568243.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/38568243.jpg?v=" + Date.now()],
      previewVideo: "/videos/walker-bot-preview.mp4",
      video: "https://player.vimeo.com/video/38568243?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Music video mixing a blend of 2D and 3D animation.",
    },
    {
      title: "Earn It",
      category: "2D Animation",
      image: "https://vumbnail.com/1107450631.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1107450631.jpg?v=" + Date.now()],
      previewVideo: "/videos/earn-it-preview.mp4",
      video: "https://player.vimeo.com/video/1107450631?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Music video produced to promote the Jassby app.",
    },
    {
      title: "Do the KIND Thing",
      category: "Motion Graphics",
      image: "/portfolio/KIND-thumb.jpg",
      images: ["/portfolio/KIND-thumb.jpg"],
      previewVideo: "/videos/kind-thing-preview.mp4",
      video: "https://player.vimeo.com/video/1107491496?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Typography animation supplementing live footage.",
    },
    {
      title: "Holiday Card",
      category: "2D Animation",
      image: "https://vumbnail.com/1107508650.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1107508650.jpg?v=" + Date.now()],
      previewVideo: "/videos/holiday-card-preview.mp4",
      video: "https://player.vimeo.com/video/1107508650?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Holiday card using 2D animation.",
    },
    {
      title: "Jassby",
      category: "Logo Animation",
      image: "https://vumbnail.com/1109373008.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1109373008.jpg?v=" + Date.now()],
      previewVideo: "/videos/jassby-logo-preview.mp4",
      video: "https://player.vimeo.com/video/1109373008?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Designed for and used as the Jassby brand identity.",
    },
    {
      title: "TimePayment",
      category: "Logo Animation",
      image: "https://vumbnail.com/1109371431.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1109371431.jpg?v=" + Date.now()],
      previewVideo: "/videos/timepayment-logo-preview.mp4",
      video: "https://player.vimeo.com/video/1109371431?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Designed for TimePayment media branding.",
    },
    {
      title: "Coverys",
      category: "Logo Animation",
      image: "https://vumbnail.com/1109373843.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1109373843.jpg?v=" + Date.now()],
      previewVideo: "/videos/coverys-logo-preview.mp4",
      video: "https://player.vimeo.com/video/1109373843?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Designed for Coverys marketing materials.",
    },
    {
      title: "Modo Labs",
      category: "Logo Animation",
      image: "https://vumbnail.com/1109380828.jpg?v=" + Date.now(),
      images: ["https://vumbnail.com/1109380828.jpg?v=" + Date.now()],
      previewVideo: "/videos/modo-labs-logo-preview.mp4",
      video: "https://player.vimeo.com/video/1109380828?badge=0&autopause=0&player_id=0&app_id=58479",
      description: "Bumper created for Modo Labs.",
    },

  ]

  const services = [
    {
      icon: <Tv className="h-8 w-8" />,
      title: "2D Animation",
      description: "Traditional and digital 2D animation for commercials, films, and digital content.",
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Motion Graphics",
      description: "Dynamic motion graphics and animated sequences for brand campaigns and marketing.",
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Character Animation",
      description: "Expressive character animation with personality-driven movements and storytelling.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Animation Director",
      company: "Midnight Studios",
      content:
        "Will's animation work brings characters to life with incredible attention to detail and fluid movement. The quality and creativity are exceptional.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "BrandForge Agency",
      content:
        "The motion graphics and animated sequences Will created elevated our brand campaigns to new heights. Every frame is crafted with purpose.",
      rating: 5,
    },
    {
      name: "Jennifer Walsh",
      role: "Animation Producer",
      company: "Pixel Dreams",
      content:
        "Will's animation skills are outstanding. The characters feel alive and the motion is incredibly smooth and natural.",
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
      <section className="relative py-12 md:py-12 pb-4 md:pb-4 overflow-hidden">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <div className="space-y-8 flex flex-col justify-center">
              <div className="space-y-3">
                <Badge variant="outline" className="w-fit px-4 py-1 text-md">
                  Animation & Motion Graphics Designer
                </Badge>
                <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
                  Bringing Ideas to <span className="text-primary">Life</span>
                </h1>
                <p className="text-xl">Telling stories through art and design.</p>
                <p className="text-md text-muted-foreground">
                I work across both 2D and 3D animation, with experience ranging from character animation and motion graphics to visual effects for film. Over the years, I’ve collaborated with talented studios and globally recognized brands to create everything from music videos to advertising campaigns.  
                </p>
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
                {/* Animation Reel Label */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge variant="outline" className="px-4 py-1 text-sm font-medium bg-background/95 backdrop-blur-sm border-border/50 rounded-md">
                    Animation Reel
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Portfolio Section */}
             <section id="portfolio" className="pt-4 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-4 md:p-6 border border-muted/30">
            <div className="text-center space-y-2 mb-6 mt-2">

              <h2 className="text-2xl md:text-3xl font-bold">Featured Animations</h2>
            </div>

                                                                <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 gap-4">
               {[animationItems[0], animationItems[4], animationItems[2]].map((item, index) => (
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


          </div>
        </div>
      </section>

             {/* Motion Graphics Design Section */}
       <section id="motion-graphics" className="pt-0 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
                <SectionHeaderBadge>Motion Graphics Design</SectionHeaderBadge>
            
             </div>

                         <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {[animationItems[5], animationItems[7], animationItems[6], animationItems[11]].map((item, index) => (
                 <Card key={index + 3} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
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
                    <CardDescription className="text-xs">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2D Animation Section */}
      <section id="2d-animation" className="pt-0 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
               <SectionHeaderBadge>Animated Shorts</SectionHeaderBadge>
             </div>

             <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {[animationItems[10], animationItems[9], animationItems[8], animationItems[12]].map((item, index) => (
                 <Card key={index + 9} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
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
                   <CardHeader className="p-4 md:p-5">
                     <div className="flex items-center justify-between">
                       <Badge variant="secondary">{item.category}</Badge>
                     </div>
                     <CardTitle className="group-hover:text-primary transition-colors text-xl">{item.title}</CardTitle>
                     <CardDescription>{item.description}</CardDescription>
                   </CardHeader>
                 </Card>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Visual Effects Production Section */}
      <section id="visual-effects" className="pt-0 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
                <SectionHeaderBadge>Visual Effects Production</SectionHeaderBadge>
            
             </div>

                                       <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 gap-4">
               {[animationItems[3], animationItems[1]].map((item, index) => (
                  <Card key={index + 3} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
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
          </div>
        </div>
      </section>

      {/* Logo Animation Section */}
      <section id="logo-animation" className="pt-0 pb-2">
        <div className="container max-w-[1025px] mx-auto px-4">
          <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
            <div className="text-center space-y-2 mb-4 mt-0">
               <SectionHeaderBadge>Logo Animation</SectionHeaderBadge>
             </div>

             <div className="grid grid-cols-1 min-[525px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {[animationItems[13], animationItems[14], animationItems[15], animationItems[16]].map((item, index) => (
                 <Card key={index + 16} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
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
                   <CardHeader className="p-4 md:p-5">
                     <div className="flex items-center justify-between">
                       <Badge variant="secondary">{item.category}</Badge>
                     </div>
                     <CardTitle className="group-hover:text-primary transition-colors text-xl">{item.title}</CardTitle>
                     <CardDescription>{item.description}</CardDescription>
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

    </div>
  )
} 