export default function Footer() {
  return (
    <footer className="px-4 my-5">
      <span className='font-normal text-gray-500'>All rights reserved © Ilham Gunawan {new Date().getFullYear()}</span>
      <style jsx>{`
        @media (min-width: 769px) {
          footer {
            margin: 0 auto;
            width: 720px;
          }
        }
      `}</style>
    </footer>
  );
}