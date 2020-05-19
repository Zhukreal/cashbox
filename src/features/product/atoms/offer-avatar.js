import React from 'react'
import styled from 'styled-components'

export const OfferAvatar = ({ src }) => {
  return <Avatar src={src} alt="photo" />
}

const Avatar = styled.img`
  width: 50px;
`
