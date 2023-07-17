import { FieldError } from "../generated/output/graphql"

export const toErrorMap = (errors: FieldError[]) =>{
    const errorMap: Record<string, string> = {}
    errors.forEach(({field, message})=>{
        errorMap[field] = message;
    })
    return errorMap
}