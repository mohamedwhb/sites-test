import Image from "next/image"

interface ServiceCardProps {
  title: string
  description: string
  iconUrl: string
}

export function ServiceCard({ title, description, iconUrl }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          <Image src={iconUrl || "/placeholder.svg"} alt={title} width={80} height={80} className="opacity-80" />
        </div>
        <h3 className="text-xl font-medium text-[#333] mb-4">{title}</h3>
        <p className="text-[#555] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
