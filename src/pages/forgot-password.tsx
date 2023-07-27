import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';
import { ForgotPasswordDocument } from '../generated/output/graphql';



const forgotPassword: React.FC<{}> = ({ }) => {
    const [, forgotPassword] = useMutation(ForgotPasswordDocument)
    const [message, setMessage] = useState('')
    const router = useRouter()
    return (
        <Wrapper variant='small'>

            <Formik

                onSubmit={async (values, { setErrors }) => {
                    console.log(values)
                    const response = await forgotPassword(values)
                    if(response.data.forgotPassword){
                        setMessage('If this email exists, we will shortly send you the link to reset the password')
                    }
                    
                }}

                initialValues={{
                    userNameOrEmail: "",
                }}>
                {({ isSubmitting }) => 
                (
                    message?<Box color={'blue.800'} fontSize={36}>{message}</Box>:
                    <Form >
                        <InputField
                            name='UserNameOrEmail'
                            label='Username or Email'

                        />
                                
                        <Button mt={4} isLoading={isSubmitting} background="teal" color="white" type='submit'>Submit</Button>
                    </Form>
                )}
            </Formik>

        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(forgotPassword);
