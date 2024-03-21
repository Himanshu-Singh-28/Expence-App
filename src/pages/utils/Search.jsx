import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ setSearchelement }) => {
  return (
    <TextField
      size="small"
      label="search"
      onChange={(event) => {
        setSearchelement(event.target.value);
      }}
      sx={{
        textAlign:"center",
        backgroundColor:"white",
        borderRadius:"4px"
      }}
    />
  );
};

export default Search;
