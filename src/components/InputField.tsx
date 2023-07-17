import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FieldHookConfig, FieldInputProps, useField } from 'formik';
import React from 'react';

type InputFieldProps =  Partial<FieldInputProps<any>>  &{
    name: string
    label: string
    type?: React.HTMLInputTypeAttribute
}


export const InputField: React.FC<InputFieldProps> = ({label, type,...props}) => {

    const [field, { error }] = useField(props)
    return (
        <FormControl isInvalid={error ? true : false}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input
                {...field}
                {...props}
                id={field.name}
                type={type}
                
            />
                {error ? <FormErrorMessage >{error}</FormErrorMessage> : null}
            
        </FormControl>

    );
}