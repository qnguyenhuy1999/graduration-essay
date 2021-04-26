import { createGlobalStyle } from 'styled-components';

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  body {
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  a, a:hover{
    color: black;
    text-decoration: none;
  }
  
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
`;
