"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logomark from "@/assets/logomark.svg";
import { Icon } from "@/components/live/icon-sprite";
import { HERO } from "@/components/live/content";

export const IOS_URL = "https://apps.apple.com/us/app/kokio/id6799362847";
export const ANDROID_URL = "https://play.google.com/store/apps/details?id=app.kokio.mobile";

function trackDownload(platform: "ios" | "android") {
  const w = window as unknown as { _paq?: unknown[][] };
  w._paq?.push(["trackEvent", "Live Page", "Download Click", platform]);
}

function HeroIconRow() {
  return (
    <div className="hero-icon-row">
      <a
        href={IOS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-icon-tile"
        aria-label="Download on the App Store"
        onClick={() => trackDownload("ios")}
      >
        <span className="hero-icon-box hero-icon-box--appstore">
          <Icon name="appstore" className="hero-icon-glyph" />
        </span>
        <span className="hero-icon-caption">App Store</span>
      </a>

      <a
        href={ANDROID_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-icon-tile"
        aria-label="Get it on the Play Store"
        onClick={() => trackDownload("android")}
      >
        <span className="hero-icon-box hero-icon-box--playstore">
          <Icon name="play" className="hero-icon-glyph" />
        </span>
        <span className="hero-icon-caption">Play Store</span>
      </a>
    </div>
  );
}

function StoreBadgeLinks() {
  return (
    <>
      <a
        href={IOS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="store-badge"
        onClick={() => trackDownload("ios")}
      >
        <Icon name="appstore" />
        <span className="lines">
          <small>Download on the</small>
          App Store
        </span>
      </a>
      <a
        href={ANDROID_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="store-badge"
        onClick={() => trackDownload("android")}
      >
        <Icon name="play" />
        <span className="lines">
          <small>Get it on the</small>
          Play Store
        </span>
      </a>
    </>
  );
}

export function LiveHero() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".live-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="live-hero">
        <div className="wrap live-hero-inner">
          <div>
            <Link href="/" className="hero-title-row" aria-label="Back to the Kokio homepage">
              <Image src={Logomark} alt="" className="hero-title-mark" aria-hidden="true" />
              <h1>{HERO.title}</h1>
            </Link>
            <p className="hero-body">{HERO.body}</p>
            <p>
              Feel free to{" "}
              <a href={HERO.contactHref} target="_blank" rel="noopener noreferrer" style={{ color: "var(--chrome-accent)", textDecoration: "underline" }}>
                {HERO.contactLinkText}
              </a>{" "}
              for anything.
            </p>
          </div>
          <HeroIconRow />
          <div className="guide-intro">
            <h2>{HERO.guideHeading}</h2>
            <p>{HERO.guideLead}</p>
          </div>
        </div>
      </header>
      <div className={`sticky-download-bar${showSticky ? " visible" : ""}`} aria-hidden={!showSticky}>
        <StoreBadgeLinks />
      </div>
    </>
  );
}
