import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

import Logo from "@/assets/logo.svg";
import { SocialIcons, NavLinks } from "@/components/global/nav-bar";
import { siteConfig } from "@/config/site";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

/**
 * Nav row for /manifesto. Unlike the global NavBar, this has no background
 * of its own; it sits directly on the shared translucent panel
 * (manifesto-shell.tsx) alongside the page content.
 */
export function ManifestoNav() {
  return (
    <nav className="flex w-full items-center justify-between gap-6">
      <Link href="/">
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
        <DialogTrigger
          className="-m-2.5 p-2.5 md:hidden"
          aria-label="Open menu"
        >
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
  );
}
