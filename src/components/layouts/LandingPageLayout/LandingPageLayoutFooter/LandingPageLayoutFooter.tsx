import Image from "next/image"
import Link from "next/link"
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constants"

const LandingPageLayoutFooter = () => {
  return (
    <div className="flex flex-col bg-slate-900 items-center justify-between px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20">
      <Image
        src={"/images/general/logo.svg"}
        alt="logo"
        className="mb-4 w-40 lg:mb-0 lg:w-60"
        width={200}
        height={100}
      />
      <div className="mb-4 flex flex-col gap-4 lg:mb-0">
        <div>
          <h4 className="text-xl text-white">
            Customer Service
          </h4>
          <p className="text-gray-600">
            <Link href="mailto:hello@cinema.com">hello@cinema.com</Link> | {" "}
            <Link href="tel:+627212331">+62 7212331</Link>
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">
            Office
          </h4>
          <p className="text-gray-600">
            Jl.Pisang Raya No.50, Jakarta Selatan, Indonesia.
          </p>
        </div>
      </div>
      <div className="mb-10 flex flex-col gap-2 lg:mb-0">
        <h2 className="text-xl text-white xl:mb-2 lg:mb-2">Menu</h2>
        {NAV_ITEMS.map((item) => (
          <Link key={`footer-nav-${item.label}`} href={item.href} className="cursor-pointer text-gray-600 hover:text-white">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-8 text-gray-600">
          {SOCIAL_ITEMS.map((item) => (
            <Link
              key={`footer-social-${item.label}`}
              href={item.href} className="text-3xl hover:text-white cursor-pointer">{item.icon}</Link>
          ))}
        </div>
        <p className="w-full text-center text-gray-600">
          Copyright © 2025. All right reserved.
        </p>
      </div>
    </div>
  )
}

export default LandingPageLayoutFooter