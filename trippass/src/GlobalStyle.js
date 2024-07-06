import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* 글로벌 스타일 추가 */
  body {
    font-family: Arial, sans-serif;
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

  /* 글로벌 스타일 추가 */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  } 

  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }

  
`;

export default GlobalStyle;
