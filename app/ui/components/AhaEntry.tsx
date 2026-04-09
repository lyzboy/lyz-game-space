const AhaEntry = () => {
  return (
    <div
      className="border-2 p-2 rounded-2xl mt-1 mb-1 bg-amber-100 
    border-amber-200 flex flex-row justify-start content-center"
    >
      <div className="mr-4 p-3 flex justify-center content-center">
        <p className="text-4xl mt-auto mb-auto">!</p>
      </div>
      <div className="flex justify-center content-center flex-col">
        <p>Focus: Dev Diary Creation</p>
        <a href="#" className="text-blue-400">
          Commit: #1234 Change button...
        </a>
        <p>
          Working on creating uml diagrams for the dev diary process. Utilizing
          the self...
        </p>
      </div>
    </div>
  );
};

export default AhaEntry;
