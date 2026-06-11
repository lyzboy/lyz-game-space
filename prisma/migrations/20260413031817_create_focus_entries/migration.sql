-- CreateTable
CREATE TABLE "Focus" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "repo" TEXT,

    CONSTRAINT "Focus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "commit" TEXT NOT NULL,
    "isAha" BOOLEAN NOT NULL,
    "focusId" INTEGER NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FocusToTechnology" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FocusToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FocusToTechnology_B_index" ON "_FocusToTechnology"("B");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "Focus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FocusToTechnology" ADD CONSTRAINT "_FocusToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Focus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FocusToTechnology" ADD CONSTRAINT "_FocusToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
