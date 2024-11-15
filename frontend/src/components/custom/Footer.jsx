import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
  return (
    <div className="pb-2 pt-10 w-full flex justify-between items-center px-5">
      <div className="min-w-full mx-auto flex justify-between items-center">
        <div className="text-left ml-2 flex flex-row gap-5">
          <h2 className="text-sm text-gray-400">ツ</h2>
        </div>
        <div className="flex space-x-4">
          <a
            href=".com"
            target="_blank"
            className="hover:text-gray-400 transition"
          >
            <HiOutlineMail size={24} color="#03C988" />
          </a>
          <a
            href=""
            target="_blank"
            className="hover:text-gray-400 transition"
          >
            <FaXTwitter size={24} color="#03C988" />
          </a>
          <a
            href=""
            target="_blank"
            className="hover:text-gray-400 transition"
          >
            <FaLinkedin size={24} color="#03C988" />
          </a>
          <a
            href=""
            target="_blank"
            className="hover:text-gray-400 transition"
          >
            <IoLogoWhatsapp size={24} color="#03C988" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;