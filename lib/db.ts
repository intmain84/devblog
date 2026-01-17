import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient(); //это нужно для кода в блоке if для globalThis

if (process.env.NODE_ENV !== "production") globalThis.prisma = db; //это нужно чтобы при хот релоад каждый раз не создавался новый new PrismaClient
