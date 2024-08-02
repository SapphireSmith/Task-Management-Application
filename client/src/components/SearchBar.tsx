import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search Tasks"
      variant="outlined"
      onChange={handleChange}
      placeholder="Search by title..."
    />
  );
};

export default SearchBar;
