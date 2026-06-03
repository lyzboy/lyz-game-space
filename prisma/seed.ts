import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const testFocus2 = await prisma.focus.upsert({
    where: { id: 234 },
    update: {},
    create: {
      id: 234,
      title:
        "Creating a dev diary to reveal my daily progress and achievements",
      description: `The creation of a development dairy will allow me to showcase my daily progress in the projects I am working on. The goal of these dairy is to provide a log of how I decided to implement my project and to reveal moments of discovery through "aha moments". This will allow me to deeply describe my process that aren't always found within a repositories commit descriptions.`,
      repositoryUrl: "github.com/lyzboy/lyz-game-space",
      technologies: {
        create: [
          {
            name: "Next.js",
          },
          {
            name: "Prisma",
          },
          {
            name: "Tailwind CSS",
          },
        ],
      },
      entry: {
        create: [
          {
            description:
              "Begin using `react-markdown` library to be able to write entries in MD. This will allow me to better show meaning and context within my entries.",
            commitUrl: "commit/32ecb37a3139094d7c6ef099d5826e5217a8f430",
            isAha: false,
          },
          {
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur est fringilla hendrerit sit consectetur eu eu quis vitae laoreet sapien. In venenatis lacus ac malesuada nisi ex scelerisque nunc. Ornare pretium felis tellus odio libero vestibulum vestibulum nullam a nisl at et mauris phasellus.`,
            commitUrl: "commit/32ecb37a3139094d7c6ef099d5826e5217a8f430",
            isAha: false,
          },
          {
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur est fringilla hendrerit sit consectetur eu eu quis vitae laoreet sapien. In venenatis lacus ac malesuada nisi ex scelerisque nunc. Ornare pretium felis tellus odio libero vestibulum vestibulum nullam a nisl at et mauris phasellus.`,
            commitUrl: "commit/32ecb37a3139094d7c6ef099d5826e5217a8f430",
            isAha: true,
          },
          {
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur est fringilla hendrerit sit consectetur eu eu quis vitae laoreet sapien. In venenatis lacus ac malesuada nisi ex scelerisque nunc. Ornare pretium felis tellus odio libero vestibulum vestibulum nullam a nisl at et mauris phasellus.`,
            commitUrl: "commit/32ecb37a3139094d7c6ef099d5826e5217a8f430",
            isAha: true,
          },
          {
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur est fringilla hendrerit sit consectetur eu eu quis vitae laoreet sapien. In venenatis lacus ac malesuada nisi ex scelerisque nunc. Ornare pretium felis tellus odio libero vestibulum vestibulum nullam a nisl at et mauris phasellus.`,
            commitUrl: "commit/32ecb37a3139094d7c6ef099d5826e5217a8f430",
            isAha: true,
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
