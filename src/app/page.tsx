import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Join the waitlist
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign up to be notified when we launch.
          </p>
          <WaitlistForm />
        </div>
      </main>
    </div>
  );
}
