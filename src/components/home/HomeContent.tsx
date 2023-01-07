import HomeHeader from "./HomeHeader";
import HomeArticlesList from "./HomeArticlesList";
import { PostContent } from "../../lib/posts";

type Props = {
  posts: PostContent[],
}

export default function HomeContent({ posts }: Props) {
  return (
    <div className="flex flex-col justify-start items-start py-5 md:py-16 px-4">
      <HomeHeader />
      <HomeArticlesList posts={posts} /> 
    </div>
  );
}
