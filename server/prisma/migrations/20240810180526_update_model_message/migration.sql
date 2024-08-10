/*
  Warnings:

  - Added the required column `updated_at` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
