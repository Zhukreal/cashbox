import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { device } from 'lib/mediaDevice'

export const Skeleton = ({typeViewProduct}) => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8]

  if(typeViewProduct === 'list'){
    return (
      <>
        <SkeletonRow2>
          {cards.map((item) => (
            <SkeletonCol2 key={item}></SkeletonCol2>
          ))}
        </SkeletonRow2>
      </>
    )
  }

  return (
    <>
      <SkeletonRow>
        {cards.map((item) => (
          <SkeletonCol key={item}></SkeletonCol>
        ))}
      </SkeletonRow>
    </>
  )
}

const SkeletonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 110px;

  @media ${device.mobileTablet} {
    padding: 0 10%;
  }

  @media ${device.laptop} {
    padding-bottom: 90px;
  }
`
const Gradient = keyframes`
  //0% {
  //    background-position: 0% 50%
  //}
  //50% {
  //    background-position: 100% 50%
  //}
  //100% {
  //    background-position: 0% 50%
  //}
  
   0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`

const SkeletonCol = styled.div`
  display: flex;
  flex: 0 1 calc(25% - 3em);
  margin: 1em;
  position: relative;
  height: 420px;
  //border: 1px solid grey;
  border-radius: 30px;
  box-sizing: border-box;
  //background: #E7E9ED;
  
    @media ${device.mobileTablet} { 
      flex: 0 1 100%;
      height: 320px;
    }
    
    @media ${device.laptop} { 
      flex: 0 1 calc(33.333% - 3em);
      height: 380px;
    }
    
  // background: linear-gradient(90deg, #f3f3f3, #e2e2e2, #E7E9ED);
  // background-size: 400% 400%;
  // animation: ${Gradient} 2s ease infinite ;
  
  
   animation : ${Gradient} 2s infinite;
   background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
   background-size: 1000px 100%;
`
const SkeletonRow2 = styled.div`
  width: calc(100% - 50px);
  padding-bottom: 110px;

  @media ${device.laptop} {
    padding-bottom: 80px;
  }

  @media ${device.mobileTablet} {
    width: 100%;
    padding: 0;
  }
`
const SkeletonCol2 = styled.div`
height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 3%;
  border-radius: 30px;
  box-shadow: var(--shadow-card);
  
  animation : ${Gradient} 2s infinite;
  background: linear-gradient(to right, #f8fafc 4%, #f4f4f4 25%, #f6f8fa 36%);
  
  @media ${device.laptop} {
    height: 60px;
    border-radius: 25px;
  }
  @media ${device.mobileTablet} {
    height: 60px;
    border-radius: 25px;
  }
`
