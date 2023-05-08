import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <Link to={"/" } className='text-green-600 pt-10 underline'>navbar</Link>
    </div>
  )
}
