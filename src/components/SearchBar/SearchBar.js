import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react"; // Import Semantic UI React components
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <Input
        className="input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <Button primary onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
