import { PlaceholdersAndVanishInput } from "../ui/PlaceholdersAndVanishInput";
import PropTypes from "prop-types";

const SearchBar = ({ query, setQuery }) => {
  const placeholders = [
    "Software Engineer",
    "Microsoft Corporation",
    "Quality Assurance",
    "Backend Developer",
    "Designer",
  ];

  return (
    <div className="h-20 w-full rounded-lg flex items-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired, 
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
