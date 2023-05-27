import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(/* {log: ["query"]} */); // log query logs all query's raw value

async function main() {
  // await prisma.user.deleteMany();
  // createUser();
  // UserService.findByCompositeKey();
  // findAllUser();
  // UserService.createManyUser()
  // UserService.getByPagination()
  // UserService.getUsersByFilter();

  PostService.createPost()
  // const post = await  prisma.post.findMany();
  // console.log(post);
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

  static getByPagination = async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        age: "asc",
      },
      take: 2,
      skip: 1,
    });
    console.log(users);
  };

  // Filtering clauses
  static getUsersByFilter = async () => {
    // Returns email that do not match with provided email
    const email1 = {
      not: "rahi@g.com",
    };

    // matches with both email
    const email2 = {
      in: ["rahi@g.com", "nazia@g.com"],
    };

    // Provides all but the provided emails in notIn
    const email3 = {
      notIn: ["rahi@g.com", "nazia@g.com"],
    };

    // contains is similar to 'like' operator matches  %@g.com%
    const email4 = {
      contains: "@g.com",
    };

    const email5 = {
      startsWith: "ra",
    };

    const email6 = {
      endsWith: "ra",
    };

    // complex AND query
    const where1 = {
      AND: [
        // OR, NOT can also be used
        { email: { startsWith: "r" } },
        { email: { endsWith: ".com" } },
      ],
    };

    // less then spacified age
    const age = {
      lt: 26, // other options = [gt : greater than, lte : less then or equal, gte: greather than or equal]
    };
    const users = await prisma.user.findMany({
      where: where1,
    });

    console.log(users);
  };

  static relationalFiltering = async () => {
    // gets user how has email preference and with emailUpdates
    const user = await prisma.user.findMany({
      where: {
        userPreference: {
          emailUpdates: true,
        },
      },
    });

    //
    const user2 = await prisma.user.findMany({
      where: {
        writtenPosts: {
          every: {
            title: "Test",
          },
        },
      },
    });
  };
}

class PostService {
  static createPost = async() => {
    const user = await prisma.user.findFirst({
      where: {
        name: "Rahi"
      }
    })

    if(user){
      const post = await prisma.post.create({
        data: {
          authorId: user.id,
          title: 'Some title',
          averageRating: 2.5
        }
      })
      console.log(post)

    }

    

    console.log(user)
    
  }

}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
