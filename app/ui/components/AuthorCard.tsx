import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { SiGithub } from "@icons-pack/react-simple-icons";

const AuthorCard = () => {
  return (
    <div className="flex flex-col w-full">
      <div
        className="rounded-full w-48 h-48 mr-10 
      overflow-hidden mb-6"
      >
        <Image
          src="/images/Josh_BG_Green.png"
          alt="an image of Josh"
          className="object-cover w-full h-full col-span-1 row-span-1 lg:col-span-3"
          width={300}
          height={300}
        />
      </div>
      <p className="font-bold text-3xl mb-4">Hi, I'm Josh</p>
      <div className="mb-4">
        <p>
          Welcome to <strong>lyz studios</strong>. I’m Josh, a Full-Stack
          Developer specializing in the PERN stack and Next.js. This dashboard
          serves as a live showcase of my deployed projects and technical
          accomplishments. To demonstrate end-to-end infrastructure management,
          every application found here is self-hosted on my local home
          server—optimized for security and performance via Cloudflare Tunnels
          and Docker containerization.
        </p>
        <br />
        <p>
          <strong>Looking for a specific service? </strong>
          Explore the{" "}
          <a className="text-blue-400 cursor-pointer">Sites Section</a> to
          access my hosted applications.
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href="https://www.github.com/lyzboy"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              size: "lg",
            }),

            "bg-black rounded-full",
          )}
        >
          <SiGithub color="#FFFFFF" size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/joshuaraysanford"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              size: "lg",
            }),

            "bg-black rounded-full",
          )}
        >
          <Image src="/InBug-White.png" alt="" width="25" height="25" />
        </a>
      </div>
    </div>
  );
};

export default AuthorCard;
