import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function DatenschutzPage() {
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

      {/* Datenschutz Inhalt */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-light text-[#333] mb-4 tracking-wide">Datenschutzerklärung</h1>
              <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mb-6"></div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">1. Wer wir sind</h2>
                <p className="text-[#555] mb-4">
                  Die Webseite <strong>www.sistersdeko.at</strong> wird von SISTERS DEKO Einzelhandel, Inhaberin Kezban
                  Öztürk, betrieben. Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir
                  verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG
                  2003).
                </p>
                <p className="text-[#555]">
                  In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung
                  im Rahmen unserer Website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">2. Erhebung personenbezogener Daten</h2>
                <h3 className="text-lg font-medium text-[#555] mb-3">2.1 Kommentare</h3>
                <p className="text-[#555] mb-4">
                  Wenn Besucher Kommentare auf der Website schreiben, sammeln wir die Daten, die im Kommentar-Formular
                  angezeigt werden, außerdem die IP-Adresse des Besuchers und den User-Agent-String (damit wird der
                  Browser identifiziert), um die Erkennung von Spam zu unterstützen.
                </p>
                <p className="text-[#555] mb-4">
                  Aus Ihrer E-Mail-Adresse kann eine anonymisierte Zeichenfolge erstellt (auch Hash genannt) und dem
                  Gravatar-Dienst übergeben werden, um zu prüfen, ob Sie diesen benutzen. Die Datenschutzerklärung des
                  Gravatar-Dienstes finden Sie hier:{" "}
                  <a
                    href="https://automattic.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4af37] hover:underline"
                  >
                    https://automattic.com/privacy/
                  </a>
                  . Nachdem Ihr Kommentar freigegeben wurde, ist Ihr Profilbild öffentlich im Kontext Ihres Kommentars
                  sichtbar.
                </p>

                <h3 className="text-lg font-medium text-[#555] mb-3">2.2 Medien</h3>
                <p className="text-[#555] mb-4">
                  Wenn Sie Bilder auf die Website laden, sollten Sie vermeiden, Bilder mit eingebetteten Standortdaten
                  (EXIF GPS) hochzuladen. Besucher dieser Website könnten Standortdaten von der Website herunterladen
                  und extrahieren.
                </p>

                <h3 className="text-lg font-medium text-[#555] mb-3">2.3 Kontaktformulare</h3>
                <p className="text-[#555]">
                  Wenn Sie das Kontaktformular auf unserer Website nutzen, werden die von Ihnen angegebenen Daten zwecks
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                  wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">3. Cookies</h2>
                <p className="text-[#555] mb-4">
                  Wenn Sie einen Kommentar auf unserer Website schreiben, kann das eine Einwilligung sein, Ihren Namen,
                  E-Mail-Adresse und Website in Cookies zu speichern. Dies ist eine Komfortfunktion, damit Sie nicht,
                  wenn Sie einen weiteren Kommentar schreiben, all diese Daten erneut eingeben müssen. Diese Cookies
                  werden ein Jahr lang gespeichert.
                </p>
                <p className="text-[#555] mb-4">
                  Falls Sie ein Konto haben und Sie sich auf dieser Website anmelden, werden wir ein temporäres Cookie
                  setzen, um festzustellen, ob Ihr Browser Cookies akzeptiert. Dieses Cookie enthält keine
                  personenbezogenen Daten und wird verworfen, wenn Sie Ihren Browser schließen.
                </p>
                <p className="text-[#555]">
                  Wenn Sie sich anmelden, werden wir einige Cookies einrichten, um Ihre Anmeldeinformationen und
                  Anzeigeoptionen zu speichern. Anmelde-Cookies verfallen nach zwei Tagen und Cookies für die
                  Anzeigeoptionen nach einem Jahr. Falls Sie bei der Anmeldung „Angemeldet bleiben" auswählen, wird Ihre
                  Anmeldung zwei Wochen lang aufrechterhalten. Mit der Abmeldung aus Ihrem Konto werden die
                  Anmelde-Cookies gelöscht.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">4. Eingebettete Inhalte von anderen Websites</h2>
                <p className="text-[#555] mb-4">
                  Beiträge auf dieser Website können eingebettete Inhalte beinhalten (z.B. Videos, Bilder, Beiträge
                  etc.). Eingebettete Inhalte von anderen Websites verhalten sich exakt so, als ob der Besucher die
                  andere Website besucht hätte.
                </p>
                <p className="text-[#555]">
                  Diese Websites können Daten über Sie sammeln, Cookies benutzen, zusätzliche Tracking-Dienste von
                  Dritten einbetten und Ihre Interaktion mit diesem eingebetteten Inhalt aufzeichnen, inklusive Ihrer
                  Interaktion mit dem eingebetteten Inhalt, falls Sie ein Konto haben und auf dieser Website angemeldet
                  sind.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">5. Analysedienste</h2>
                <p className="text-[#555]">
                  Wir nutzen derzeit keine Analysedienste auf unserer Website. Sollte sich dies in Zukunft ändern,
                  werden wir diese Datenschutzerklärung entsprechend aktualisieren.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">6. Dauer der Datenspeicherung</h2>
                <p className="text-[#555] mb-4">
                  Wenn Sie einen Kommentar schreiben, wird dieser inklusive Metadaten zeitlich unbegrenzt gespeichert.
                  Auf diese Weise können wir Folgekommentare automatisch erkennen und freigeben, anstatt sie in einer
                  Moderations-Warteschlange festzuhalten.
                </p>
                <p className="text-[#555]">
                  Für Benutzer, die sich auf unserer Website registrieren, speichern wir zusätzlich die persönlichen
                  Informationen, die sie in ihren Benutzerprofilen angeben. Alle Benutzer können jederzeit ihre
                  persönlichen Informationen einsehen, verändern oder löschen (der Benutzername kann nicht verändert
                  werden). Administratoren der Website können diese Informationen ebenfalls einsehen und verändern.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">7. Ihre Rechte</h2>
                <p className="text-[#555] mb-4">
                  Wenn Sie ein Konto auf dieser Website besitzen oder Kommentare geschrieben haben, können Sie einen
                  Export Ihrer personenbezogenen Daten bei uns anfordern, inklusive aller Daten, die Sie uns mitgeteilt
                  haben. Darüber hinaus können Sie die Löschung aller personenbezogenen Daten, die wir von Ihnen
                  gespeichert haben, anfordern. Dies umfasst nicht die Daten, die wir aufgrund administrativer,
                  rechtlicher oder sicherheitsrelevanter Notwendigkeiten aufbewahren müssen.
                </p>
                <p className="text-[#555]">
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
                  Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
                  Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene
                  Daten können Sie sich jederzeit an uns wenden.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">8. Datensicherheit</h2>
                <p className="text-[#555] mb-4">
                  Wir verwenden dem aktuellen Stand der Technik entsprechende Sicherheitsmaßnahmen, um Ihre Daten gegen
                  zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder
                  gegen den unbefugten Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der
                  technologischen Entwicklung fortlaufend verbessert.
                </p>
                <p className="text-[#555]">
                  Im Falle einer Datenschutzverletzung, die voraussichtlich ein hohes Risiko für die Rechte und
                  Freiheiten natürlicher Personen zur Folge hat, benachrichtigen wir die betroffenen Personen und die
                  zuständige Aufsichtsbehörde unverzüglich.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">9. Änderungen dieser Datenschutzerklärung</h2>
                <p className="text-[#555]">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
                  Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
                  z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue
                  Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium text-[#333] mb-4">10. Kontakt</h2>
                <p className="text-[#555]">
                  Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften,
                  Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
                </p>
                <div className="mt-4">
                  <p className="text-[#555] mb-1">SISTERS DEKO Einzelhandel</p>
                  <p className="text-[#555] mb-1">Kezban Öztürk</p>
                  <p className="text-[#555] mb-1">Puchsbaumgasse 1</p>
                  <p className="text-[#555] mb-1">1100 Wien</p>
                  <p className="text-[#555] mb-1">Österreich</p>
                  <p className="text-[#555] mb-1">
                    E-Mail:{" "}
                    <a href="mailto:sisters.deko@gmx.at" className="text-[#d4af37] hover:underline">
                      sisters.deko@gmx.at
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e0d5c1]">
                <p className="text-[#777] text-sm italic">
                  Stand: {new Date().toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" })}
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
