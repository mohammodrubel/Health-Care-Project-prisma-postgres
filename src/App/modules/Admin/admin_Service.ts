import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminService = async (params: any) => {
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
  console.dir(addCondition,{depth:'infinity'})
  const whareCondition: Prisma.AdminWhereInput = { AND: addCondition };

  const result = await prisma.admin.findMany({
    where: whareCondition,
  });
  return result;
};

export const adminService = {
  getAllAdminService,
};
