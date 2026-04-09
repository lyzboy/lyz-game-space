import Entry from "../components/Entry";
import AhaEntry from "../components/AhaEntry";

const TILFeed = () => {
  return (
    <div className="mt-10 mb-10 border-blue-400 border-2 rounded-2xl p-5">
      <h2 className="text-2xl font-bold">Today I Learned Feed</h2>
      <div>
        <p className="font-bold text-xl">Current Focus: Dev Diary Creation</p>
        {/* this will be for badges */}
        <div></div>
      </div>
      <a href="#" className="text-blue-400">
        Repo: lyz-game-space
      </a>
      <p className="font-bold mt-3 text-lg">Latest Entry:</p>
      <Entry />
      <div>
        <p className="font-bold mt-3 text-lg">Recent Aha! Moments:</p>
        <AhaEntry />
        <AhaEntry />
        <AhaEntry />
      </div>
    </div>
  );
};

export default TILFeed;
