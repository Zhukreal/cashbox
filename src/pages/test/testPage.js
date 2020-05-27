import React, { useState, useEffect } from 'react'

export const TestPage = () => {
  const handleChildClick = (data) => {
    console.log('This is data from Child', data)
  }
  return (
    <>
      <Child onChildClick={handleChildClick} />
    </>
  )
}

const Child = ({ onChildClick }) => {
  const handleClick = () => {
    onChildClick('data from Child')
  }
  return <button onClick={handleClick}>I'm Child</button>
}
