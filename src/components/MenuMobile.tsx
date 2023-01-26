/** @jsxImportSource @emotion/react */

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { PostByYear } from "../lib/posts";
import { css } from "@emotion/react";

const DirectoryItem = (prop: { post: PostByYear, handleHideMenu: () => void }) => {
  const router = useRouter();
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    const collapse = Boolean(prop.post.posts.find(
      (item) => item.slug === router.query.post
    ));
    setIsCollapse(collapse);
  }, [prop.post, router]);

  return (
    <li>
      <button onClick={() => setIsCollapse(!isCollapse)} css={directoryFolderStyle}>
        {isCollapse ? "📂 " : "📁 "}
        {prop.post.year}
      </button>
      <ul css={createPostContainerStyle(isCollapse)}>
        {prop.post.posts.map((item, index) => {
          return (
            <li key={index}>
              <Link 
                href={`/posts/${item.slug}`}
                css={createPostItemStyle(router.query.post === item.slug)}
                title={item.title}
                onClick={prop.handleHideMenu}
              >
                {"📝 "}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default function MenuMobile(prop: {
  postsByYear: PostByYear[];
  showMenu: Boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const handleHideMenu = () => prop.setShowMenu(false);

  if (router.pathname.startsWith("/posts")) {
    return (
      <aside css={createMobileMenuStyle(prop.showMenu)}>
        <div>
          <button
            onClick={() => prop.setShowMenu(false)}
            css={folderButtonStyle}
          >
            {"❎"}
          </button>
          <div className="mb-1">
            <Link href='/' css={homeLinkStyle} onClick={handleHideMenu}>
              🏠 Home
            </Link>
          </div>
          <nav>
            <ul>
              {prop.postsByYear.map((item, index) => (
                <DirectoryItem key={index} post={item} handleHideMenu={handleHideMenu} />
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    );
  } else {
    return null;
  }
}

const createMobileMenuStyle = (showFolder: Boolean) =>
  css`
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 15px;
    transform: ${showFolder ? 'translateY(0)' : 'translateY(-100vh)'};
    background-color: rgba(249, 250, 251, 0.5);
    backdrop-filter: blur(10px);
    transition: 0.3s;

    @media (min-width: 1024px) {
      display: none;
    }
  `;

const folderButtonStyle = css`
  display: block;
  position: fixed;
  right: 10px;
  top: 10px;
  font-size: 1.2rem;
  padding: 5px;
`;

const homeLinkStyle = css`
  color: #222;
  font-size: 16px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 7.5px;
  transition: 0.05s;

  &:hover {
    background-color: #eeecec;
  }
`;

const directoryFolderStyle = css`
  cursor: pointer;
  color: #222;
  font-size: 16px;
  font-weight: 600;
  padding: 4px 8px;
  margin-bottom: 5px;
  border-radius: 7.5px;
  transition: 0.05s;

  &:hover {
    background-color: #eeecec;
  }
`;

const createPostContainerStyle = (isCollapsed: Boolean) => css`
  display: ${isCollapsed ? 'block' : 'none'};
  padding-left: 10px;

  & li {
    margin-bottom: 5px;
  }
`;

const createPostItemStyle = (isActive: Boolean) => css`
  cursor: pointer;
  color: #222;
  font-size: 16px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 7.5px;
  transition: 0.05s;
  width: fit-content;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 1 !important;
  -webkit-box-orient: vertical !important;
  background-color: ${isActive ? 'rgba(52, 211, 153, 0.2)' : 'transparent'};

  &:hover {
    background-color: #eeecec;
  }
`;
