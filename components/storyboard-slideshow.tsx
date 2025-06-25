"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const storyboardImages = [
  { src: "/storyboards/01.png", alt: "Character interaction storyboard panels" },
  { src: "/storyboards/02.png", alt: "Boxing gym training sequence" },
  { src: "/storyboards/03.png", alt: "Car interior dashboard close-ups" },
  { src: "/storyboards/04.png", alt: "Chess game dramatic perspective" },
  { src: "/storyboards/05.png", alt: "Car interior and exterior scenes" },
  { src: "/storyboards/06.png", alt: "Family restaurant and character reactions" },
  { src: "/storyboards/07.png", alt: "Car interior with child character" },
  { src: "/storyboards/10.png", alt: "Living room scenes with animated character" },
  { src: "/storyboards/11.png", alt: "Outdoor sports scene with multiple characters" },
  { src: "/storyboards/12.png", alt: "Crowd scene with character interaction" },
]

export default function StoryboardSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [scalingImages, setScalingImages] = useState<Set<number>>(new Set([0]))

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1 >= storyboardImages.length ? 0 : prevIndex + 1

          // Start scaling the new image immediately
          setScalingImages((prev) => new Set(prev).add(nextIndex))

          // Stop scaling the previous image after the fade transition completes
          setTimeout(() => {
            setScalingImages((prev) => {
              const newSet = new Set(prev)
              newSet.delete(prevIndex)
              return newSet
            })
          }, 2000) // Match the fade transition duration

          return nextIndex
        })
      }, 4500) // 4.5 seconds per image

      return () => clearInterval(interval)
    }
  }, [isHovered])

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {storyboardImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDuration: "2000ms",
          }}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className={`object-cover transition-transform ease-linear ${
              scalingImages.has(index) ? "scale-[1.03]" : "scale-100"
            }`}
            style={{
              transitionDuration: scalingImages.has(index) ? "4500ms" : "0ms",
            }}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Subtle progress indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-60">
        {storyboardImages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
