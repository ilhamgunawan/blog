import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { PostByYear } from "../lib/posts";

const DirectoryItem = (prop: { post: PostByYear }) => {
  const router = useRouter();
  const [isCollapse, setIsCollapse] = useState(false);
  function collapse() {
    setIsCollapse(!isCollapse);
  }

  useEffect(() => {
    const findPost = prop.post.posts.find(
      (item) => item.slug === router.query.post
    );
    if (findPost) {
      setIsCollapse(true);
    } else {
      setIsCollapse(false);
    }
  }, [prop.post.year, router]);

  return (
    <li>
      <button onClick={collapse} className='directory-item-parent'>
        {isCollapse ? "📂 " : "📁 "}
        {prop.post.year}
      </button>
      <ul
        className='child-list'
        style={{
          display: isCollapse ? "block" : "none",
        }}
      >
        {prop.post.posts.map((item, index) => {
          return (
            <li key={index}>
              <Link 
                href={`/posts/${item.slug}`}
                className={`directory-item-link ${
                  router.query.post === item.slug ? "active" : ""
                }`}
                title={item.title}
              >
                {"📝 "}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <style>
        {`
          .active {
            background-color: rgba(52, 211, 153, 0.2);
          }

          @media screen and (min-width: 1024px) {
            .directory-item-parent {
              cursor: pointer;
              color: #222;
              font-size: 0.8rem;
              font-weight: 600;
              width: 100%;
              text-align: left;
              padding: 4px 8px;
              margin-bottom: 5px;
              border-radius: 7.5px;
              transition: 0.05s;
            }

            .directory-item-parent:hover {
              background-color: #eeecec;
            }

            .child-list {
              padding-left: 10px;
            }

            .child-list li {
              margin-bottom: 5px;
            }

            .directory-item-link {
              cursor: pointer;
              color: #222;
              font-size: 14px;
              font-weight: 500;
              padding: 4px 8px;
              border-radius: 7.5px;
              transition: 0.05s;
              width: 100%;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              display: -webkit-box !important;
              -webkit-line-clamp: 1 !important;
              -webkit-box-orient: vertical !important;
            }

            .directory-item-link:hover {
              background-color: #eeecec;
            }
          }

          @media screen and (min-width: 1280px) {
            .directory-item-link,
            .directory-item-parent {
              font-size: 16px;
            }
          }
        `}
      </style>
    </li>
  );
};

export default function SideBarDesktop(prop: { postsByYear: PostByYear[] }) {
  const router = useRouter();

  if (router.pathname.startsWith("/posts")) {
    return (
      <>
        <aside className='side-bar-container'>
          <div className='side-bar-header'>
            <Link href='/' className='header-link'>
              🏠 Home
            </Link>
          </div>
          <nav className='directory-nav'>
            <ul>
              {prop.postsByYear.map((item, index) => (
                <DirectoryItem key={index} post={item} />
              ))}
            </ul>
          </nav>
        </aside>
        <style>
          {`
            .side-bar-container {
              display: none;
            }

            @media screen and (min-width: 1024px) {
              .side-bar-container {
                display: block;
                position: fixed;
                padding: 15px;
                width: 150px;
              }

              .side-bar-header {
                margin-bottom: 0.3rem;
              }

              .header-link {
                color: #222;
                font-size: 16px;
                font-weight: 600;
                display: inline-block;
                width: 100%;
                padding: 4px 8px;
                border-radius: 7.5px;
                transition: 0.05s;
              }

              .header-link:hover {
                background-color: #eeecec;
              }

              .directory-title {
                color: #444;
                font-size: 0.6rem;
                font-weight: 600;
              }
            }

            @media screen and (min-width: 1100px) {
              .side-bar-container {
                width: 220px;
              }
            }

            @media screen and (min-width: 1280px) {
              .side-bar-container {
                width: 280px;
              }
            }

            @media screen and (min-width: 1440px) {
              .side-bar-container {
                width: 320px;
              }
            }

            @media screen and (min-width: 1600px) {
              .side-bar-container {
                width: 500px;
              }
            }
          `}
        </style>
      </>
    );
  } else {
    return null;
  }
}
