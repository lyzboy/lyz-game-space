import Sites from "./components/Sites";

export default function Home() {
  return (
    <>
      <main className="lg:pl-50 lg:pr-50 md:pl-25 md:pr-25">
        <div>
          <h1>Lyz Studios</h1>
          <p>Welcome to lyz studios</p>
        </div>
        <Sites />
      </main>
    </>
  );
}
