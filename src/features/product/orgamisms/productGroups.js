import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import { device } from 'lib/mediaDevice'
import {productActions} from "features/product";
import groupIcon from 'static/img/icons/group.png'

export const ProductGroups = () => {
    const [opened, setOpened] = useState(false)
    const dispatch = useDispatch()
    const { groups, isLoadingGroups } = useSelector(state => state.product)

    const isHasIcon = groups.length > 3
    const shortList = groups.slice(0, 3)

    useEffect(() => {
        dispatch(productActions.getGroups())
    }, [])

    const toggleFull = () => {
        setOpened(!opened)
    }


    if(isLoadingGroups) return (
        <GroupBox>
            <Loading>Loading...</Loading>
        </GroupBox>
    )

    return (
        <GroupBox>
            {opened &&
            <FullListWrapper>
                <Title>Категории товара:</Title>
                <FullList>
                    {groups.map((item) =>
                        <GroupItemFull key={item.id}>{item.name}</GroupItemFull>
                    )}
                </FullList>
            </FullListWrapper>
            }

            {isHasIcon &&
                <GroupItem isIconItem onClick={() => toggleFull()}>
                    <GroupIcon src={groupIcon} />
                </GroupItem>
            }
            {shortList.map((item) =>
                <GroupItem key={item.id}>{item.name}</GroupItem>
            )}
        </GroupBox>
    )
}

const GroupItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 80px;
    width: 250px;
    margin-right: 20px;
    padding: 0 20px;
    border-radius: 30px;
    font-size: 26px;
    box-shadow: var(--shadow-card);
    overflow: hidden;
     //white-space: nowrap;
    //overflow: hidden;
    //text-overflow: ellipsis;
    
    &:hover {
        background-color: #fafafa;
        cursor: pointer;
    }
    
    @media ${device.laptop} { 
        font-size: 16px;
        height: 60px;
        width: 200px;
    }
    
    ${p => p.isIconItem && css`
       width: 90px;
       border-radius: 18px;
       
       @media ${device.laptop} { 
            width: 70px;
        } 
       
    ` }
    
       
`
const GroupBox = styled.div`
    position: fixed;
    height: 110px;
    width: 100%;
    max-width: inherit;
    //width: calc(100% - 540px);
    //max-width: calc(100% - 540px);
    display: flex;
    //align-items: center;
    //justify-content: space-between;
    //padding: 0 5px;
    padding-top: 10px;
    bottom: -1px;
    background: #ffffff;
    
    ${GroupItem} {
      &:last-child {
        margin-right: 0;
      }
    }
    
    &::before {
        content: '';
        width: 100%;
        position: absolute;
        top: -50px;
        height: 50px;
      background-image:linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff 75%)
    }
    
    @media ${device.laptop} { 
        height: 90px;
        
        &::before {
            height: 40px;
            top: -40px;           
        }
    }
`

const GroupIcon = styled.img`
  margin: 0 20px;
  
    @media ${device.laptop} { 
        width: 23px
    }
`
const Loading = styled.div`
  font-size: 14px;
  padding-top: 20px;
  color: grey;
`
const FullListWrapper = styled.div`
    position: absolute;
    bottom: 110px;
    width: 600px;
    height: auto;
    max-height: 400px;
    padding: 20px 0 20px 20px;
    overflow-y: auto;
    border-radius: 30px;
    background: white;
    box-shadow: var(--shadow-card);
`
const FullList = styled.div`
    display: flex;
    flex-wrap: wrap;
    
`
const GroupItemFull = styled(GroupItem)`
  flex: 0 1 calc(33% - 30px);
  margin: 10px;
  height: 60px;
  font-size: 15px;
  border-radius: 20px;
`
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px 10px;
`




