/*
  Warnings:

  - Added the required column `age` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bcs_index` to the `dogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `dogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dogs" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "bcs_index" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
