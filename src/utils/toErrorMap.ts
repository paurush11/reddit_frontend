import { CombinedError } from "urql";
import { FieldError } from "../generated/output/graphql"

export const toErrorMap = (errors: FieldError[]) =>{
    const errorMap: Record<string, string> = {}
    errors.forEach(({field, message})=>{
        errorMap[field] = message;
    })
    return errorMap
}

export const toErrorMapGraphql = (errors: CombinedError[]) =>{
    const errorMap: Record<string, string> = {}
    errors.forEach(({message})=>{

        errorMap["token"] = message
    })
    return errorMap

}