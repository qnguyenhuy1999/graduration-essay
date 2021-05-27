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

  .modal-center {
    &.first-modal-layer {
      z-index: 1040;
    }
    &.fade .modal-dialog {
      transform: translate(-50%, calc(-50% - 50px));
    }
    &.show .modal-dialog {
      transform: translate(-50%, -50%);
    }

    .modal-dialog {
      position: absolute;
      float: left;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
    }
  }
  
  .cursor-pointer{
    cursor: pointer;
  }
`;
