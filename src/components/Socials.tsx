export default function Socials() {
  return (
    <ul className="mb-3 flex">
      <li className="flex">
        <a className="mr-1 font-semibold text-green-400" href="https://twitter.com/iIhammuhammad_" target="_blank">Twitter</a>{"|"}
      </li>
      <li className="flex">
        <a className="mx-1 font-semibold text-green-400" href="https://linkedin.com/in/ilham-gunawan" target="_blank">LinkedIn</a>{"|"}
      </li>
      <li className="flex">
        <a className="ml-1 font-semibold text-green-400" href="https://github.com/ilhamgunawan" target="_blank">GitHub</a>
      </li>
      <style jsx>
        {`
          a:hover {
            opacity: 0.7;
          }
        `}
      </style>
    </ul>
  );
}