import { pagination__interface } from "../../Global/pagination__interface";
import calculateNumber from "../../shared/pagination";
import { patient__interface } from "./patient__interface";
import { patientSearchableFields, PatientUpdateType } from "./patient__constant";
import { Patient, Prisma, User__Status } from "@prisma/client";
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
      isDeleted:false
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  return findSingleData;
};
const updatePatientService = async (id: string, data: any):Promise<Patient | null > => {
    const {patientHealthData,medicalReport,...patientData} = data
        // finding patient
        const existingPatientData = await prisma.patient.findUniqueOrThrow({
            where: {
            id: id,
            },
        });

        await prisma.$transaction(async(transectionClient)=>{
            // update patient 
            
            await transectionClient.patient.update({
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
            
            if(patientHealthData){
                await transectionClient.patientHealthData.upsert({
                    where:{
                        patientId:existingPatientData.id
                    },
                    update:patientHealthData,
                    create:{...patientHealthData,patientId:existingPatientData.id}
                })
                
            }
            
            // create medicalReport 
            if(medicalReport){
                await transectionClient.medicalReport.create({
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
    const result = await prisma.$transaction(async (transectionClient)=>{
      // delete medical report 
      await transectionClient.medicalReport.deleteMany({
        where:{
          patientId:id
        }
      })
      //delete patientHealthData 
      await transectionClient.patientHealthData.delete({
        where:{
          patientId:id
        }
      })
      // delete patient Data 
      const patientInfo =  await transectionClient.patient.delete({
        where:{
          id:id
        }
      })

      // delete user 
      await transectionClient.user.delete({
        where:{
          email:patientInfo.email
        }
      })
      return patientInfo
    })

    return result
};
const softDeletePatientService = async (id: string):Promise<Patient | undefined >  => {
  const result = await prisma.$transaction(async (transectionClient)=>{
    const deletePatientData = await transectionClient.patient.update({
      where:{
        id 
      },
      data:{
        isDeleted:true
      }
    })

    await transectionClient.user.update({
      where:{
        email:deletePatientData.email
      },
      data:{
        status:User__Status.DELETED
      }
    })
    
    return deletePatientData
  })
  return result
}


export const PatientService = {
  getAllPatientService,
  getSinglePatientService,
  updatePatientService,
  deletePatientService,
  softDeletePatientService
};
