import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminService = async (params: any) => {
    const {searchTerm,...filterData} = params
    const addCondition: Prisma.AdminWhereInput[] = [];
    const searchableFields = ["name", "email"]


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
  });
  return result;
};

export const adminService = {
  getAllAdminService,
};
