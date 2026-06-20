"use client";
import { Menu, X } from "@repo/ui/lucide";
import { useState, useEffect } from "react";
import list from "./data.json";
import Link from "next/link";

export default function SmMenu() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "unset";
      document.body.style.overflowY = "unset";
    }
    return () => {
      document.documentElement.style.overflowY = "unset";
      document.body.style.overflowY = "unset";
    };
  }, [isActive]);

  return (
    <div>
      <div
        className="sm:hidden hover:bg-stone-900 p-2 rounded-md"
        onClick={() => setIsActive(!isActive)}
        aria-expanded={isActive}
      >
        {isActive ? <X /> : <Menu />}
      </div>
      {isActive && (
        <div className="h-dvh absolute flex flex-col gap-5 items-center top-16 left-0 w-dvw backdrop-blur-md transition-all duration-100 animate-in fade-in overflow-hidden">
          {list.map((value, index) => (
            <Link
              href={value.link}
              key={index}
              className="p-4 w-11/12 border-b first:mt-5 border-stone-700 align-middle"
            >
              {value.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
