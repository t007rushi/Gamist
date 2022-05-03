import React from 'react'


export const Footer = () => {
  return (
    <footer  className="fixed bottom-0 bg-slate-800 w-full h-8 text-gray-50">
        <section className=" flex justify-center items-center gap-4 font-bold">
          <a
            href="https://twitter.com/Neo_MonkStar"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-twitter footer-icon"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/rushikeshtarapure/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin-in footer-icon"></i>
          </a>
          <a
            href="https://github.com/t007rushi/Gamist"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github footer-icon"></i>
          </a>
        </section>
      </footer>
  )
}
