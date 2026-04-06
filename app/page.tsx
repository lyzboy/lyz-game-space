import NavBar from "./components/NavBar";
import Card from "./components/Card";

export default function Home() {
  return (
    <div className="p-2">
      <NavBar />
      <main className="pl-75 pr-75">
        <div>
          <h1>Lyz Studios</h1>
          <p>Welcome to lyz studios</p>
        </div>
        <div
          className="grid grid-cols-2 p-10 justify-center content-center 
      justify-items-center gap-10"
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
            image="/images/lyz_notes.png"
            description="A note taking site created with the bookstack framework"
            link="https://notes.lyzgame.space"
          />
          <Card
            title="Lyz Tv"
            image="/images/lyz_tv.png"
            description="A tv taking website"
            link="https://tv.lyzgame.space"
          />
        </div>
      </main>
    </div>
  );
}
