import { pagination__interface } from "../../Global/pagination__interface";
import calculateNumber from "../../shared/pagination";
import { patient__interface } from "./patient__interface";
import { patientSearchableFields } from "./patient__constant";
import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";

const getAllPatientService = async (
  params: patient__interface,
  options: pagination__interface
) => {
  const { skip, limit, page, sortBy, sortOrder } = calculateNumber(options);
  const { searchTerm, ...filterData }: { [key: string]: string } = params;
  const addCondition: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    addCondition.push({
      OR: patientSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Exact match
  if (Object.keys(filterData).length > 0) {
    addCondition.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: filterData[field],
        },
      })),
    });
  }

  const whereCondition: Prisma.PatientWhereInput = { AND: addCondition };

  const result = await prisma.patient.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  const total = await prisma.patient.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSinglePatientService = async (id: string) => {
  const findSingleData = await prisma.patient.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  return findSingleData;
};
const updatePatientService = async (id: string, data: any) => {
    const {patientHealthData,medicalReport,...patientData} = data
    console.log(patientData)
    console.log(patientHealthData)
    console.log(medicalReport)
        // finding patient
        const existingPatientData = await prisma.patient.findUniqueOrThrow({
            where: {
            id: id,
            },
        });

        const result = await prisma.$transaction(async(transectionClient)=>{
            // update patient 
            
            const updatePatientData = await transectionClient.patient.update({
                where:{
                    id:id 
                },
                data:patientData,
                include: {
                    medicalReport: true,
                    patientHealthData: true,
                  },
            })

            // create or update patientHealthData
            console.log(patientData,'console patient health data')
            if(patientHealthData){
                const healthData =  await transectionClient.patientHealthData.upsert({
                    where:{
                        patientId:existingPatientData.id
                    },
                    update:patientHealthData,
                    create:{...patientHealthData,patientId:existingPatientData.id}
                })
                console.log(healthData)
            }
            
            // update or create medicalReport 
            if(medicalReport){
                const report = await transectionClient.medicalReport.create({
                    data:{...medicalReport,patientId:existingPatientData.id}
                })
            }
        })

        const updatedData = await prisma.patient.findUnique({
            where:{
                id:id 
            },
            include:{
                medicalReport: true,
                patientHealthData: true,
            }
        })

        return updatedData

};
const deletePatientService = async (id: string) => {
  await prisma.patient.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  const deleteSingleData = await prisma.patient.delete({
    where: {
      id: id,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });
  return deleteSingleData;
};

export const PatientService = {
  getAllPatientService,
  getSinglePatientService,
  updatePatientService,
  deletePatientService,
};
