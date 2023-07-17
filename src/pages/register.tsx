import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useMutation } from 'urql';
import { RegisterDocument } from '../generated/output/graphql';

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useMutation(RegisterDocument)
    return (
        <Wrapper variant='small'>

            <Formik
                onSubmit={async (values) => { 
                    const response =  await register(values) }}
                initialValues={{
                    username: "",
                    password: ""
                }}>
                {({ isSubmitting }) => (
                    <Form>
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
                        <Button mt={4} isLoading={isSubmitting} background="teal" color="white" type='submit'>Register</Button>
                    </Form>
                )}
            </Formik>

        </Wrapper>
    );
}

export default Register