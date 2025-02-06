import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const createDummyUsers = async () => {
  await client.user.create({
    data: {
      username: "annamalai",
      age: 21,
      password: "1212121",
      city: "bangalore",
      todos: {
        create: {
          description: "go to gym",
          title: "Gym",
          done: false
        }
      }
    }
  })
}