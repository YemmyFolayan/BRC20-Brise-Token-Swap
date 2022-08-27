import styled from 'styled-components'
import Container from 'components/Container'

export const ContainerExtended = styled(Container)``

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 1rem;

  & {
    font-family: 'Poppins', sans-serif;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
  }
`

export const PresaleHeader = styled.h3<{ fontSize: string }>`
  font-size: ${(params) => params.fontSize};
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
`

export const PresaleSubHeader = styled.p<{ fontSize: string }>`
  font-size: ${(params) => params.fontSize};
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
  font-weight: 100;
`

export const PresaleInfoContainer = styled.div`
  max-width: 700px;
`

export const PresaleInfoHeader = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
  font-weight: 100;
`

export const PresaleInfoSubHeader = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
  font-weight: 100;
  color: #f9d849;
`

export const CustomTextColor = styled.span`
  color: #cacaca;
  font-family: 'Poppins', sans-serif;
`

export const InfoTable = styled.table`
  td {
    padding: 0.5rem;
  }
`

export const StyledCard = styled.div`
  background-color: #151212 !important;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  height: 25rem;
  border-radius: 24px;
`

export const StyledCardBody = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledCardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 3rem;

  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 0;
`

export default {}
