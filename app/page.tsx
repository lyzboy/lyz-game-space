import Sites from "./ui/components/Sites";
import AuthorCard from "./ui/components/AuthorCard";
import TILFeed from "./ui/components/TILFeed";

export default function Home() {
  return (
    <>
      <main className="lg:pl-50 lg:pr-50 md:pl-25 md:pr-25 pr-15 pl-15">
        <AuthorCard />
        <TILFeed />
        <a
          className="bg-blue-400 p-3 rounded-2xl text-white font-bold
        cursor-pointer"
          href="/focuses"
        >
          View All Focuses
        </a>
        <Sites />
      </main>
    </>
  );
}
