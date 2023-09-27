import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { InputFieldProps } from "../interfaces/allProps";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  ...props
}) => {
  const [field, meta] = useField(props);
  // console.log(error)
  let InputOrTextArea: any = Input;
  if (props.textarea) {
    InputOrTextArea = Textarea;
  }
  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name} type={type} />

      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
