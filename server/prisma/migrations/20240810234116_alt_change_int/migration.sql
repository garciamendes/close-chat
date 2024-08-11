/*
  Warnings:

  - You are about to alter the column `reaction_count` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "reaction_count" SET DATA TYPE INTEGER;
