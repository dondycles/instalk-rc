import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full flex">
      <div className="m-auto">
        <h1 className="font-black text-4xl">Instalky.</h1>
        <p className="mb-2">Talk to everyone, instantly.</p>
        <div className="flex gap-2 ">
          <Button asChild className="flex-1 btn-text" variant={"outline"}>
            <Link href={"/login"} className="">
              Log In
            </Link>
          </Button>
          <Button className="flex-1 btn-text">
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
