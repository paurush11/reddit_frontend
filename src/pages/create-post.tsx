import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import { withUrqlClient } from "next-urql";
import router from "next/router";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { CreatePostDocument } from "../generated/output/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const [, post] = useMutation(CreatePostDocument);
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        onSubmit={async (values) => {
          const response = await post({ input: values });
          if (!response.error) router.push("/");
        }}
        initialValues={{
          title: "",
          text: "",
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" />
            <Box mt={4}>
              <InputField textarea name="text" label="Body" />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              background="teal"
              color="white"
              type="submit"
            >
              Create Posts
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
