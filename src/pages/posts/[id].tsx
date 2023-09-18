import { withUrqlClient } from 'next-urql';
import React from 'react'
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useRouter } from 'next/router';

const Post = ({}) => {
    const router = useRouter();
    console.log(router.query.id)
    
        return null;
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);