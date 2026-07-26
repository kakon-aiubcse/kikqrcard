import { forwardRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = forwardRef((props, ref) => {
  const router = useRouter();
  const { blogref } = props;

  return (
    <div
      ref={ref}
      id="home"
      className="relative w-full overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <Image
          src="/uploads/new_hero.png"
          alt="KIK QRcard preview"
          fill
          priority
          className="object-contain object-right-bottom"
        />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32 lg:px-8">
        <div className="flex flex-col items-start gap-6 text-left">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Digital business cards, reimagined
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Network is Your{" "}
            <span className="text-primary">Net Worth.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Grow your network with our digital QR-based connecting cards — designed to
            make every introduction seamless and smart.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              onClick={() => blogref?.current?.scrollIntoView({ behavior: "smooth" })}
            >
              How it works?
            </Button>
            <Button size="lg" onClick={() => router.push("/authentication/signup")}>
              Sign up
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="hidden sm:block lg:hidden">
          <Image
            src="/uploads/new_hero.png"
            alt="KIK QRcard preview"
            width={1536}
            height={1024}
            priority
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
