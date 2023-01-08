import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import matter from "gray-matter";
import { fetchPostContent, getPostsByYear, PostByYear } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PostLayout from "../../components/post/PostLayout";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: MDXRemoteSerializeResult;
  postsByYear: PostByYear[];
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPostContent = (postContents => {
  let hash = {}
  postContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPostContent());

export default function PostPage({
  title,
  dateString,
  slug,
  tags,
  author,
  description = "",
  source,
  postsByYear,
}: Props) {
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
      postsByYear={postsByYear}
    >
      <MDXRemote {...source} components={components} />
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map(it => "/posts/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await serialize(content);
  const metaDescription = content.replace('\n', '').slice(0, 150) + "...";
  const plainDescription = metaDescription.replace(/(<([^>]+)>)/gi, "");
  const postsByYear = getPostsByYear();
  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: plainDescription,
      tags: data.tags,
      author: data.author,
      source: mdxSource,
      postsByYear,
    },
  };
};
