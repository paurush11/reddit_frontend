
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';
import { Box, Button } from '@chakra-ui/react';
import { ChangePasswordDocument } from '../../generated/output/graphql';
import { useMutation } from 'urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const [, changePassword] = useMutation(ChangePasswordDocument)
    const router = useRouter()
    return (
        <Wrapper variant='small'>

            <Formik
            initialValues={{
                newPassword:'',
                token: token
            }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values)
                    const response = await changePassword(values)

                    if (response.data.changePassword.errors) {
                        setErrors(toErrorMap(response.data.changePassword.errors))
                    } else if (response.data?.changePassword.user) {
                        console.log(response.data.changePassword.user)
                        router.push("/")
                    }
                }}

                >
                {({ isSubmitting }) => (
                    <Form >
                        <InputField
                            name='newPassword'
                            label='New Password'
                            type='password'

                        />

                        <Button mt={4} isLoading={isSubmitting} background="teal" color="white" type='submit'>Change Password</Button>
                    </Form>
                )}
            </Formik>

        </Wrapper>);
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);