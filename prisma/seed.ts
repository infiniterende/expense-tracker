import { PrismaClient } from "@prisma/client";
import getData from "./data.js";

const prisma = new PrismaClient();

const { categories } = getData();
console.log(categories);

const load = async () => {
  try {
    await prisma.category.deleteMany();

    categories.map(async (category) => {
      await prisma.category.create({
        data: {
          title: category.title,
        },
      });
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
