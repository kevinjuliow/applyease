import { PlaceholdersAndVanishInput } from "../ui/PlaceholdersAndVanishInput";

const SearchBar = () => {
  const placeholders = [
    "Software Engineer",
    "Microsoft Corporation",
    "Quality Assurance",
    "Backend Developer",
    "Designer",
  ];

  return (
    <div className="h-20 w-full rounded-lg  flex items-center">
      <PlaceholdersAndVanishInput placeholders={placeholders} />
    </div>
  );
};

export default SearchBar;
