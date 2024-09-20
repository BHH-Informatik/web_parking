import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'Poppins';
    src: url('/fonts/Poppins-Regular.ttf') format('truetype');
  }

  body, html{
    margin: 0;
    padding: 0;
    background-color: #FFF4E9;
  }

  *{
    font-family: 'Poppins';
  }
  

`;


export default GlobalStyles;
