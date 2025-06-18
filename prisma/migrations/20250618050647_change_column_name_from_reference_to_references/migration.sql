/*
  Warnings:

  - You are about to drop the column `reference` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "reference",
ADD COLUMN "references" TEXT[];
