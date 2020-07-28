import React from 'react'
import { Link } from 'react-router-dom'

function HomeButton(){
  return (
    <Link to="/items">
      <div className="home-button">
        Home
      </div>
    </Link>
  )
}

export default HomeButton
