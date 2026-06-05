"use client";
1;
import Image from "next/image";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { motion } from "motion/react";

const AuthorCard = () => {
  return (
    <div className="flex flex-col w-full md:flex-row my-24">
      <div
        className="mr-10 
      overflow-hidden mb-6 shrink-0 sm:w-full md:w-auto flex justify-center items-center md:block"
      >
        <Image
          src="/images/Josh_BG_Green.png"
          alt="an image of Josh"
          className="object-cover w-48 h-48 rounded-full"
          width={300}
          height={300}
        />
      </div>
      <div>
        <p className="text-4xl font-bold tracking-tight">Hi, I'm Josh</p>
        <div className="mb-4">
          <p>
            Welcome to <strong>lyz studios</strong>. I’m a Full-Stack Developer
            specializing in the PERN stack and Next.js. This dashboard serves as
            a live showcase of my deployed projects and technical
            accomplishments. To demonstrate end-to-end infrastructure
            management, every application found here is self-hosted on my local
            home server—optimized for security and performance via Cloudflare
            Tunnels and Docker containerization.
          </p>
          <br />
          <p>
            <strong>Looking for a specific service? </strong>
            Explore the{" "}
            <a className="text-primary cursor-pointer" href="#sites">
              Sites Section
            </a>{" "}
            to access my hosted applications.
          </p>
        </div>
        <div className="flex gap-2">
          <motion.a
            href="https://www.github.com/lyzboy"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black flex justify-center items-center rounded-full
            w-10 h-10"
            whileHover={{ scale: 1.2 }}
          >
            <SiGithub color="#FFFFFF" size={24} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/joshuaraysanford"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black flex justify-center items-center rounded-full
            w-10 h-10"
            whileHover={{ scale: 1.2 }}
          >
            <Image src="/InBug-White.png" alt="" width="25" height="25" />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
