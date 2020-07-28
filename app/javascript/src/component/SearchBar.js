import React from 'react'

function SearchBar(props) {

  return (
    <div className="search-bar">
      <input onChange={props.handleChange} value={props.searchTerm} placeholder="🔍 Search Item"/>
    </div>
  )
}

export default SearchBar

