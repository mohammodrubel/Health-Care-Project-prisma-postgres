import { Admin, Prisma, PrismaClient, User__Role, User__Status } from "@prisma/client";
import { searchableFields } from "./admin__constant";
import calculateNumber from "../../shared/pagination";
import prisma from "../../shared/prisma";
import { pagination__interface } from "../../Global/pagination__interface";
import { admin__interface } from "./admin__interface";


const getAllAdminService = async (
  params: admin__interface,
  options: pagination__interface
) => {
  const { skip, limit,page, sortBy, sortOrder } = calculateNumber(options);
  const { searchTerm, ...filterData }: { [key: string]: string } = params;
  const addCondition: Prisma.AdminWhereInput[] = [];

  // Partial match
  if (searchTerm) {
    addCondition.push({
      OR: searchableFields.map((field) => ({
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

  addCondition.push({
    isDeleted:false
  })

  const whereCondition: Prisma.AdminWhereInput = { AND: addCondition };

  const result = await prisma.admin.findMany({
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
  });

  const total = await prisma.admin.count({
    where:whereCondition
  })
  return {
    meta:{
        page,
        limit,
        total
    },
    data:result
  };
};

const getSingleId = async(id:string):Promise<Admin | null>=>{
    const result = await prisma.admin.findUniqueOrThrow({
        where:{
            id
        }
    })
    return result
}

const updateAdminService = async(id:string,payload:Partial<Admin>):Promise<Admin>=>{
     await prisma.admin.findUniqueOrThrow({
        where:{
            id,
            isDeleted:false
        }
    })
        
    const result = await prisma.admin.update({
        where:{
            id
        },
        data:payload
    })

    return result
}


const deleteAdminService = async (id:string):Promise<Admin | null>=>{
    await prisma.admin.findUniqueOrThrow({
        where:{
            id
        }
    })
    const result = await prisma.$transaction(async (transactionClient)=>{
        const adminDeletedData = await transactionClient.admin.delete({
            where:{
                id
            }
        })

        const userDeleteData = await transactionClient.user.delete({
            where:{
                email:adminDeletedData.email
            }
        })
        return adminDeletedData
    })
    return result
}
const softDeleteAdminService = async (id:string):Promise<Admin | null>=>{
    await prisma.admin.findUniqueOrThrow({
        where:{
            id,
            isDeleted:false
        },
    })
    const result = await prisma.$transaction(async (transactionClient)=>{
        const adminDeletedData = await transactionClient.admin.update({
            where:{
                id
            },
            data:{
                isDeleted:true
            }
        })

       await transactionClient.user.update({
            where:{
                email:adminDeletedData.email
            },
            data:{
                status:User__Status.DELETED
            }
        })
        return adminDeletedData
    })
    return result
}


export const adminService = {
  getAllAdminService,
  getSingleId,
  updateAdminService,
  deleteAdminService,
  softDeleteAdminService
};
