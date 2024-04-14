import { Prisma, PrismaClient } from "@prisma/client";
import { searchableFields } from "./admin__constant";

const prisma = new PrismaClient();

const getAllAdminService = async (params: any,options:any) => {
    const {limit,page}=options
    const {searchTerm,...filterData} = params
    const addCondition: Prisma.AdminWhereInput[] = [];
//    console.log(params)


    // partial matched 
  if (params.searchTerm) {
    addCondition.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: params?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

//   exect match 
  if(Object.keys(filterData).length > 0){
    addCondition.push({
        AND:Object.keys(filterData).map(field => ({
            [field]:{
               equals:filterData[field]
            }
        }))
    })
  }
  const whareCondition: Prisma.AdminWhereInput = { AND: addCondition };

  const result = await prisma.admin.findMany({
    where: whareCondition,
    skip:Number((page -1) * limit),
    take:Number(limit)
  });
  return result;
};

export const adminService = {
  getAllAdminService,
};
