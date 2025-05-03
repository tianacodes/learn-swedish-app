import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: { slug: "familjen" },
    update: {},
    create: {
      name: "Familjen",
      slug: "familjen",
      cards: {
        create: [
          { term: "en släk", answer: "relative" },
          { term: "en bror", answer: "brother" },
          { term: "en syster", answer: "sister" },
          { term: "en farfar", answer: "grandfather" },
        ],
      },
    },
  });

  await prisma.category.upsert({
    where: { slug: "kroppen" },
    update: {},
    create: {
      name: "Kroppen",
      slug: "kroppen",
      cards: {
        create: [
          { term: "en panna", answer: "forehead" },
          { term: "ett ögonbryn", answer: "eyebrow" },
          { term: "en mun", answer: "mouth" },
          { term: "en hals", answer: "neck" },
          { term: "en navel", answer: "navel" },
          { term: "en handled", answer: "wrist" },
        ],
      },
    },
  });

  await prisma.category.upsert({
    where: { slug: "mistakes" },
    update: {},
    create: {
      name: "Mistakes",
      slug: "mistakes",
      cards: {
        create: [
        ],
      },
    },
  });

  console.log("Seeded database with default categories and cards");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
