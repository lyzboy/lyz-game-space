import Sites from "./ui/components/Sites";
import TILFeed from "./ui/components/TILFeed";
import MainAnimationWrapper from "./ui/components/MainAnimationWrapper";

export default function Home() {
  return (
    <main className="lg:pl-50 lg:pr-50 md:pl-25 md:pr-25 pr-15 pl-15">
      <MainAnimationWrapper>
        <TILFeed />
        <Sites />
      </MainAnimationWrapper>
    </main>
  );
}
