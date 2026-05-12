import Link from "next/link";

const NavBar = () => {
  const links = [
    { name: "admin", link: "admin" },
    { name: "Sites", link: "#sites" },
    { name: "Dev Diary", link: "/focuses" },
    //{name:"Learning", link:"Learning"}
  ];
  return (
    <nav className="p-4 grid grid-cols-2">
      <a className="text-lg font-bold cursor-pointer" href="/">
        Lyz Studios
      </a>

      <ul className="uppercase flex gap-3 justify-end">
        {links.map((link) => {
          return (
            <li key={link.name}>
              <a href={link.link}>{link.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
