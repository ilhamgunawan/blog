import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  tag: TagContent;
};
export default function TagButton({ tag }: Props) {
  return (
    <>
      <Link href={"/posts/tags/[[...slug]]"} as={`/posts/tags/${tag.slug}`} className="text-sm">
        {tag.name}
      </Link>
      <style jsx>{`
        a {
          display: inline-block;
          border-radius: 5px;
          font-weight: 300;
          background-color: rgba(229, 231, 235, 1);
          color: rgba(17, 24, 39, 1);
          transition: background-color 0.1s ease;
          padding: 0.25em 0.75em;
        }
        a:active,
        a:hover {
          background-color: rgba(209, 213, 219, 1);
        }
      `}</style>
    </>
  );
}
