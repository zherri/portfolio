"use client";

import { jetBrainsMonoBold } from "@/theme/style_guide";
import Button from "@/components/button";
import { FaList } from "react-icons/fa";
import { Dropdown, DropdownMenu } from "@/components/dropdown";
import { useState, useRef } from "react";
import { useClickAway } from "react-use";

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
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Dropdown ref={ref}>
        <Button
          icon={FaList}
          text="Contacts"
          onClick={() => setIsOpen(!isOpen)}
        />
        <DropdownMenu isOpen={isOpen}>Hello</DropdownMenu>
      </Dropdown>
    </div>
  );
}
