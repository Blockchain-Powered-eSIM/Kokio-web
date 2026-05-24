"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpButton = () => {
  return (
    <Link href="https://alpha.kokio.app" target="_blank">
      <Button size="xl" className="bg-cashmere-500 hover:bg-cashmere-500/90">
        Try out the Alpha now!
      </Button>
    </Link>
  );
};

export default SignUpButton;
