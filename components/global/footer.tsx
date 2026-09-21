import React from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";
import LogoMark from "@/assets/logomark.svg";

//import Discord from "@/assets/icons/discord.svg";
import Blog from "@/assets/icons/blog.svg";
import Twitter from "@/assets/icons/twitter.svg";
import GitHub from "@/assets/icons/github.svg";
import Docs from "@/assets/icons/docs.svg";
import { CTA_MODE, TWITTER_URL } from "@/config/site";
import { LAUNCH_NOTICE, LIVE_NOTICE } from "@/lib/site-copy";
import SignUpButton from "@/components/sign-up-button";

export const socialLinks = [
  {
    icon: Twitter,
    title: "Twitter",
    href: TWITTER_URL,
  },
  {
    icon: GitHub,
    title: "GitHub",
    href: "https://github.com/Blockchain-Powered-eSIM",
  },
  {
    icon: Docs,
    title: "Docs",
    href: "https://docs.kokio.app/",
  },
  {
    icon: Blog,
    title: "Blogs",
    href: "/blogs",
  },
];

const siteLinks = [
  { title: "Manifesto", href: "/manifesto" },
  { title: "Glossary", href: "/glossary" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms of Service", href: "/terms-of-service" },
];

const Footer = () => {
  return (
    <footer className="-mt-1 flex flex-col gap-6 bg-esim-black-950 pb-6 pt-20 text-esim-black-50">
      <div className="container flex flex-col items-center gap-10 lg:max-w-[1200px] xl:flex-row xl:justify-between">
        <Image
          src={Logo}
          alt="Kokio Logo"
          width={200}
          height={200}
          style={{ width: "auto", height: "auto" }}
        />
        <ul className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((footer) => (
            <li key={footer.title} className="flex items-center gap-2">
              <div className="relative h-10 w-10 text-white">
                <Image src={footer.icon} alt="" fill className="fill-current" />
              </div>
              {footer.href.startsWith("/") ? (
                <Link href={footer.href} className="text-lg font-light">
                  {footer.title}
                </Link>
              ) : (
                <a href={footer.href} className="text-lg font-light">
                  {footer.title}
                </a>
              )}
            </li>
          ))}
        </ul>
        <SignUpButton />
      </div>
      <div className="container flex items-center justify-center px-4 py-4 text-center lg:max-w-[1200px]">
        <p className="text-lg font-light text-esim-black-50">
          {CTA_MODE === "live" ? LIVE_NOTICE : LAUNCH_NOTICE} Follow us on{" "}
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cashmere-500 underline underline-offset-2 hover:text-cashmere-400"
          >
            X
          </a>{" "}
          for updates.
        </p>
      </div>
      <nav
        aria-label="Site"
        className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:max-w-[1200px]"
      >
        {siteLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-light text-esim-black-50 underline-offset-2 transition-colors hover:text-cashmere-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cashmere-500 focus-visible:ring-offset-2 focus-visible:ring-offset-esim-black-950"
          >
            {link.title}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-center gap-2 text-sm">
        <small>Copyright ©</small>
        <Image src={LogoMark} alt="Logo Mark for Kokio" />
        <small>Kokio 2026</small>
      </div>
    </footer>
  );
};
Footer.displayName = "Footer";

export { Footer };
