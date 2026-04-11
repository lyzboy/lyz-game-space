import Link from "next/link";

const NavBar = () => {
  const links = ["Sites", "Dev Diary", "Learning"];
  return (
    <nav className="p-4 grid grid-cols-2">
      <p className="text-lg font-bold">Lyz Studios</p>

      <ul className="uppercase flex gap-3 justify-end">
        {links.map((link) => {
          return (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
