import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const TestPage = () => {

  setTimeout(function() {
    console.log('1')
  }, 1000);
  setTimeout(function() {
    console.log('2')
  }, 1000);
  setTimeout(function() {
    console.log('3')
  }, 1000);
  setTimeout(function() {
    console.log('4')
  }, 1000);

  return (
    <>
      test
    </>
  )
}

