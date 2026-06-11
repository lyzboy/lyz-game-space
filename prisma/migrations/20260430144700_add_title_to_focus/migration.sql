/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Focus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Focus` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Focus_description_key";

-- AlterTable
ALTER TABLE "Focus" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Focus_title_key" ON "Focus"("title");
