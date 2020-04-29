import * as React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import { device } from 'lib/mediaDevice'
import {Container, Row, Col} from 'ui'

export const ProductList = ({
        list,
        isLoading,
        showMore,
        hasMore,
        isFirstRequest
    }) => {
    if(isLoading) return <div>Loading...</div>
    return (
        <ProductsRow>
            {list.map(item =>
                <ProductCol
                    key={item.id}
                    url={item.avatarUrl}
                >
                    <ProductInfo>
                        <div>{item.name}</div>
                        <div>Код</div>
                        <div>Остаток</div>
                        <div>Остаток</div>
                        <div>Остаток</div>
                    </ProductInfo>

                </ProductCol>
            )}
            {isLoading && <div>Loading...</div>}
            {/*{(!isLoading && hasMore) && <div onClick={showMore}>Show more</div> }*/}
        </ProductsRow>
    )
}


const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`
const ProductCol = styled.div`
  display: flex;
  flex: 0 1 calc(25% - 1em);
  margin-bottom: 2em;
  position: relative;
  //width: 25%;
  //max-width: calc(25% - 1em);
  height: 420px;
  //border: 1px solid grey;
  border-radius: 30px;
  box-sizing: border-box;
  
  ${(props) =>
    props.url &&
    css`
      background: url(${props.url});
      background-size: cover;
  `}
  
  // @media ${device.mobile}, ${device.tablet} { 
  //    
  //   }
    @media ${device.laptop} { 
      flex: 0 1 calc(33.333% - 1em);
    }
    // @media ${device.desktop} { 
    //   
    // } 
  
  
  
`
const ProductInfo = styled.div`
    position: absolute;
    height: 200px;
    background-color: #ffffff;
    padding: 10px;
    
    bottom: 2%;
    width: 96%;
    left: 2%;
    border-radius: 30px;
`
