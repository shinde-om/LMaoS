import Link from "next/link";
import SmMenu from "./smMenu";
import list from './data.json'

export default function Header() {
  return (
    <header className="absolute flex justify-center items-center top-0 left-0 w-dvw h-16 border-b border-neutral-800 z-10">
      <section className="flex justify-center items-center gap-5 max-w-5/6 w-full">
        <Link
          className="hover:font-normal text-3xl font-light duration-150"
          href="/"
        >
          LMaoS
        </Link>
        <div className="flex justify-center items-center text-neutral-500 gap-5 max-sm:hidden">
          {list.map((value, index) => (
            <Link key={index} href={value.link} className="hover:underline p-2">
              {value.name}
            </Link>
          ))}
        </div>
        <span className="grow" />
        <SmMenu />
      </section>
    </header>
  );
}
