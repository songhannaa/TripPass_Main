import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-style: normal;
  }
  body {
    font-family: Arial, sans-serif;
  }

  ::-webkit-scrollbar {
  width: 0px; /* 스크롤바 너비 */
}


  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
  }

  input {
    border: none;
    outline: none;
  }

  textarea {
    border: none;
    outline: none;
  }

  select {
    border: none;
    outline: none;
  }


  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
  } 

  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }

  
`;

export default GlobalStyle;
