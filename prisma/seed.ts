import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.card.createMany({
    data: [
      { term: "en släk", answer: "relative" },
      { term: "en bror", answer: "brother" },
      { term: "en syster", answer: "sister" },
      { term: "en farfar", answer: "grandfather" },
    ],
  });

  console.log("Seeded database with default cards");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
