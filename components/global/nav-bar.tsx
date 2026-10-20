"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logo.svg";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { DialogDescription } from "@radix-ui/react-dialog";

const textLinkClass =
  "flex min-h-11 items-center rounded-sm text-lg font-light underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const SocialIcons = () => (
  <>
    {siteConfig.socials.map((social) => (
      <a
        key={social.title}
        href={social.href}
        aria-label={social.title}
        className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative h-6 w-6 text-outer-space-950">
          <Image src={social.icon} alt="" fill />
        </div>
      </a>
    ))}
  </>
);

export const NavLinks = ({ onNavigate }: { onNavigate?: boolean }) => (
  <>
    {siteConfig.navLinks.map((link) =>
      onNavigate ? (
        <DialogClose key={link.title} asChild>
          <Link href={link.href} className={textLinkClass}>
            {link.title}
          </Link>
        </DialogClose>
      ) : (
        <Link key={link.title} href={link.href} className={textLinkClass}>
          {link.title}
        </Link>
      )
    )}
  </>
);

const NavBar = () => {
  const pathname = usePathname();
  if (pathname?.startsWith("/manifesto") || pathname?.startsWith("/live")) return null;

  return (
    <div className="container flex w-full max-w-[1017px] justify-center px-4 pt-10 md:px-8 lg:px-0 lg:pt-[4.5rem]">
      <nav className="flex w-full items-center justify-between gap-6 rounded-full bg-ship-cove-50 p-6 md:px-14">
        <Link href="/" className="inline-flex min-h-11 items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            height={24}
            className="h-6 w-auto md:h-8 lg:h-12"
            style={{ width: "auto" }}
          />
        </Link>

        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          <NavLinks />
          <div className="flex items-center gap-1">
            <SocialIcons />
          </div>
        </div>

        <Dialog>
          <DialogTrigger className="-m-2.5 p-2.5 md:hidden" aria-label="Open menu">
            <Menu />
          </DialogTrigger>
          <DialogContent className="top-4 max-h-[calc(100dvh-2rem)] w-11/12 translate-y-0 overflow-y-auto rounded-4xl bg-ship-cove-50">
            <DialogHeader className="flex">
              <DialogTitle className="-mt-2 flex justify-start">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                />
              </DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="flex flex-col gap-1">
              <NavLinks onNavigate />
              {siteConfig.socials.map((social) => (
                <a
                  key={social.title}
                  href={social.href}
                  className="flex min-h-11 items-center gap-2 py-2"
                >
                  <div className="relative h-6 w-6 text-outer-space-950">
                    <Image src={social.icon} alt="" fill />
                  </div>
                  <span className="text-lg font-light">{social.title}</span>
                </a>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </nav>
    </div>
  );
};
NavBar.displayName = "Nav";

export { NavBar };
