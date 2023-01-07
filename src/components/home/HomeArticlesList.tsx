import HomeArticleItem from "./HomeArticleItem";
import { PostContent } from "../../lib/posts";

type Props = {
  posts: PostContent[],
}

export default function HomeArticlesList({ posts }: Props) {
  return (
    <section className="my-5">
      <h2 className="my-4 text-xl font-bold">Latest Posts</h2>
      <ul className="list-outside mb-8">
        {posts.map((post, index) => <HomeArticleItem key={index} post={post} />)}
      </ul>
    </section>
  );
}
