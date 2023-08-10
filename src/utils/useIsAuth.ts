import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";
import { MeDocument } from "../generated/output/graphql";

export const useIsAuth = () => {
    const [{ data, fetching }] = useQuery({ query: MeDocument });
    const router = useRouter();
    useEffect(()=>{
      if(!fetching && !data?.Me){
          router.replace('/login?next='+ router.pathname)
      }
    }, [data, router])
}