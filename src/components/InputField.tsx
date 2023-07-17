import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FieldHookConfig, FieldInputProps, useField } from 'formik';
import React from 'react';

type InputFieldProps =  Partial<FieldInputProps<any>>  &{
    name: string
    label: string
    type?: React.HTMLInputTypeAttribute
}


export const InputField: React.FC<InputFieldProps> = ({label, type,...props}) => {
    
    const [field, meta] = useField(props)
    // console.log(error)
    return (
        <FormControl isInvalid={!!meta.error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input
                {...field}
                {...props}
                id={field.name}
                type={type}
                
            />
            
            {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
            
        </FormControl>

    );
}