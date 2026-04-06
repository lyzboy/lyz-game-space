import NavBar from "./components/NavBar";
import Card from "./components/Card";

export default function Home() {
  return (
    <div className="p-2">
      <NavBar />
      <main
        className="grid grid-cols-2 justify-center content-center 
      justify-items-center gap-2"
      >
        <Card
          title="Rivers Karate"
          image="/images/rivers_karate.png"
          description="The website for the karate dojo, River's Karate For Christ"
          link="https://riverskarate.lyzgame.space"
        />
        <Card
          title="Square Pool"
          image="/images/square_pool.png"
          description="A football pools site for family and fiends"
          link="https://squarepool.lyzgame.space"
        />
        <Card
          title="Lyz Notes"
          image="/images/rivers_karate.png"
          description="A note taking site created with the bookstack framework"
          link="https://notes.lyzgame.space"
        />
        <Card
          title="Lyz Tv"
          image="/images/rivers_karate.png"
          description="A tv taking website"
          link="https://tv.lyzgame.space"
        />
      </main>
    </div>
  );
}
