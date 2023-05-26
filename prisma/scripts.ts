import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "Kyley",
      email: "a@g.com",
      age: 28,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    include: {
      userPreference: true,
    }
  });

  console.log(user);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
