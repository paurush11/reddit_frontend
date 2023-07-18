import { Formik, Form } from 'formik';

import { useRouter } from 'next/router';
import React from 'react'

import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { LoginDocument } from '../generated/output/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { Box, Button } from '@chakra-ui/react';

interface loginProps {

}

const Login: React.FC<loginProps> = ({ }) => {
    const [, register] = useMutation(LoginDocument)
    const router = useRouter()
    return (
        <Wrapper variant='small'>

            <Formik

                onSubmit={async (values, { setErrors }) => {

                    const response = await register(values)
                    if (response.data.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        console.log(response.data.login.user)
                        router.push("/")
                    }
                }}

                initialValues={{
                    username: "",
                    password: ""
                }}>
                {({ isSubmitting }) => (
                    <Form >
                        <InputField
                            name='username'
                            label='Username'

                        />

                        <Box mt={4}>

                            <InputField
                                name='password'
                                label='Password'
                                type="password"

                            />
                        </Box>

                        <Button mt={4} isLoading={isSubmitting} background="teal" color="white" type='submit'>Login</Button>
                    </Form>
                )}
            </Formik>

        </Wrapper>
    );
}
export default Login