import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import { device } from 'lib/mediaDevice'
import { useInfiniteScroll } from 'lib/customHooks/useInfinityScroll'
import {productActions} from "features/product";
import plusIcon from 'static/img/icons/plus.png'

export const ProductList = () => {
    const dispatch = useDispatch()
    const [listItems, setListItems] = useState(Array.from(Array(30).keys(), n => n + 1));
    const { products, skip, take, isLoading, hasMore } = useSelector(state => state.product)
    const [search, setSearch] = useState('')


    // const debouncedSearch = useDebounce(search, 1000);

    useEffect(() => {
        dispatch(productActions.getProducts(skip, take))
    }, [])

    const fetchMoreListItems = async () => {
        if(!hasMore) return
        setIsFetching(true);
        await dispatch(productActions.getProducts(skip, take))
        setIsFetching(false);
    }
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);


    // useEffect(() => {
    //     if(debouncedSearch) dispatch(offersActions.getOffersByFilter(debouncedSearch))
    //     },[debouncedSearch]
    // );


    console.log('isFetching', isFetching)
    console.log('isFetching', isFetching)


    if(isLoading && !products.length) return <div>Loading...</div>

    return (
        <>
        <ProductsRow>
                {/*<ul className="list-group mb-2">*/}
                {/*    {listItems.map(listItem => <li className="list-group-item">List Item {listItem}</li>)}*/}
                {/*</ul>*/}

            {products.map((item, key) =>
                <ProductCol
                    key={`${item.id}-${key}`}
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
            <LoadingMore>
                {hasMore ?
                    isFetching && 'Loading...'
                    :
                    'Больше нет товаров'
                }
            </LoadingMore>
        </ProductsRow>

        </>
    )
}


const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  width: 100%;
  padding-bottom: 110px;
  //height: calc(100vh - 220px);
  //max-height: calc(100vh - 220px);
  
  @media ${device.laptop} { 
     padding-bottom: 90px;
  }
`
const ProductCol = styled.div`
  display: flex;
  flex: 0 1 calc(25% - 3em);
  margin: 1em;
  position: relative;
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
  
    @media ${device.laptop} { 
      flex: 0 1 calc(33.333% - 3em);
    }
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
    overflow: hidden;
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

const LoadingMore = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    height: 50px;
    padding-top: 10px;
    color: #cacaca;
`




