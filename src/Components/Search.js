import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function Search({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {

  const [ search, setSearch ] = useState(globalFilter)

  const handleChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 100)

  return (
    <div className="searchbox">
      <input
        type="text"
        value={search || ''}
        onChange={
          (e) => {
            setSearch(e.target.value)
            handleChange(e.target.value)
          }
        }
        placeholder={'Search ' + preGlobalFilteredRows.length + ' categories...'}
      />
    </div>
  )
}

export default Search;