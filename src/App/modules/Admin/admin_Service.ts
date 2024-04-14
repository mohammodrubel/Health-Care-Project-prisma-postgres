import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminService = async (params: any) => {
  const addCondition:Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    addCondition.push({
      OR: [
        {
          name: {
            contains: params?.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: params?.email,
            mode: "insensitive",
          },
        },
      ],
    });
  }
  const whareCondition:Prisma.AdminWhereInput = { AND: addCondition };

  const result = await prisma.admin.findMany({
    where: whareCondition,
  });
  return result;
};

export const adminService = {
  getAllAdminService,
};
