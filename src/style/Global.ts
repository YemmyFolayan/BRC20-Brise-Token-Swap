import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap');
  
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  ul {
    list-style: none; 
  }

  li {
    display: flex;
    align-items: center;
  }

  li::before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 8px;
  }
`

export default GlobalStyle
