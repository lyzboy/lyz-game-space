import Link from "next/link";

const NavBar = () => {
  const links = ["admin", "Sites", "Dev Diary", "Learning"];
  return (
    <nav className="p-4 grid grid-cols-2">
      <a className="text-lg font-bold cursor-pointer" href="/">
        Lyz Studios
      </a>

      <ul className="uppercase flex gap-3 justify-end">
        {links.map((link) => {
          return (
            <li key={link}>
              <a href={link}>{link}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
