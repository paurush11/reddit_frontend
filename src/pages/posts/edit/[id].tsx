import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

import router from "next/router";

import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { UpdatePostDocument } from "../../../generated/output/graphql";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";

const editPost = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [, updatePost] = useMutation(UpdatePostDocument);
  return (
    <Layout variant="small">
      <Formik
        onSubmit={async (values) => {
          console.log(values);
          const response = await updatePost({
            text: values.text,
            title: values.title,
            updatePostId: data.post._id,
          });
          if (!response.error) router.back();
        }}
        initialValues={{
          title: data.post.title,
          text: data.post.text,
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
              Update Posts
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(editPost);
