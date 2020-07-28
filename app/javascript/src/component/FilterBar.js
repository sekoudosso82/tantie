import React from 'react'

function FilterBar(props){
  return (
    <div className="filter-bar" onClick={props.toggleCategoryActive}>
    <label>
       
      <select value={props.sortChoice} onChange={props.handleChange} name="sortChoice">
        <option value=''>Select</option>
        <option value='lowest'>lowest</option>
        <option value='highest'>highest</option>
      </select>
    </label> 
    <label>
        <input type='text' name='searchTerm'
        onChange={props.handleChange} 
        value={props.searchTerm} placeholder="🔍 Search Item"/>
    </label>     
    
    
    </div>
  )
}

export default FilterBar

