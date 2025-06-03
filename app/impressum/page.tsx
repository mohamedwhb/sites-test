import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Header mit Zurück-Button */}
      <header className="px-4 lg:px-6 h-20 flex items-center border-b border-[#e0d5c1]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center text-[#555] hover:text-[#d4af37] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm">Zurück zur Startseite</span>
          </Link>
          <Link href="/" className="flex items-center justify-center">
            <Image src="/sisters_logo.png" alt="Sisters Deko Logo" width={120} height={48} />
          </Link>
          <div className="w-[120px]"></div> {/* Platzhalter für Ausrichtung */}
        </div>
      </header>

      {/* Impressum Inhalt */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-light text-[#333] mb-4 tracking-wide">Impressum</h1>
              <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-6"></div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">Angaben gemäß § 5 TMG</h2>
                <p className="text-[#555] mb-2">SISTERS DEKO Einzelhandel</p>
                <p className="text-[#555] mb-2">Inhaberin: Kezban Öztürk</p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">Kontakt</h2>
                <p className="text-[#555] mb-2">Puchsbaumgasse 1</p>
                <p className="text-[#555] mb-2">1100 Wien</p>
                <p className="text-[#555] mb-2">Österreich</p>
                <p className="text-[#555] mb-2">
                  <span className="font-medium">Telefon:</span> +43 660 5715718
                </p>
                <p className="text-[#555] mb-2">
                  <span className="font-medium">E-Mail:</span>{" "}
                  <a href="mailto:sisters.deko@gmx.at" className="text-[#d4af37] hover:underline">
                    sisters.deko@gmx.at
                  </a>
                </p>
                <p className="text-[#555] mb-2">
                  <span className="font-medium">Instagram:</span>{" "}
                  <a
                    href="https://www.instagram.com/sistersdekowien"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4af37] hover:underline"
                  >
                    @sistersdekowien
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">Umsatzsteuer-ID</h2>
                <p className="text-[#555] mb-2">
                  <span className="font-medium">UID-Nummer:</span> ATU70032047
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">Aufsichtsbehörde</h2>
                <p className="text-[#555] mb-2">Magistratisches Bezirksamt für den 10. Bezirk</p>
                <p className="text-[#555] mb-2">1100 Wien</p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">Streitschlichtung</h2>
                <p className="text-[#555] mb-2">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4af37] hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-[#555]">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">Haftung für Inhalte</h2>
                <p className="text-[#555] mb-4">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                  forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-[#555]">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                  Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image src="/sisters-deko-logo.png" alt="Sisters Deko Logo" width={150} height={60} />
            </div>
            <div className="text-sm text-[#777]">
              © {new Date().getFullYear()} Sisters Deko. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/impressum" className="text-sm text-[#777] hover:text-[#d4af37] transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-[#777] hover:text-[#d4af37] transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
