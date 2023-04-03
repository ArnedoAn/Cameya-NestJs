/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cedula` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni_type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "cedula",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birth_date" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "dni" TEXT NOT NULL,
ADD COLUMN     "dni_type" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "profile_picture" TEXT NOT NULL,
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("dni");

-- CreateTable
CREATE TABLE "Worker" (
    "user_dni" TEXT NOT NULL,
    "service_type" TEXT NOT NULL,
    "service_detail" TEXT NOT NULL,
    "rate_hour" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("user_dni")
);

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_user_dni_fkey" FOREIGN KEY ("user_dni") REFERENCES "User"("dni") ON DELETE CASCADE ON UPDATE CASCADE;
