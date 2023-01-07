/** @jsxImportSource @emotion/react */

import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import SideBarDesktop from "./SideBarDesktop";
import MenuMobile from "./MenuMobile";
import { PostByYear } from "../lib/posts";
import React, { useState } from "react";
import { css } from "@emotion/react";

type Props = {
  postsByYear?: PostByYear[];
  children: React.ReactNode;
};

export default function Layout({ postsByYear, children }: Props) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const folderButton = router.pathname === "/" 
    ? null
    : <button
        onClick={() => setShowMenu(!showMenu)}
        css={mobileFolderButtonStyle}
      >
        {"📁"}
      </button>;

  return (
    <div css={layoutStyle}>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='apple-touch-icon' href='/icon.png' />
        <meta name='theme-color' content='#fff' />
      </Head>
      <main>{children}</main>
      <SideBarDesktop postsByYear={postsByYear} />
      {folderButton}
      <MenuMobile
        postsByYear={postsByYear}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <Footer />
    </div>
  );
}

const layoutStyle = css`
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 1rem 0.5rem 1rem 0.5rem;
  box-sizing: border-box;
  min-height: 100vh;

  & main {
    display: flex;
    min-height: 100%;
  }

  @media (min-width: 768px) {
    padding: 0 0 1.5rem 0;
  
    & main {
      margin: 0 auto;
      width: 720px;
    }
  }
`;

const mobileFolderButtonStyle = css`
  display: block;
  position: fixed;
  right: 10px;
  top: 10px;
  font-size: 1.2rem;
  padding: 5px;

  @media (min-width: 1024px) {
    display: none;
  }
`;
