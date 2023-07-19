import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

import React from 'react';
import { useMutation, useQuery } from 'urql';
import { LogoutDocument, MeDocument } from '../generated/output/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {

}


export const Navbar: React.FC<NavbarProps> = ({ }) => {
    const [{ data, fetching }] = useQuery({ query: MeDocument, pause: isServer() })
    const [{ fetching: logoutFetching }, logout] = useMutation(LogoutDocument)
    let body = null
    if (fetching) {
        //loading
        body = (<div>
            
        </div>)
    }
    else if (!data?.Me) {
        //user not logged in
        body = (


            <Box ml={'auto'}>
                <NextLink href={'/login'}>
                    <Link mr={2} color={'white'}>Login</Link>
                </NextLink>
                <NextLink href={'/register'}>
                    <Link color={'white'}>Register</Link>

                </NextLink>


            </Box>

        )
    } else {
        //user  logged in
        body = (
            

            <Flex>
                <Box mr={2} color={'white'}>
                    {data.Me.username}
                </Box>
                <Button variant='link' isLoading={logoutFetching}
                    onClick={() => {
                        logout({})
                    }}>Logout
                </Button>
            </Flex>
                    
        )

    }
    return (
        <Flex bg={'tan'} p={4}>


            {body}


        </Flex>);
}
