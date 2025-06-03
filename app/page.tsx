import Image from "next/image"
import Link from "next/link"
import { Parallax } from "@/components/parallax"
import { ServiceCard } from "@/components/service-card"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactForm } from "@/components/contact-form"
import { Instagram, Facebook, Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Hero Section with Parallax */}
      <Parallax className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/romantic-wedding-table-decor.jpg"
            alt="Sisters Deko - Elegante Dekoration"
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <div className="animate-fade-in">
            <Image
              src="/cropped-Sisters_Logo_white-3.png"
              alt="Sisters Deko Logo"
              width={200}
              height={80}
              className="mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">
              Unvergessliche Dekorationen für jeden Anlass
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
              Wir verwandeln Ihre Träume in atemberaubende Realität
            </p>
            <Link
              href="#kontakt"
              className="inline-block px-8 py-3 bg-[#d4af37]/80 hover:bg-[#d4af37] text-white rounded-sm transition-all duration-300 text-sm tracking-wider"
            >
              KONTAKT AUFNEHMEN
            </Link>
          </div>
        </div>
      </Parallax>

      {/* About Section */}
      <section id="uber-uns" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-[#333] mb-8 tracking-wide">Über Sisters Deko</h2>
            <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-10"></div>
            <p className="text-lg text-[#555] mb-8 leading-relaxed">
              Sisters Deko wurde aus der Leidenschaft zweier Schwestern geboren, die außergewöhnliche Momente durch
              exquisite Dekorationen unvergesslich machen wollten. Seit 2016 haben wir uns der Schaffung von stilvollen,
              emotionalen und persönlichen Dekorationskonzepten verschrieben.
            </p>
            <p className="text-lg text-[#555] mb-12 leading-relaxed">
              Unser Ziel ist es, jeden Raum in eine bezaubernde Umgebung zu verwandeln, die Ihre Persönlichkeit
              widerspiegelt und Ihre Gäste beeindruckt. Mit Liebe zum Detail und einem Auge für Ästhetik kreieren wir
              magische Atmosphären für Ihre besonderen Anlässe.
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-4xl font-light text-[#d4af37] mb-2">350+</p>
                <p className="text-sm text-[#777] uppercase tracking-wider">Zufriedene Kunden</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-light text-[#d4af37] mb-2">500+</p>
                <p className="text-sm text-[#777] uppercase tracking-wider">Veranstaltungen</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-light text-[#d4af37] mb-2">9</p>
                <p className="text-sm text-[#777] uppercase tracking-wider">Jahre Erfahrung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="leistungen" className="py-24 bg-[#faf7f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#333] mb-4 tracking-wide">Unsere Leistungen</h2>
            <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-lg text-[#555] max-w-2xl mx-auto">
              Wir bieten maßgeschneiderte Dekorationskonzepte für jeden Anlass, die Ihre Vorstellungen übertreffen
              werden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              title="Hochzeiten"
              description="Wir verwandeln Ihren besonderen Tag in ein märchenhaftes Erlebnis mit eleganten Blumenarrangements, stimmungsvoller Beleuchtung und perfekt abgestimmten Dekorationen."
              iconUrl="/ringe.png"
            />
            <ServiceCard
              title="Firmenfeiern"
              description="Professionelle Dekorationskonzepte für Ihre Unternehmensveranstaltungen, die Ihre Markenidentität widerspiegeln und einen bleibenden Eindruck hinterlassen."
              iconUrl="/firma.png"
            />
            <ServiceCard
              title="Geburtstage"
              description="Personalisierte Dekorationen, die den Charakter des Jubilars einfangen und eine festliche Atmosphäre schaffen, die in Erinnerung bleibt."
              iconUrl="/torte.png"
            />
            <ServiceCard
              title="Individuelle Konzepte"
              description="Maßgeschneiderte Dekorationen für jeden Anlass – von intimen Dinnerpartys bis hin zu großen Galas, perfekt auf Ihre Wünsche abgestimmt."
              iconUrl="/indu.png"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <section id="kontakt" className="py-24 bg-[#faf7f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#333] mb-4 tracking-wide">Kontaktieren Sie uns</h2>
            <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-lg text-[#555] max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam Ihren besonderen Anlass zu einem unvergesslichen Erlebnis machen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <ContactForm />
            </div>
            <div className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-light text-[#333] mb-6">Besuchen Sie uns</h3>
              <div className="mb-8">
                <p className="text-[#555] mb-2">Sisters Deko GmbH</p>
                <p className="text-[#555] mb-2">Puchsbaumgasse 1</p>
                <p className="text-[#555] mb-2">1100 Wien</p>
                <p className="text-[#555] mb-2">Österreich</p>
                <p className="text-[#555] mb-6">+43 660 5715718</p>
                <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/sistersdekowien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4af37] hover:text-[#b08d1e] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/sistersdekowien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4af37] hover:text-[#b08d1e] transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="mailto:sisters.deko@gmx.at"
                  className="text-[#d4af37] hover:text-[#b08d1e] transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
                </div>
              </div>
              <div className="h-64 bg-gray-100 relative overflow-hidden rounded-lg">
              <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1074.3296079442985!2d16.391755736437137!3d48.171417379003096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da9cf857a739b%3A0x3da00d0357584b8f!2sSISTERS%20DEKO!5e0!3m2!1sde!2sat!4v1745910384348!5m2!1sde!2sat"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-700 py-10 border-t">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
    
    {/* Logo und kurze Beschreibung */}
    <div className="flex flex-col items-center text-center space-y-3">
      <img src="/sisters_logo.png" alt="Sisters Deko Logo" className="h-20 w-auto" />
      <p className="text-sm text-gray-500 max-w-xs">
        Stilvolle Dekorationen für besondere Momente.
      </p>
    </div>

    {/* Navigation */}
    <div className="flex flex-col items-center text-center space-y-2 text-sm">
      <a href="/impressum" className="hover:text-[#d4af37] transition-colors">Impressum</a>
      <a href="/datenschutz" className="hover:text-[#d4af37] transition-colors">Datenschutz</a>
      <a href="#kontakt" className="hover:text-[#d4af37] transition-colors scroll-smooth">Kontakt</a>
    </div>

    {/* Social Media */}
    <div className="flex space-x-4">
      <a
        href="https://www.instagram.com/dein_instagram_profil"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#d4af37] hover:text-[#b08d1e] transition-transform transform hover:scale-110"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href="https://www.facebook.com/deine_facebook_seite"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#d4af37] hover:text-[#b08d1e] transition-transform transform hover:scale-110"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <a
        href="mailto:info@sistersdeko.de"
        className="text-[#d4af37] hover:text-[#b08d1e] transition-transform transform hover:scale-110"
      >
        <Mail className="h-5 w-5" />
      </a>
    </div>

  </div>

  {/* Copyright */}
  <div className="text-center text-xs text-gray-400 mt-6">
    © {new Date().getFullYear()} Sisters Deko. Alle Rechte vorbehalten.
  </div>
</footer>
    </main>
  )
}
