import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/logo.svg";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { DialogDescription } from "@radix-ui/react-dialog";

const Links = () => {
  return siteConfig.socials.map((social) => (
    <a
      key={social.title}
      href={social.href}
      className="flex items-center gap-1"
    >
      <div className="relative h-6 w-6 text-outer-space-950">
        <Image src={social.icon} alt={social.title} fill />
      </div>
      <span className="text-lg font-light">{social.title}</span>
    </a>
  ));
};

const NavBar = () => {
  return (
    <div className="container flex w-full max-w-[1017px] justify-center px-4 pt-10 md:px-8 lg:px-0 lg:pt-[4.5rem]">
      <nav className="flex w-full items-center justify-between rounded-full bg-ship-cove-50 p-6 md:px-14">
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
        {/* Mobile Nav */}
        <Dialog>
          <DialogTrigger className="md:hidden">
            <Menu />
          </DialogTrigger>
          <DialogContent className="top-[22%] w-11/12 rounded-4xl bg-ship-cove-50">
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
            <div className="flex flex-col gap-6">
              <Links />
            </div>
          </DialogContent>
        </Dialog>
        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Links />
        </div>
      </nav>
    </div>
  );
};
NavBar.displayName = "Nav";

export { NavBar };
