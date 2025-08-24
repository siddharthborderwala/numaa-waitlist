import { WaitlistForm } from "@/components/waitlist-form";
import Image from "next/image";
import logo from "@/app/assets/wordmark.svg";

export default function Home() {
  return (
    <div className="flex justify-center min-h-dvh">
      <main className="p-8 rounded-lg w-full max-w-md">
        <div>
          <Image src={logo} alt="Numaa Design" className="w-40 mt-16 mx-auto" />
          <p className="text-primary-foreground text-lg text-center mt-2">
            Paper for your thoughts
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg mt-16">
          <h1 className="text-primary text-3xl font-display text-center">
            Join the waitlist
          </h1>
          <p className="text-muted-foreground text-center mt-1">
            Get an exclusive{" "}
            <u className="decoration-wavy font-display underline-offset-4 text-secondary">
              20% off
            </u>{" "}
            when we launch!
          </p>
          <WaitlistForm className="mt-8" />
        </div>
      </main>
    </div>
  );
}
