import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CTA_LABEL } from "@/lib/site-copy";

const SignUpButton = ({ large }: { large?: boolean }) => {
  return (
    <Button asChild variant="cta" size={large ? "xl" : "cta"}>
      <Link href="/live">{CTA_LABEL}</Link>
    </Button>
  );
};

export default SignUpButton;
