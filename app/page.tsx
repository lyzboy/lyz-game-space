import Sites from "./ui/components/Sites";
import TILFeed from "./ui/components/TIL/TILFeed";
import MainAnimationWrapper from "./ui/components/MainAnimationWrapper";

export default function Home() {
  return (
    <main className="lg:pl-50 lg:pr-50 md:pl-25 md:pr-25 pr-5 pl-5">
      <MainAnimationWrapper>
        <TILFeed />
        <Sites />
      </MainAnimationWrapper>
    </main>
  );
}
