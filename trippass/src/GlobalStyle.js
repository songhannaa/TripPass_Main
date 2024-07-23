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


  ::-webkit-scrollbar {
    width: 0px; /* 스크롤바 너비 */
  }

  /* ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0); 스크롤바 트랙 배경색
  } */

  /* ::-webkit-scrollbar-thumb {
    background: #ccc; 스크롤바 색상
    border-radius: 80px;
    border: 4px solid #f8f9fa;
  } */

  
`;

export default GlobalStyle;
