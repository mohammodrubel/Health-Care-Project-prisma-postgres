import { z } from "zod"

const CreateSpecialitiesValidation = z.object({
    title:z.string({required_error:'title is required'})
})

export const  SpecialitiesValidation = {
    CreateSpecialitiesValidation
}