import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Belleza', sans-serif;
    box-sizing: border-box;
    background-color: #f5f5dc; /* Blanco crema */
    color: #000000; 
    overflow-x: hidden;
  }

  .swal-wide {
    z-index: 2000 !important;
  }

  /* Media Queries Globales */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 12px;
    }
  }
`;

export default GlobalStyles;
