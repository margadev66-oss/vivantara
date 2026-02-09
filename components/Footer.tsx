import Image from "next/image";
import Link from "next/link";

const primaryLinks = [
  { href: "/home", label: "Home" },
  { href: "/engage", label: "Engage" },
  { href: "/knowledge-assets", label: "Knowledge Assets" },
  { href: "/ongoing-research", label: "Ongoing Research" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/resources/envisions", label: "enVisions" },
  { href: "/resources/articles", label: "Articles" },
  { href: "/resources/downloads", label: "Downloads" },
  { href: "/resources/faqs", label: "FAQs" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 px-6 pb-8">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-warmth/20 deep-panel text-white shadow-[0_26px_70px_-46px_rgba(10,16,24,0.7)]">
        <div className="grid gap-12 px-6 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/home" className="inline-flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/25 bg-white/90">
                <Image src="/logo.png" alt="Vivartana logo" fill className="object-cover scale-110" />
              </div>
              <div>
                <p className="font-serif text-[1.35rem] leading-none">Vivartana Transformation Services</p>
              </div>
            </Link>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85">
              Vivartana helps organisations strengthen how they sense, interpret, coordinate, and hold together when
              tested by uncertainty, disruption, and pressure.
            </p>
            <p className="mt-5 text-sm text-white/85">
              <span className="font-medium text-white">Email:</span>{" "}
              <a className="hover:text-white transition-colors" href="mailto:aumlaan@vivartana.com">
                aumlaan@vivartana.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="eyebrow !text-white mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm text-white/85">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow !text-white mb-4">Library</h3>
            <ul className="space-y-2.5 text-sm text-white/85">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4 text-sm text-white/85">
              <a href="https://www.linkedin.com/in/aumlan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="https://www.facebook.com/aumlaan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 md:px-10">
          <div className="flex flex-col gap-2 text-xs text-white/75 md:flex-row md:items-center md:justify-between">
            <p>&copy; {year} CADEUS Consulting OPC Private Limited. All rights reserved.</p>
            <p>Diagnosing, decoding, designing, and implementing for growth under stress.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

