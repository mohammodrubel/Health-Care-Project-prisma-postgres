-- CreateTable
CREATE TABLE "schedule" (
    "id" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctorschedule" (
    "doctorId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "isBooking" BOOLEAN NOT NULL,
    "appointmentId" TEXT,

    CONSTRAINT "doctorschedule_pkey" PRIMARY KEY ("doctorId","scheduleId")
);

-- AddForeignKey
ALTER TABLE "doctorschedule" ADD CONSTRAINT "doctorschedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctorschedule" ADD CONSTRAINT "doctorschedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
