import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="space-y-2 text-center">
          <div className="text-5xl font-bold">403</div>
          <div className="text-md font-semibold">Forbidden</div>
          <p className="text-sm text-muted-foreground">
            You&apos;re not supposed to be here.
          </p>
        </div>

        <Button asChild>
          <Link href="/" className="rounded-xs">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
