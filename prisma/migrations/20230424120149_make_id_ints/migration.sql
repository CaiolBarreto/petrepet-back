/*
  Warnings:

  - The primary key for the `dogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `dogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `historic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `historic` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tutors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tutors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `tutor_id` on the `dogs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dog_id` on the `historic` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "dogs" DROP CONSTRAINT "dogs_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "historic" DROP CONSTRAINT "historic_dog_id_fkey";

-- AlterTable
ALTER TABLE "dogs" DROP CONSTRAINT "dogs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tutor_id",
ADD COLUMN     "tutor_id" INTEGER NOT NULL,
ADD CONSTRAINT "dogs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "historic" DROP CONSTRAINT "historic_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "dog_id",
ADD COLUMN     "dog_id" INTEGER NOT NULL,
ADD CONSTRAINT "historic_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tutors" DROP CONSTRAINT "tutors_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tutors_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "dogs" ADD CONSTRAINT "dogs_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historic" ADD CONSTRAINT "historic_dog_id_fkey" FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
