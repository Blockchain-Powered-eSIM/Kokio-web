"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CTA_MODE } from "@/config/site";

const SignUpButton = () => {
  if (CTA_MODE === "live") {
    return (
      <Link href="/live">
        <Button size="xl" className="bg-cashmere-500 hover:bg-cashmere-500/90">
          Try out the App today!
        </Button>
      </Link>
    );
  }

  return (
    <Link href="https://t.me/+b44BXiy8d5k4M2Q1" target="_blank">
      <Button size="xl" className="bg-cashmere-500 hover:bg-cashmere-500/90">
        Join Telegram Group for Early Access!
      </Button>
    </Link>
  );
};

export default SignUpButton;
