import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  event: string
  imageUrl: string
}

export function TestimonialCard({ quote, author, event, imageUrl }: TestimonialCardProps) {
  return (
    <div className="bg-[#faf7f2] p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#d4af37]/30">
            <Image src={imageUrl || "/placeholder.svg"} alt={author} fill className="object-cover" />
          </div>
        </div>
        <p className="text-[#555] italic mb-6 leading-relaxed">"{quote}"</p>
        <p className="text-[#333] font-medium">{author}</p>
        <p className="text-[#777] text-sm">{event}</p>
      </div>
    </div>
  )
}
