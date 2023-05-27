import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(/* {log: ["query"]} */); // log query logs all query's raw value

async function main() {
  // await prisma.user.deleteMany();
  // createUser();
  // UserService.findByCompositeKey();
  // findAllUser();
  // UserService.createManyUser()
  UserService.getByPagination()
}

class UserService {
  static findAllUser = async () => {
    const user = await prisma.user.findMany();
    console.log(user);
  };

  static findFirst = async () => {
    const user = await prisma.user.findFirst({
      where: {
        name: "Kyley",
      },
    });
    console.log(user);
  };

  static findByCompositeKey = async () => {
    const user = await prisma.user.findUnique({
      where: {
        age_name: {
          age: 28,
          name: "Kyley",
        },
      },
    });
    console.log(user);
  };

  static createUser = async () => {
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
      // include: {
      //   userPreference: true,
      // },
      select: {
        name: true,
        userPreference: { select: { id: true } },
      },
    });
    console.log(user);
  };

  static createManyUser = async () => {
    const users = await prisma.user.createMany({
      data: [
        {
          name: "Adi",
          email: "adi@g.com",
          age: 14,
        },
        {
          name: "Rahi",
          email: "rahi@g.com",
          age: 28,
        },
        {
          name: "Nazia",
          email: "nazia@g.com",
          age: 26,
        },
      ],
    });
    console.log(users);
  };

  static getByPagination = async() => {
    const users = await prisma.user.findMany({
      orderBy: {
        age: 'asc',
      },
      take: 2,
      skip: 1,
    });
    console.log(users);
  };
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
