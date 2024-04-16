import { Prisma, PrismaClient } from "@prisma/client";
import { searchableFields } from "./admin__constant";
import calculateNumber from "../../shared/pagination";
import prisma from "../../shared/prisma";

const getAllAdminService = async (
  params: { searchTerm?: string },
  options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }
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

export const adminService = {
  getAllAdminService,
};
