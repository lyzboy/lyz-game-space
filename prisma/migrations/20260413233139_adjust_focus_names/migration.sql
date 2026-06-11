/*
  Warnings:

  - You are about to drop the column `commit` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `repo` on the `Focus` table. All the data in the column will be lost.
  - Added the required column `commitUrl` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "commit",
DROP COLUMN "date",
ADD COLUMN     "commitUrl" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Focus" DROP COLUMN "repo",
ADD COLUMN     "repositoryUrl" TEXT;
