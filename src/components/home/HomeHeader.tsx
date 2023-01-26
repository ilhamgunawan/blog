/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react";
import Socials from "../Socials";

export default function HomeHeader() {
  return (
    <section className="flex flex-col justify-start items-start">
      <h1 css={typeWriterStyles} className="font-bold text-3xl mb-3 mx-0 pr-1">Hi, I'm Ilham 👋🏻</h1>
      <Socials />
      <p className="font-light text-base md:text-lg">Random thoughts and stuff.</p>
    </section>
  );
}

const keyframesTyping = keyframes`
  from { width: 0 }
  to { width: 230px }
`;

const keyframesBlinkCursor = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #2c3e50; }
`;

const typeWriterStyles = css`
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  border-right: .15em solid #2c3e50; /* The typwriter cursor */
  animation: ${keyframesTyping} 3.5s steps(40, end), ${keyframesBlinkCursor} .75s step-end infinite;
`;
