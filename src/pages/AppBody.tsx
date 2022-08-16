import React from 'react'
import styled from 'styled-components'
import { Card } from '@evofinance9/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 436px;
  min-width: 380px;
  height: 100%;
  width: 100%;
  z-index: 5;
`

export const BodyWrapperExtended = styled(Card)`
  position: relative;
  max-width: 600px;
  width: 100%;
  z-index: 5;
  padding: 1rem;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}

export const AppBodyExtended = ({ children }: { children: React.ReactNode }) => {
  return <BodyWrapperExtended>{children}</BodyWrapperExtended>
}
