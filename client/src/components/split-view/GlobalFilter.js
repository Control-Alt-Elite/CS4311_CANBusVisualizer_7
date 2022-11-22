import React, { useState } from 'react';
import { useAsyncDebounce } from "react-table";
import "./GlobalFilter.css";
export function GlobalFilter ({ globalFilter, setGlobalFilter }) {

  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <input className="searchInput" placeholder='Search Packets...' value={value || ""} onChange={(e) => {setValue(e.target.value); onChange(e.target.value);}}/>
  )
}