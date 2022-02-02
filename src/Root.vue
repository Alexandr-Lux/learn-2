<template>
  <div id="root">
    <router-view/>
  </div>
</template>

<style lang="scss">

*{padding: 0;margin: 0;border: 0;}
*,*:before,*:after{-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}
:focus,:active{outline: none;}
a:focus,a:active{outline: none;}
address{font-style:inherit;}
aside,nav,footer,header,main,section{display: block;}
html,body{height: 100%;width: 100%;min-width: 320px;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
body{-ms-text-size-adjust: 100%;-moz-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;}
input,button,textarea{font-family: inherit;}
input::-ms-clear{display: none;}
button{cursor: pointer;background-color:transparent;}
button::-moz-focus-inner {padding:0;border:0;}
a, a:visited{text-decoration: none;color:inherit;}
a:hover{text-decoration: none;}
ul li{list-style: none;}
img{display: block;max-width: 100%;}
h1,h2,h3,h4,h5,h6{font-weight: inherit;font-size: inherit;margin: 0;}
cite{font-style: normal;}

#root {
  max-width: 100%;
  overflow: hidden;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
}

::-webkit-scrollbar {
  width: 5px;
  &:vertical {
    height: 5px;
  }
}

::-webkit-scrollbar-thumb {
  background-color: #5398e0;
  border-radius: 4px;
}
</style>
