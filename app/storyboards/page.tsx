"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Download,
  Play,
  Tv,
  Gamepad2,
  Star,
  Quote,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import StoryboardSlideshow from "@/components/storyboard-slideshow"
import { SectionHeaderBadge } from "@/components/section-header-badge"

export default function StoryboardsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const portfolioItems = [
    {
      title: "Red Bull - BGW",
      category: "Film",
      image: "/portfolio/BGW_panels_final_web.jpg",
      images: ["/portfolio/BGW_panels_final_web.jpg"],
      description: "",
      hoverText: "Red Bull's \"Boston's Got Wings\" campaign with Rajon Rondo",
    },
    {
      title: "Reebok - Boxing",
      category: "Film",
      image: "/portfolio/gearing-up.jpg",
      images: ["/portfolio/gearing-up.jpg", "/portfolio/gearing-up-page2.jpg"],
      description: "",
      hoverText: "Concept boards for Reebok, created as part of a series of short films used in product promotion",
    },
    {
      title: "Necro - Gore",
      category: "Animation",
      image: "/portfolio/necro-gore.jpg",
      images: ["/portfolio/necro-gore.jpg"],
      description:
        "",
      hoverText: "The animated music video for Gore by music artist Necro",
    },
    {
      title: "Subway - Finding Dory",
      category: "Film",
      image: "/portfolio/subway-p1.png",
      images: ["/portfolio/subway-p1.png", "/portfolio/subway-p2.png"],
      description: "",
      hoverText: "Director boards for a Subway commercial promoting their Finding Dory special",
    },
    {
      title: "Red Bull - Creation",
      category: "Film",
      image: "/portfolio/RB-creations-th.jpg",
      images: ["/portfolio/RB-creations-00.jpg"],
      description: "",
      hoverText: "Concept boards for Red Bull's Creation series, featuring maker's from around the US",
    },
    {
      title: "Cancer Research Institute",
      category: "Motion Graphics",
      image: "/portfolio/cri-1.png",
      images: [
        "/portfolio/cri-1.png",
        "/portfolio/cri-2.png",
        "/portfolio/cri-3.png",
        "/portfolio/cri-4.png",
        "/portfolio/cri-5.png",
        "/portfolio/cri-6.png",
      ],
      description: "",
      hoverText: "Drawn and animated for the Cancer Research Institute as an informational demo video",
    },
    {
      title: "Andover Innovation",
      category: "Motion Graphics",
      image: "/portfolio/Andover_th.jpg",
      images: [
        "/portfolio/Andover_p01.jpg",
        "/portfolio/Andover_p02.jpg",
        "/portfolio/Andover_p03.jpg",
        "/portfolio/Andover_p04.jpg",
      ],
      description: "",
      hoverText: "Designed and animated as a marketing piece for The Andover Companies",
    },
    {
      title: "Beacon Mutual",
      category: "Animation",
      image: "/portfolio/BeaQuick_th.jpg",
      images: [
        "/portfolio/BeaQuick_01.jpg",
        "/portfolio/BeaQuick_02.jpg",
        "/portfolio/BeaQuick_03.jpg",
        "/portfolio/BeaQuick_04.jpg",
      ],
      description: "",
      hoverText: "Promoting Beacon Mutual Insurance's BeaQuick platform",
    },
    {
      title: "Northeastern University",
      category: "Animation",
      image: "/portfolio/NEU_th.jpg",
      images: [
        "/portfolio/NEU_02.jpg",
        "/portfolio/NEU_03.jpg",
        "/portfolio/NEU_04.jpg",
        "/portfolio/NEU_05.jpg",
        "/portfolio/NEU_06.jpg",
        "/portfolio/NEU_07.jpg",
        "/portfolio/NEU_08.jpg",
      ],
      description: "",
      hoverText: "An internal film and animation piece promoting harassment awareness",
    },
    {
      title: "Found Money",
      category: "Animation",
      image: "/portfolio/FoundMoney_01.jpg",
      images: [
        "/portfolio/FoundMoney_01.jpg",
        "/portfolio/FoundMoney_02.jpg",
      ],
      description: "",
      hoverText: "A video developed with MORE Advertising, promoting the Found Money government program.",
    },
    {
      title: "Diebold Nixdorf",
      category: "Motion Graphics",
      image: "/portfolio/DN_p01.jpg",
      images: [
        "/portfolio/DN_p01.jpg",
        "/portfolio/DN_p02.jpg",
        "/portfolio/DN_p03.jpg",
      ],
      description: "",
      hoverText: "A video to promote Diebold Nixdorf's Vynamic Retail Platform.",
    },
  ]

  const filmItems = portfolioItems.filter((item) => item.category === "Film")
  const animationItems = portfolioItems.filter((item) => item.category === "Animation")
  const motionGraphicsItems = portfolioItems.filter((item) => item.category === "Motion Graphics")

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
                  Storyboard Artist
                </Badge>
                <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
                  Visual <span className="text-primary">Storytelling</span>
                </h1>
                <p className="text-xl">Helping studios and brands communicate their vision through drawings.</p>
                <p className="text-md text-muted-foreground">
                With a background in the film and animation industry, I bring a strong understanding of production workflows and film language to every storyboard. My experience spans both entertainment and commercial advertising, allowing me to adapt quickly to different creative and production needs.</p>
              </div>
            </div>

            <StoryboardSlideshow />
          </div>
        </div>
      </section>

      {/* Portfolio Section - Film */}
      {filmItems.length > 0 && (
        <section id="portfolio-film" className="pt-4 pb-2">
          <div className="container max-w-[1025px] mx-auto px-4">
            <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
              <div className="text-center space-y-2 mb-4 mt-0">
                <SectionHeaderBadge>Film</SectionHeaderBadge>
              </div>
              <TooltipProvider delayDuration={300}>
                <div className={`grid gap-3 grid-cols-1 min-[475px]:grid-cols-2 ${filmItems.length > 3 ? "min-[768px]:grid-cols-4" : "min-[685px]:grid-cols-3"}`}>
                  {filmItems.map((item, index) => {
                    const shouldSpanLast = filmItems.length % 2 === 1;
                    return (
                    <Tooltip key={item.title}>
                      <TooltipTrigger asChild>
                        <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${shouldSpanLast && index === filmItems.length - 1 ? "min-[475px]:col-span-2 min-[475px]:justify-self-center min-[475px]:w-full min-[475px]:max-w-[520px] min-[685px]:col-span-1 min-[685px]:justify-self-auto min-[685px]:max-w-none" : ""}`}>
                          <div
                            className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                            onClick={() => openModal(item)}
                          >
                            <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover object-center scale-150 group-hover:scale-[1.65] transition-transform duration-300"
                                priority={index < 2}
                                loading={index < 2 ? "eager" : "lazy"}
                                quality={85}
                                sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                              />
                            </div>
                            <CardHeader className="px-3 pt-2 pb-2 md:px-3 md:pt-2.5 md:pb-2.5">
                              <CardTitle className="group-hover:text-primary transition-colors text-base">
                                {item.title}
                              </CardTitle>
                              <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[280px] whitespace-normal text-left px-3 py-2.5">
                          {item.hoverText}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section - Animation */}
      {animationItems.length > 0 && (
        <section id="portfolio-animation" className="pt-0 pb-2">
          <div className="container max-w-[1025px] mx-auto px-4">
            <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
              <div className="text-center space-y-2 mb-4 mt-0">
                <SectionHeaderBadge>Animation</SectionHeaderBadge>
              </div>
              <TooltipProvider delayDuration={300}>
                <div className={`grid gap-3 grid-cols-1 min-[475px]:grid-cols-2 ${animationItems.length > 3 ? "min-[768px]:grid-cols-4" : "min-[685px]:grid-cols-3"}`}>
                  {animationItems.map((item, index) => {
                    const shouldSpanLast = animationItems.length % 2 === 1;
                    return (
                    <Tooltip key={item.title}>
                      <TooltipTrigger asChild>
                        <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${shouldSpanLast && index === animationItems.length - 1 ? "min-[475px]:col-span-2 min-[475px]:justify-self-center min-[475px]:w-full min-[475px]:max-w-[520px] min-[685px]:col-span-1 min-[685px]:justify-self-auto min-[685px]:max-w-none" : ""}`}>
                          <div
                            className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                            onClick={() => openModal(item)}
                          >
                            <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover object-center scale-150 group-hover:scale-[1.65] transition-transform duration-300"
                                priority={index < 2}
                                loading={index < 2 ? "eager" : "lazy"}
                                quality={85}
                                sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                              />
                            </div>
                            <CardHeader className="px-3 pt-2 pb-2 md:px-3 md:pt-2.5 md:pb-2.5">
                              <CardTitle className="group-hover:text-primary transition-colors text-base">
                                {item.title}
                              </CardTitle>
                              <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[280px] whitespace-normal text-left px-3 py-2.5">
                          {item.hoverText}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section - Motion Graphics */}
      {motionGraphicsItems.length > 0 && (
        <section id="portfolio-motion-graphics" className="pt-0 pb-12">
          <div className="container max-w-[1025px] mx-auto px-4">
            <div className="bg-muted/80 rounded-3xl p-3 md:p-3 border border-muted/30">
              <div className="text-center space-y-2 mb-4 mt-0">
                <SectionHeaderBadge>Motion Graphics</SectionHeaderBadge>
              </div>
              <TooltipProvider delayDuration={300}>
                <div className={`grid gap-3 grid-cols-1 min-[475px]:grid-cols-2 ${motionGraphicsItems.length > 3 ? "min-[768px]:grid-cols-4" : "min-[685px]:grid-cols-3"}`}>
                  {motionGraphicsItems.map((item, index) => {
                    const shouldSpanLast = motionGraphicsItems.length % 2 === 1;
                    return (
                    <Tooltip key={item.title}>
                      <TooltipTrigger asChild>
                        <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${shouldSpanLast && index === motionGraphicsItems.length - 1 ? "min-[475px]:col-span-2 min-[475px]:justify-self-center min-[475px]:w-full min-[475px]:max-w-[420px] min-[685px]:col-span-1 min-[685px]:justify-self-auto min-[685px]:max-w-none" : ""}`}>
                          <div
                            className="aspect-[2/1] md:aspect-[4/3] overflow-hidden cursor-pointer relative"
                            onClick={() => openModal(item)}
                          >
                            <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover object-center scale-150 group-hover:scale-[1.65] transition-transform duration-300"
                                priority={index < 2}
                                loading={index < 2 ? "eager" : "lazy"}
                                quality={85}
                                sizes="(max-width: 525px) 100vw, (max-width: 768px) 50vw, 33vw"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                              />
                            </div>
                            <CardHeader className="px-3 pt-2 pb-2 md:px-3 md:pt-2.5 md:pb-2.5">
                              <CardTitle className="group-hover:text-primary transition-colors text-base">
                                {item.title}
                              </CardTitle>
                              <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[280px] whitespace-normal text-left px-3 py-2.5">
                          {item.hoverText}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </section>
      )}

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
                       index === currentImageIndex ? "bg-foreground scale-110" : "bg-foreground/50 hover:bg-foreground/75"
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

    </div>
  )
} 