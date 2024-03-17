import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <main>
      <footer className=" bg-[#212529]  bottom-0 mt-[44px] rounded-t-2xl">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-white sm:text-center dark:text-black">
            © 2024{" "}
            <a href="#" className="hover:underline">
              JS™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-black sm:mt-0">
            <li>
              <Link
                href="/common-number"
                className="hover:underline me-4 md:me-6"
              >
                Common Number
              </Link>
            </li>
            <li>
              <Link
                href="/dream-number"
                className="hover:underline me-4 md:me-6"
              >
                Dream Number
              </Link>
            </li>
            <li>
              <Link href="/previous-result" className="hover:underline">
                Previous Result
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default Footer;
