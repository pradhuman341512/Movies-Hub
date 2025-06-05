import React from 'react';

type SearchProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>gm
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
