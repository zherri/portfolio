"use client";

import { jetBrainsMonoBold } from "@/theme/style_guide";
import Button from "@/components/button";
import { FaList, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Dropdown, DropdownMenu } from "@/components/dropdown";
import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import IconTypografy from "@/components/icon_typografy";
import Link from "@/components/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => setIsOpen(false));

  const navBarItems = [
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Stacks",
      link: "#stacks",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Experience",
      link: "#experience",
    },
  ];

  const contacts = [
    {
      platform: "email",
      icon: FaEnvelope,
      link: "zherri.dev@gmail.com",
    },
    {
      platform: "linkedin",
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/lucas-monteiro-4821b63a2/",
    },
    {
      platform: "github",
      icon: FaGithub,
      link: "https://github.com/zherri",
    },
  ];

  return (
    <div className="flex py-8 bg-neutral-900/50 rounded-b-[100%] justify-center gap-28">
      <div
        className={`${jetBrainsMonoBold.className} font-sans
                    bg-linear-to-r from-red-700 via-red-800 to-red-700 inline-block text-transparent bg-clip-text text-3xl
                    text-shadow-lg text-shadow-red-700/40`}
      >
        LUCAS MONTEIRO
      </div>
      <nav className="flex justify-center items-center">
        <ul className="flex justify-between">
          {navBarItems.map((item) => (
            <li
              key={item.name.toLowerCase() + "-item"}
              className={`mx-4 hover:text-red-700 hover:font-bold underline-animation`}
            >
              <a href={"#" + item.name.toLowerCase()}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Dropdown ref={ref}>
        <Button
          icon={FaList}
          text="Contacts & Socials"
          onClick={() => setIsOpen(!isOpen)}
        />
        <DropdownMenu isOpen={isOpen}>
          {contacts.map((item) => (
            <Link
              key={item.platform + "-link"}
              href={item.link.includes("@") ? "mailto:" + item.link : item.link}
            >
              <IconTypografy
                hoverBgColor="hover:bg-neutral-700/40"
                icon={item.icon}
                iconColor="red"
                text={item.link}
              />
            </Link>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
