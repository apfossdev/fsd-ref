import { PrismaClient } from "@prisma/client/extension";

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }
//the below line is just for ts issues can write ts ignore just above const prisma here
// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

//@ts-ignore
// const prisma = globalThis.prisma ?? prismaClientSingleton();
const prisma = globalThis.prisma ?? new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma;
