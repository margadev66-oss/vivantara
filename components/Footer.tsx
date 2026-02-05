import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-thought text-white pt-24 pb-12 border-t border-warmth/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-8 h-8">
                 <Image 
                   src="/logo.png" 
                   alt="Vivartana Logo" 
                   fill
                   className="object-contain"
                 />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Vivartana
              </span>
            </Link>
            <p className="text-warmth/60 text-sm leading-relaxed max-w-xs">
              Transforming individuals, teams, and organisations through rigorous research and behavioural science.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-warmth mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">About the Founder</Link></li>
              <li><Link href="/engage" className="hover:text-white transition-colors">Engage with Us</Link></li>
              <li><Link href="/knowledge" className="hover:text-white transition-colors">Knowledge Assets</Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors">Ongoing Research</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-warmth mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/resources/envisions" className="hover:text-white transition-colors">enVisions</Link></li>
              <li><Link href="/resources/articles" className="hover:text-white transition-colors">Articles / Blogs</Link></li>
              <li><Link href="/resources/downloads" className="hover:text-white transition-colors">Downloads</Link></li>
              <li><Link href="/resources/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-warmth mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warmth/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-warmth/40">
          <p>&copy; {currentYear} Vivartana. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Designed with Intellect & Warmth</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
