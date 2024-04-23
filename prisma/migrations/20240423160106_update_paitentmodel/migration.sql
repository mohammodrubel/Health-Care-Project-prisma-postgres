/*
  Warnings:

  - You are about to drop the column `appointmentfee` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `currentWorkingPlace` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patient" DROP COLUMN "appointmentfee",
DROP COLUMN "currentWorkingPlace",
DROP COLUMN "designation",
DROP COLUMN "qualification";
