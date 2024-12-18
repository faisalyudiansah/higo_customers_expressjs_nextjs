import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./ModeToggle"

export function Navbar() {
  return (
    <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 mx-5 text-lg font-semibold md:text-base"
        >
          <span className="text-primaryblue">HIGO</span>
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <span className="text-primaryblue">HIGO</span>
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="text-primaryblue">HIGO</span>
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
        </form>
        <ModeToggle />
      </div>
    </header>
  )
}
