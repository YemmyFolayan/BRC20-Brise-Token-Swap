import styled from 'styled-components'

export const ChartContainerDiv = styled.div`
  border-radius: 20px;
`

export const HeadingContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 1rem;
`
export const TokenLogoContainer = styled.div`
  display: flex;
  gap: 5px;
`

export const StyledHeading = styled.h1`
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 200;
`

export const TokenLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #000;
`

export const PriceHeadingContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const PriceHeading = styled.h1`
  text-transform: uppercase;
  font-size: 1.5rem;
`

export const PriceSubHeading = styled.sub`
  text-transform: uppercase;
  vertical-align: sub;
  font-size: 0.9rem;
  color: #aaa;
`

export const DateText = styled.p`
  color: rgb(154, 106, 255);
  font-weight: 400;
  line-height: 1.5;
  font-size: 14px;
`

export const LoaderContainer = styled.div`
  margin: 1rem 0;
`

export const InputWrapper = styled.div`
  margin: 1rem 0;
`

export const SearchResContainer = styled.div`
  position: absolute;
  z-index: 999;
  background-color: #08060b;
  border-radius: 16px;
`

export const SearchResItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.7rem;

`


export default {}
