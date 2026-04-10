import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constants";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

const LandingPageLayoutFooter = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-gray-950">
      {/* Subtle glow */}
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-danger-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand — wider */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Your go-to platform for browsing movies, picking seats, and
              reserving tickets — all in one place.
            </p>
            {/* Social icons under brand on larger screens */}
            <div className="mt-2 flex gap-3">
              {SOCIAL_ITEMS.map((item) => (
                <Link
                  key={`footer-social-${item.label}`}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-sm text-gray-500 transition-colors hover:bg-danger-500/10 hover:text-danger-400"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={`footer-nav-${item.label}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/auth/login"
                  className="text-sm text-gray-500 transition-colors hover:text-white"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="text-sm text-gray-500 transition-colors hover:text-white"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li>
                <Link
                  href="mailto:hello@cinema.com"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <FaEnvelope className="shrink-0 text-xs text-gray-600" />
                  hello@cinema.com
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+627212331"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <FaPhone className="shrink-0 text-xs text-gray-600" />
                  +62 7212331
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <FaLocationDot className="mt-0.5 shrink-0 text-xs text-gray-600" />
                Jl. Pisang Raya No.50, Jakarta Selatan, Indonesia
              </li>
            </ul>
          </div>

          {/* Newsletter / tagline */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Stay Updated
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
              Get the latest movie releases and exclusive showtimes delivered to
              your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-danger-500/50 focus:outline-none focus:ring-1 focus:ring-danger-500/30"
              />
              <button className="shrink-0 rounded-lg bg-danger-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-danger-600">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Cinema. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <span className="cursor-default hover:text-gray-400">
              Privacy Policy
            </span>
            <span className="cursor-default hover:text-gray-400">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageLayoutFooter;
