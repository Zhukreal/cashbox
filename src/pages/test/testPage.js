import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const TestPage = () => {

  // var arr = [10, 32, 65, 2];
  // for (var i = 0; i < arr.length; i++) {
  //   (function(j) {
  //     setTimeout(function() {
  //       console.log('The index of this number is: ' + j);
  //     }, 3000);
  //   })(i)
  // }

  let arr = [1,2,3]

  for(let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i])
  }



  return (
    <>
      <Test2>
        <Test></Test>
      </Test2>
    </>
  )
}


const Test = styled.div`
  height: 50px;
  display: none;
  background-color: red;
 
`

const Test2 = styled.div`
  height: 100px;
  background: blue;
  
  &:hover ${Test} {
    display: block;
  }
 
`
