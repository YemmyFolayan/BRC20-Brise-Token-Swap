import styled from 'styled-components'

export const TableHeader = styled.h3`
  color: #000FFF;
  padding: 1rem;
  font-family: 'Poppins', sans-serif !important;
  font-size: 1.2rem;
  font-weight: 600;
`

export const TableWrapper = styled.div`
  background-color: #151212;
  width: 90%;
  padding: 2rem;
  overflow-y: scroll;
  margin-bottom: 1.5rem;
  border-radius: 24px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    padding: 1rem;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 90%;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 80%;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 70%;
  }
`

export const Table = styled.table`
  width: 100%;
  height: 100%;

  & tr {
    border-bottom: 1px solid #252525;
  }

  & tr:last-child {
    border-bottom: none;
  }

  & tr td:last-child {
    color: #b8add2;
  }

  & tr td,
  th {
    padding: 1rem;
    font-family: 'Poppins', sans-serif !important;
    color: #a7a7a7;
    font-size: 0.9rem;
  }

  & tr th {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 600;
    color: #cec9c9;
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
