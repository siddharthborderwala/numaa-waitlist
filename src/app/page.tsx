import { WaitlistForm } from "@/components/waitlist-form";
import Image from "next/image";
import logo from "@/app/assets/wordmark.svg";

export default function Home() {
  return (
    <div className="flex justify-center min-h-dvh">
      <main className="p-6 md:p-8 rounded-lg w-full max-w-md">
        <div>
          <Image src={logo} alt="Numaa Design" className="w-40 mt-16 mx-auto" />
          <p className="text-primary-foreground text-lg text-center mt-2">
            Paper for your thoughts
          </p>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-lg mt-16">
          <WaitlistForm />
        </div>
      </main>
    </div>
  );
}
