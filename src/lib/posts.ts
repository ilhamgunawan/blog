import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly fullPath: string;
};

export type PostByYear = {
  year: string;
  posts: PostContent[];
};

let postCache: PostContent[];

export function fetchPostContent(): PostContent[] {
  if (postCache) {
    return postCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      
      const matterData = matterResult.data as {
        date: string;
        title: string;
        status: string;
        tags: string[];
        slug: string;
        fullPath: string,
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    })
    .filter(post => post.status === 'publish');
  // Sort posts by date
  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return postCache;
}

export function countPosts(tag?: string): number {
  return fetchPostContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  ).length;
}

export function listPostContent(
  page: number,
  limit: number,
  tag?: string
): PostContent[] {
  return fetchPostContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}

export function listAllPosts(): PostContent[] {
  return fetchPostContent()
}

export function getPostsByYear() {
  const allPosts = fetchPostContent();
  const postsByYear: PostByYear[] = allPosts.reduce((prev: PostByYear[], current) => {
    if (prev.length === 0) {
      const year = new Date(current.date).getFullYear().toString();
      return [{ year, posts: [current] }];
    } else {
      const year = new Date(current.date).getFullYear().toString();
      const yearIndex = prev.findIndex(item => item.year === year);
      return yearIndex >= 0 ?
        (prev.map((item) => {
          return item.year === year ?
            {
              year: item.year,
              posts: [ ...item.posts, current ],
            }
            :
            item;
        }))
        :
        [...prev, { year, posts: [current] }];
    }
  }, []);
  return postsByYear;
}
