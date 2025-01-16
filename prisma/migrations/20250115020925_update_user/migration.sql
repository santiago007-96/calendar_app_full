/*
  Warnings:

  - Added the required column `color` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;
