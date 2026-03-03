import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="space-y-2 text-center">
          <div className="text-5xl font-bold">404</div>
          <div className="text-md font-semibold">Not found</div>
          <p className="text-sm text-muted-foreground">
            The channel or thread you&apos;re looking for either never existed,
            was archived, or has been removed.
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
