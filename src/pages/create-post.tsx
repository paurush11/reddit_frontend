import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Wrapper } from "../components/Wrapper";

import NextLink from "next/link";
import { InputField } from "../components/InputField";
import { useMutation, useQuery } from "urql";
import { CreatePostDocument, MeDocument } from "../generated/output/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import router, { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const [, post] = useMutation(CreatePostDocument);
    useIsAuth()
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
