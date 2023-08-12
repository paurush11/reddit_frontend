import { Formik, Form } from "formik";
import { NextPage } from "next";
import router, { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap, toErrorMapGraphql } from "../../utils/toErrorMap";
import login from "../login";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { ChangePasswordDocument } from "../../generated/output/graphql";
import { useMutation } from "urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import NextLink from "next/link";

const ChangePassword: NextPage = () => {
  const GQLTOKENERROR =
    '[GraphQL] select "u0".* from "user" as "u0" where "u0"."_id" = NaN limit 1 - column "nan" does not exist'; // redis already deleted the value
  const [tokenError, setTokenError] = useState("");
  const [, changePassword] = useMutation(ChangePasswordDocument);
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          newPassword: "",
          token:
            typeof router.query.token === "string" ? router.query.token : "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword(values);

          if (!response.data && response.error) {
            const errorMap = toErrorMapGraphql([response.error]);
            console.log(errorMap.token);
            if (errorMap.token.includes(GQLTOKENERROR)) {
              setTokenError("Token Expired");
            }
          }
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);

            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            console.log("user is" + response.data.changePassword.user);
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New Password"
              type="password"
            />
            {tokenError && (
              <Flex>
                <Box color={"red"}>{tokenError}</Box>

                <NextLink
                  style={{ marginLeft: "auto" }}
                  href={"/forgot-password"}
                >
                  <Link>Regenerate the Link</Link>
                </NextLink>
              </Flex>
            )}

            <Button
              mt={4}
              isLoading={isSubmitting}
              background="teal"
              color="white"
              type="submit"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
