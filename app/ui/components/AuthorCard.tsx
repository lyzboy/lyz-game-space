import React from "react";

const AuthorCard = () => {
  return (
    <div
      className="flex items-center justify-center content-center flex-col 
    sm:flex-row mt-10 border-2 border-blue-400 p-10 rounded-4xl shadow-xl"
    >
      <div
        className="rounded-full w-48 h-48 flex-shrink-0 mr-10 
      overflow-hidden"
      >
        <img
          src="/images/Josh_BG_Green.png"
          alt="an image of Josh"
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <p className="text-blue-400 font-bold text-2xl mb-3">Josh Sanford</p>
        <p>
          Welcome to <strong>lyz studios</strong>. I’m Josh, a Full-Stack
          Developer specializing in the PERN stack and Next.js. This dashboard
          serves as a live showcase of my deployed projects and technical
          accomplishments.
        </p>
        <br />
        <p>
          To demonstrate end-to-end infrastructure management, every application
          found here is self-hosted on my local home server—optimized for
          security and performance via Cloudflare Tunnels and Docker
          containerization.
        </p>
        <br />
        <p>
          <strong>Looking for a specific service? </strong>
          Explore the{" "}
          <a className="text-blue-400 cursor-pointer">Sites Section</a> to
          access my hosted applications.
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
