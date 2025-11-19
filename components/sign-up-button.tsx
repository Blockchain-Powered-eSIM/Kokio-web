//"use client";
//import { useState } from "react";
//import { Button } from "@/components/ui/button";
//import SignUpDialog from "./sign-up-dialog";
//
//const SignUpButton = () => {
//  const [open, setOpen] = useState(false);
//  return (
//    <>
//      <Button
//        onClick={() => setOpen(!open)}
//        size="xl"
//        className="bg-cashmere-500 hover:bg-cashmere-500/90"
//      >
//        Sign Up For beta
//      </Button>
//      <SignUpDialog open={open} setOpen={setOpen} />
//    </>
//  );
//};
//
//export default SignUpButton;
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
