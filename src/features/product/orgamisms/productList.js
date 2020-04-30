import * as React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import { device } from 'lib/mediaDevice'
import plusIcon from 'static/img/icons/plus.png'

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
                    url={item.image}
                >
                    <ProductInfo>
                        <ProductName>{item.name}</ProductName>
                        <ProductCode>Код: {item.barcode}</ProductCode>
                        <ProductPrice>{item.base_price} тнг</ProductPrice>
                        <AddIcon>
                            <PlusIcon src={plusIcon} />
                        </AddIcon>
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
  padding-bottom: 110px;
  //height: calc(100vh - 220px);
  //max-height: calc(100vh - 220px);
`
const ProductCol = styled.div`
  display: flex;
  flex: 0 1 calc(25% - 1em);
  margin-bottom: 1em;
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
    padding: 20px;
    bottom: 2%;
    width: 96%;
    left: 2%;
    border-radius: 30px;
`
const ProductName = styled.div`
    font-size: 26px;
    margin-bottom: 20px;
    white-space: nowrap;
    overflow-y: hidden;
    text-overflow: ellipsis;
`
const ProductCode = styled.div`
  font-size: 15px;
  color: #2A5393;  
`
const ProductPrice = styled.div`
  font-size: 26px;
  position: absolute;
  bottom: 30px;
`
const AddIcon = styled.div`
  width: 56px;
  height: 56px;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 28px;
  color: #ffffff;
  background-color: var(--blue);
  
  &:hover {
    cursor: pointer;
    background-color: var(--blue-hover);
  }
`
const PlusIcon = styled.img``




