import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constants";

const LandingPageLayoutFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/general/logo.svg"
              alt="logo"
              width={120}
              height={60}
            />
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Your go-to platform for browsing movies, picking seats, and
              reserving tickets.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Menu
            </h4>
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={`footer-nav-${item.label}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li>
                <Link
                  href="mailto:hello@cinema.com"
                  className="transition-colors hover:text-white"
                >
                  hello@cinema.com
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+627212331"
                  className="transition-colors hover:text-white"
                >
                  +62 7212331
                </Link>
              </li>
              <li>Jl. Pisang Raya No.50, Jakarta Selatan</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {SOCIAL_ITEMS.map((item) => (
                <Link
                  key={`footer-social-${item.label}`}
                  href={item.href}
                  aria-label={item.label}
                  className="text-xl text-gray-400 transition-colors hover:text-white"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Cinema. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageLayoutFooter;
