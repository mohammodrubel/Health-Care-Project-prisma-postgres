import { z } from "zod";

const createAdminValidation = z.object({
    password:z.string({required_error:"password is required"}),
    admin:z.object({
        name:z.string({required_error:"name is required"}),
        email:z.string({required_error:"email is required"}),
        contactNumber:z.string({required_error:"contactNumber is required"}),
    })
})

const doctorZodValidation = z.object({
    password:z.string({required_error:"password is required"}),
    doctor:z.object({
        name:z.string({required_error:"name is required"}),
        email:z.string({required_error:"email is required"}),
        contactNumber:z.string({required_error:"contactNumber is required"}),
        address:z.string({required_error:"address is required"}).optional(),
        registerNumber:z.string({required_error:"registerNumber is required"}),
        experience:z.number().default(0),
        gender:z.enum(['MALE','FEMALE']),
        appointmentfee:z.number({required_error:"appointmentfee is required"}),
        qualification:z.string({required_error:"qualification is required"}),
        currentWorkingPlace:z.string({required_error:"currentWorkingPlace is required"}),
        designation:z.string({required_error:"designation is required"}),
        isDeleted:z.boolean().default(false),
    })
})


const PatientZodValidation = z.object({
    password:z.string({required_error:"password is required"}),
    patient:z.object({
        name:z.string({required_error:"name is required"}),
        email:z.string({required_error:"email is required"}),
        contactNumber:z.string({required_error:"contactNumber is required"}),
        address:z.string({required_error:"address is required"}).optional(),
        gender:z.enum(['MALE','FEMALE']),
        isDeleted:z.boolean().default(false),
    })
})


export  const userValidation =  {createAdminValidation,doctorZodValidation,PatientZodValidation}