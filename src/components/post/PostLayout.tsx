import React from "react";
import styles from "../../../public/styles/content.module.css";
import Author from "../Author";
import Date from "../Date";
import Layout from "../Layout";
import BasicMeta from "../meta/BasicMeta";
import JsonLdMeta from "../meta/JsonLdMeta";
import OpenGraphMeta from "../meta/OpenGraphMeta";
import TwitterCardMeta from "../meta/TwitterCardMeta";
import { getAuthor } from "../../lib/authors";
import { getTag } from "../../lib/tags";
import { PostByYear } from "../../lib/posts";

type Props = {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  postsByYear: PostByYear[];
  children: React.ReactNode;
};

export default function PostLayout({
  title,
  date,
  slug,
  author,
  tags,
  description = "",
  postsByYear,
  children,
}: Props) {
  const keywords = tags.map(it => getTag(it).name);
  const authorName = getAuthor(author).name;
  return (
    <Layout postsByYear={postsByYear}>
      <BasicMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div className="w-full px-4">
        <article className="flex-auto pt-4 pb-12">
          <header>
            <h1 className="text-4xl mb-4">{title}</h1>
            <div className="metadata flex flex-col md:flex-row md:gap-3 font-normal text-gray-400">
              <div className="inline-block" title="Created At">📅 <Date date={date} /></div>
              <div className="inline-block" title="Author">
                👨🏻‍💻 <Author author={getAuthor(author)} />
              </div>
            </div>
          </header>
          <div className={styles.content}>{children}</div>
        </article>
      </div>
    </Layout>
  );
}

// {/* <style global jsx>
//   {`
//       /* Syntax highlighting */
//       .token.comment,
//       .token.prolog,
//       .token.doctype,
//       .token.cdata,
//       .token.plain-text {
//         color: #6a737d;
//       }

//       .token.atrule,
//       .token.attr-value,
//       .token.keyword,
//       .token.operator {
//         color: #d73a49;
//       }

//       .token.property,
//       .token.tag,
//       .token.boolean,
//       .token.number,
//       .token.constant,
//       .token.symbol,
//       .token.deleted {
//         color: #22863a;
//       }

//       .token.selector,
//       .token.attr-name,
//       .token.string,
//       .token.char,
//       .token.builtin,
//       .token.inserted {
//         color: #032f62;
//       }

//       .token.function,
//       .token.class-name {
//         color: #6f42c1;
//       }

//       /* language-specific */

//       /* JSX */
//       .language-jsx .token.punctuation,
//       .language-jsx .token.tag .token.punctuation,
//       .language-jsx .token.tag .token.script,
//       .language-jsx .token.plain-text {
//         color: #24292e;
//       }

//       .language-jsx .token.tag .token.attr-name {
//         color: #6f42c1;
//       }

//       .language-jsx .token.tag .token.class-name {
//         color: #005cc5;
//       }

//       .language-jsx .token.tag .token.script-punctuation,
//       .language-jsx .token.attr-value .token.punctuation:first-child {
//         color: #d73a49;
//       }

//       .language-jsx .token.attr-value {
//         color: #032f62;
//       }

//       .language-jsx span[class="comment"] {
//         color: pink;
//       }

//       /* HTML */
//       .language-html .token.tag .token.punctuation {
//         color: #24292e;
//       }

//       .language-html .token.tag .token.attr-name {
//         color: #6f42c1;
//       }

//       .language-html .token.tag .token.attr-value,
//       .language-html
//         .token.tag
//         .token.attr-value
//         .token.punctuation:not(:first-child) {
//         color: #032f62;
//       }

//       /* CSS */
//       .language-css .token.selector {
//         color: #6f42c1;
//       }

//       .language-css .token.property {
//         color: #005cc5;
//       }
//     `}
// </style> */}
