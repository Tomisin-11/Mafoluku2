import React from "react";
import { useContent } from "../hooks/useContent";

const FALLBACK = {
  newsletterTitle: "Newsletter",
  newsletterDesc: "Stay connected with our community. Receive updates on services, events, and devotionals.",
  newsletterCta: "Get Our Newsletter",
  latestNewsTitle: "Latest News",
  latestNewsItems: [
    { title: "Lord of our life & our salvation", date: "12 May 2025" },
    { title: "Community outreach this weekend", date: "8 May 2025" },
  ],
  usefulLinks: [
    { label: "Who we are?" },
    { label: "Support and FAQ's" },
    { label: "Payments" },
    { label: "Donations Terms" },
    { label: "Volunteer" },
  ],
  socialLinks: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Whatsapp", href: "https://wa.me" },
    { name: "Youtube", href: "#" },
    { name: "Gmail", href: "mailto:church@email.com" },
    { name: "Instagram", href: "https://instagram.com" },
  ],
  copyrightName: "Grace Church",
  designerName: "T-Codes",
};

export default function Footer() {
  const { data } = useContent("footer", FALLBACK);
  const d = { ...FALLBACK, ...data };

  return (
    <footer className="lg:mt-110 mt-140 relative w-full bg-black text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }} />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="flex justify-center mb-14">
          <img src="/Logo.png" alt="Grace Church" className="h-14" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 mb-20 overflow-hidden">
          {(d.socialLinks || []).map((item) => (
            <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
              className="bg-white/20 text-center py-4 border border-white/10 text-sm no-underline hover:bg-white/30 transition">
              {item.name}
            </a>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-2">{d.newsletterTitle}</h3>
            <div className="w-10 h-0.5 bg-yellow-500 mb-6" />
            <p className="text-gray-300 text-sm mb-6">{d.newsletterDesc}</p>
            <p className="text-yellow-500 mb-4">{d.newsletterCta}</p>
            <div className="relative">
              <input type="email" placeholder="Email" className="w-full bg-transparent border border-white/30 px-4 py-3 text-sm outline-none" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">✉</span>
            </div>
          </div>
          {/* Latest News */}
          <div>
            <h3 className="text-xl font-semibold mb-2">{d.latestNewsTitle}</h3>
            <div className="w-10 h-0.5 bg-yellow-500 mb-6" />
            <div className="space-y-6">
              {(d.latestNewsItems || []).map((item, i) => (
                <div key={i} className="flex gap-4">
                  <img src="/Bible1.jpg" alt="news" className="w-16 h-16 object-cover" />
                  <div className="text-sm">
                    <p className="mb-1">{item.title}</p>
                    <p className="text-yellow-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Useful Links</h3>
            <div className="w-10 h-0.5 bg-yellow-500 mb-6" />
            <ul className="space-y-4 text-gray-300 text-sm">
              {(d.usefulLinks || []).map((link, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-yellow-500">➜</span>
                  {link.label}
                </li>
              ))}
            </ul>
          </div>
          {/* Instagram */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Instagram</h3>
            <div className="w-10 h-0.5 bg-yellow-500 mb-6" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <img key={i} src="/Gallery/Gallery1.jpg" alt="insta" className="w-full h-20 object-cover" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {d.copyrightName}. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Designed by <span className="text-yellow-500 font-medium">{d.designerName}</span></p>
        </div>
      </div>
    </footer>
  );
}
