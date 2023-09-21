import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { RegisterDocument } from "../generated/output/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(RegisterDocument);
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            options: values,
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            console.log(response.data.register.user);
            router.push("/");
          }
        }}
        initialValues={{
          username: "",
          password: "",
          email: "",
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />

            <Box mt={4}>
              <InputField name="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>

            <Button
              mt={4}
              isLoading={isSubmitting}
              background="teal"
              color="white"
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
