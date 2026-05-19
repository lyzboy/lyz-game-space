import Image from "next/image";
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
        <div className="flex gap-2 justify-start items-center">
          <div className="flex h-10 w-10 justify-center items-center overflow-hidden">
            <Image
              alt="lyz studios logo"
              src="/lyz_logo-512x512.png"
              width={512}
              height={512}
              className="object-cover"
            />
          </div>
          <p>Lyz Studios</p>
        </div>
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
