// A TIL Feed entry

interface EntryProps {
  date: Date;
  description: string;
}

const Entry: React.FC<EntryProps> = ({ date, description }) => {
  return (
    <div className="border-2 p-2 rounded-2xl">
      <p className="font-bold">Entry Date: {date.toDateString()}</p>
      <p>{description}</p>
    </div>
  );
};

export default Entry;
