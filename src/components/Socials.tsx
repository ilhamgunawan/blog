export default function Socials() {
  return (
    <ul className="mb-3 flex">
      <li className="flex">
        <a className="mr-1 text-sm md:text-base font-semibold text-green-400" href="https://twitter.com/ilhammuhammadrg" target="_blank" title="Twitter">Twitter</a>{"|"}
      </li>
      <li className="flex">
        <a className="mx-1 text-sm md:text-base font-semibold text-green-400" href="https://linkedin.com/in/ilham-gunawan" target="_blank" title="LinkedIn">LinkedIn</a>{"|"}
      </li>
      <li className="flex">
        <a className="mx-1 text-sm md:text-base font-semibold text-green-400" href="https://github.com/ilhamgunawan" target="_blank" title="GitHub">GitHub</a>{"|"}
      </li>
      <li className="flex">
        <a className="ml-1 text-sm md:text-base font-semibold text-green-400" href="https://medium.com/@ilhammrg" target="_blank" title="Medium">Medium</a>
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