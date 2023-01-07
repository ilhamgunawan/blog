import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import HomeContent from "../components/home/HomeContent";
import { listAllPosts, PostContent } from "../lib/posts";

export const getStaticProps: GetStaticProps = async () => {
  const posts = listAllPosts();
  return {
    props: {
      posts,
    },
  };
};

type Props = {
  posts: PostContent[],
}

export default function HomePage({ posts }: Props) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <HomeContent posts={posts} />
    </Layout>
  );
}
