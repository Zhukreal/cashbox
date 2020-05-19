import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { productActions } from 'features/product'
import groupIcon from 'static/img/icons/group.png'
import { Button, StyledButton } from 'ui/atoms/button'
import useOnClickOutside from 'use-onclickoutside'
import arrowDown from 'static/img/icons/arrow-down.png'

export const ProductSorting = () => {
  const [opened, setOpened] = useState(false)
  const dispatch = useDispatch()
  const { sorting, activeSorting } = useSelector((state) => state.product)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpened(false))
  const currentDevice = useDetectDevice()

  useEffect(() => {}, [])

  const toggleFull = () => {
    setOpened(!opened)
  }

  const handleSetSorting = (sort) => {
    dispatch(productActions.setSorting(sort))
    setOpened(false)
  }

  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  if (isDesktopView) {
    return (
      <SortingBox ref={ref}>
        <Active onClick={toggleFull}>
          {activeSorting === 'popularity' && 'Популярные'}
          {activeSorting === 'name' && 'По алфавиту'}
          <Arrow src={arrowDown} reversed={opened}></Arrow>
        </Active>
        {opened && (
          <List>
            {sorting.map((item) => {
              if (item === activeSorting) return null
              return (
                <Item key={item} onClick={() => handleSetSorting(item)}>
                  {item === 'popularity' && 'Популярные'}
                  {item === 'name' && 'По алфавиту'}
                </Item>
              )
            })}
          </List>
        )}
      </SortingBox>
    )
  }

  if (isMobileView) {
    return (
      <ListMobile>
        {sorting.map((item) => {
          return (
            <ItemMobile
              key={item}
              onClick={() => handleSetSorting(item)}
              active={item === activeSorting}
            >
              {item === 'popularity' && 'Популярные'}
              {item === 'name' && 'По алфавиту'}
            </ItemMobile>
          )
        })}
      </ListMobile>
    )
  }

  return null
}

const SortingBox = styled.div`
  min-width: 130px;
  margin-right: 20px;
  position: relative;
  cursor: pointer;
`
const Active = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const List = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  top: 30px;
`
const Item = styled.div`
  font-size: 15px;

  &:hover {
    color: var(--blue);
  }
`
const Arrow = styled.img`
  margin-left: 5px;

  ${(p) =>
    p.reversed &&
    css`
      transform: rotate(180deg);
    `}
`

const SortingBoxMobile = styled.div``
const ListMobile = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ItemMobile = styled.div`
  color: rgba(14, 37, 74, 0.21);
  margin-right: 15px;
  font-size: 18px;

  ${(p) =>
    p.active &&
    css`
      color: #0e254a;
      font-weight: bold;
    `}
`
