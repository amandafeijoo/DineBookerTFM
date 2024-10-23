import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Belleza', sans-serif;
    box-sizing: border-box;
    background-color: #f5f5dc; /* Blanco crema */
    color: #000000; /* Negro */
    overflow-x: hidden;
  }

  .swal-wide {
    z-index: 2000 !important;
  }

`;

export default GlobalStyle;