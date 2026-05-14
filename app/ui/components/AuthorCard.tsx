import Image from "next/image";

const AuthorCard = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 lg:grid-rows-3 w-full">
      <div
        className="rounded-full w-48 h-48 flex-shrink-0 mr-10 
      overflow-hidden"
      >
        <Image
          src="/images/Josh_BG_Green.png"
          alt="an image of Josh"
          className="object-cover w-full h-full col-span-1 row-span-1"
          width={300}
          height={300}
        />
      </div>
      <p>Hi, I'm Josh</p>
      <div>
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
      <div>
        <p>GitHub</p>
        <p>LinkedIn</p>
      </div>
    </div>
  );
};

export default AuthorCard;
