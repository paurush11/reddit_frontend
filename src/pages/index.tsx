import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { PostsDocument } from "../generated/output/graphql";
import { useQuery } from "urql";

const Index = () => {
  const [{ data, fetching }] = useQuery({ query: PostsDocument });

  return (
    <>
      <Navbar />

      {!data ? (
        <div>...loading</div>
      ) : (
        <div>
          {data.posts.map((post) => {
            return <div key={post._id}>{post.title}</div>;
          })}
        </div>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
