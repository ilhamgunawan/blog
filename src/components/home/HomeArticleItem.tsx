/** @jsxImportSource @emotion/react */

import Link from "next/link";
import Date from "../Date";
import { css } from "@emotion/react";
import { parseISO } from "date-fns";
import { PostContent } from "../../lib/posts";

type Props = {
  post: PostContent,
}

export default function HomeArticleItem({ post }: Props) {
  return (
    <li className="my-3">
      <Link 
        href={`/posts/${post.slug}`}
        css={linkStyle}
        className="font-medium text-md text-gray-700 border-b-2 border-green-300 border-opacity-0 hover:border-opacity-100 hover:text-green-400"
        title={post.title}
        data-testid="latest-post-item"
      >
        {"📝"} <Date date={parseISO(post.date)} />: {post.title}
      </Link>
    </li>
  );
}

const linkStyle = css`
  width: fit-content;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 1 !important;
  -webkit-box-orient: vertical !important;
`;

// function getArticleIcon(tags: string[]) {
//   if (tags.includes("article")) {
//     return `📝`;
//   } else if (tags.includes("document")) {
//     return `📕`;
//   } else if (tags.includes("projects")) {
//     return `👨🏻‍💻`;
//   } else if (tags.includes("works")) {
//     return `👨🏻‍💻`;
//   } else if (tags.includes("dev")) {
//     return `🛠️`;
//   } else {
//     return `📝`;
//   }
// }
