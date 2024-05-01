import { Prisma, User__Status } from "@prisma/client";
import prisma from "../../shared/prisma";
import calculateNumber from "../../shared/pagination";
import { doctorSearchableFields } from "./doctor__constant";
import { doctor__interface } from "./doctor__interface";
import { pagination__interface } from "../../Global/pagination__interface";

const getAllDoctorService = async (
  params: any,
  options: pagination__interface
) => {
  const result = await prisma.doctor.findMany();
  return result;
};
const getSingleDoctorService = async (id: string) => {
  const reuslt = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return reuslt;
};
const deleteDoctorService = async (id: string) => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const DoctorDeleteData = await transactionClient.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: DoctorDeleteData.email,
      },
      data: {
        status: User__Status.DELETED,
      },
    });
    return DoctorDeleteData;
  });
  return result;
};

const updateDoctorservice = async (id: string, data: any) => {
  const { specialties, ...doctorData } = data;
  console.log(specialties, doctorData);
  const doctorInfo = await prisma.doctor.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  const result = await prisma.$transaction(async (doctorClient) => {
    await prisma.doctor.update({
      where: {
        id: id,
      },
      data: doctorData,
      include: {
        DoctorSpecialties: true,
      },
    });

    if (specialties && specialties.length > 0) {
      // delete
      const deleteSpecialitiesId = specialties.filter((item) => item.isDeleted);
      for (let speciality of deleteSpecialitiesId) {
        await prisma.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialtiesId: speciality.specialitiesId,
          },
        });
      }
      // create
      const createSpecialitiesId = specialties.filter(
        (item) => !item.isDeleted
      );
      for (let speciality of createSpecialitiesId) {
        await prisma.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialtiesId: speciality.specialitiesId,
          },
        });
      }
    }
      const result = await prisma.doctor.findUnique({
        where: {
          id: doctorInfo.id,
        },
        include: {
          DoctorSpecialties:{
            include:{
              specialties:true
            }
          },
        },
      });
      return result
  });



  return result;
};

export const DoctorService = {
  getAllDoctorService,
  getSingleDoctorService,
  deleteDoctorService,
  updateDoctorservice,
};
