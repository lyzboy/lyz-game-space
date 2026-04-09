import Sites from "./ui/components/Sites";
import AuthorCard from "./ui/components/AuthorCard";
import TILFeed from "./ui/til_feed/TILFeed";

export default function Home() {
  return (
    <>
      <main className="lg:pl-50 lg:pr-50 md:pl-25 md:pr-25 pr-15 pl-15">
        <AuthorCard />
        <TILFeed />
        <Sites />
      </main>
    </>
  );
}
