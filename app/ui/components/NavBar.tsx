"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setSignInPopup(false);
    }
  }, [session]);
  const [signInPopup, setSignInPopup] = useState(false);
  const links = [
    { name: "Sites", link: "#sites" },
    { name: "Dev Diary", link: "/focuses" },
    //{name:"Learning", link:"Learning"}
  ];
  if (session?.user?.role == "ADMIN") {
    links.push({ name: "admin", link: "admin" });
  }
  return (
    <>
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
          {session ? (
            <button
              type="submit"
              className="font-bold"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          ) : (
            <button
              className="font-bold"
              onClick={() => {
                setSignInPopup(true);
              }}
            >
              Sign In
            </button>
          )}
        </ul>
      </nav>
      {signInPopup && (
        <div className="w-full h-full fixed flex justify-center items-center bg-transparent z-1 backdrop-blur-lg">
          <Card className="w-full mx-20 p-8 max-w-2xl">
            <CardHeader>
              <CardTitle>Sign In:</CardTitle>
              <CardDescription>
                Use one of the providers below to sign into your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center flex-col">
              <button
                type="submit"
                className="bg-primary text-white font-bold p-2 rounded-lg"
                onClick={() => signIn("github", { redirectTo: "/" })}
              >
                GITHUB
              </button>

              <button
                type="submit"
                className="bg-primary text-white font-bold p-2 rounded-lg"
                onClick={() => signIn("google", { redirectTo: "/" })}
              >
                GOOGLE
              </button>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setSignInPopup(false);
                }}
              >
                Cancel Sign In
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default NavBar;
