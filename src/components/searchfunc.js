import React from 'react'

const SearchFunc = ({searchInput, setSearchInput}) => {

  return (
    <div className="input">
        <input 
            type="text" 
            placeholder="Enter beer name to search"
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)} 
        />
          <i className='bx bx-search'></i>
    </div>
  )
}

export default SearchFunc;