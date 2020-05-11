import React, {useState, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import styled, { css } from "styled-components"
import {device, useDetectDevice} from 'lib/mediaDevice'
import {productActions} from "features/product";
import groupIcon from 'static/img/icons/group.png'


export const ProductGroups = () => {
    const [opened, setOpened] = useState(false)
    const [shortList, setShortList] = useState([])
    const dispatch = useDispatch()
    const { groups, activeGroup, isLoadingGroups } = useSelector(state => state.product)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpened(false))
    const currentDevice = useDetectDevice()
    const isHasIcon = groups.length > 3

    useEffect(() => {
        dispatch(productActions.getGroups())
    }, [dispatch])

    useEffect(() => {
        const short = groups.slice(0, 3)
        const index = short.findIndex(item => item.id === activeGroup.id)
        if(activeGroup.id && index === -1) {
            short.unshift(activeGroup)
            const newShort = short.slice(0, 3)
            setShortList(newShort)
        } else {
            setShortList(short)
        }
    }, [groups, activeGroup])

    const toggleFull = () => {
        setOpened(!opened)
    }

    const setActive = (group) => {
        dispatch(productActions.setGroup(group))
        setOpened(false)
    }

    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop


    if(isDesktopView && isLoadingGroups) return (
        <GroupBox>
            <Loading>Загрузка...</Loading>
        </GroupBox>
    )

    if(isDesktopView) {
        return (
            <GroupBox ref={ref}>
                {opened &&
                <FullListWrapper>
                    <Title>Категории товара:</Title>
                    <FullList>
                        <GroupItemFull
                            onClick={() => setActive({})}
                            active={!activeGroup.id}
                        >
                            Все
                        </GroupItemFull>
                        {groups.map((item) =>
                            <GroupItemFull
                                key={item.id}
                                onClick={() => setActive(item)}
                                active={item.id === activeGroup.id}
                            >
                                {item.name}
                            </GroupItemFull>
                        )}
                    </FullList>
                </FullListWrapper>
                }

                {isHasIcon &&
                <GroupItem isIconItem onClick={() => toggleFull()}>
                    <GroupIcon
                        src={groupIcon}
                    />
                </GroupItem>
                }
                {shortList.map((item) =>
                    <GroupItem
                        key={item.id}
                        onClick={() => setActive(item)}
                        active={item.id === activeGroup.id}
                    >
                        {item.name}
                    </GroupItem>
                )}
            </GroupBox>
        )
    }

    if(isMobileView) {
        return (
            <GroupBoxMobile>
                <GroupItemMobile
                    onClick={() => setActive({})}
                    active={!activeGroup.id}
                >
                    Все
                </GroupItemMobile>
                {groups.map((item) =>
                    <GroupItemMobile
                        key={item.id}
                        onClick={() => setActive(item)}
                        active={item.id === activeGroup.id}
                    >
                        {item.name}
                    </GroupItemMobile>
                )}
            </GroupBoxMobile>
        )
    }

    return null


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
    
    ${p => p.active && css`
       border: 1px solid var(--blue);
       color: var(--blue);
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
    
    @media ${device.laptop} { 
       bottom: 90px;
    }
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

const GroupBoxMobile = styled.div`
    position: fixed;
    top: 110px;
    height: 50px;
    max-width: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    width: auto;
    overflow-x: auto;
    z-index: 3;
    background-color: #ffffff;
`
const GroupItemMobile = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  padding-right: 20px;
  color: var(--canvas-text);
  
   ${p => p.active && css`
       color: var(--blue);
    ` }
`



