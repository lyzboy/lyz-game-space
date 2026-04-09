import React from "react";

const AuthorCard = () => {
  return (
    <div
      className="flex items-center justify-center content-center flex-col 
    sm:flex-row mt-10 border-2 border-blue-400 p-10 rounded-4xl shadow-xl"
    >
      <div
        className="rounded-full w-48 h-48 flex-shrink-0 mr-10 mb-10 
      overflow-hidden"
      >
        <img
          src="/images/Josh_BG_Green.png"
          alt="an image of Josh"
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <p className="text-blue-400 font-bold text-2xl mb-3">Josh Sanford</p>
        <p>
          Welcome to lyz studios. My name is Josh and this site has been created
          to as a hub for all of my projects. Feel free to look around and
          explorer. Not only are some projects that I have created here, but
          there are also some self hosted utilities available to use. If you are
          looking to learn about some technology and see how I have created and
          hosted some of these utilities, check out some of the blog posts and
          the learn free learning platform.
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
