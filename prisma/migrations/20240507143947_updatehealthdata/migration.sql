/*
  Warnings:

  - Made the column `bloodGroup` on table `patientHealthData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "patientHealthData" ALTER COLUMN "bloodGroup" SET NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
