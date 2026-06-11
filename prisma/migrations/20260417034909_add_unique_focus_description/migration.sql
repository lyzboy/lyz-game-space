/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Focus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Focus_description_key" ON "Focus"("description");
