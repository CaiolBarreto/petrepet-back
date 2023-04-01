/*
  Warnings:

  - You are about to drop the column `StepsAmout` on the `historic` table. All the data in the column will be lost.
  - Added the required column `steps_amount` to the `historic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "historic" DROP COLUMN "StepsAmout",
ADD COLUMN     "steps_amount" INTEGER NOT NULL;
