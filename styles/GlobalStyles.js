import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
:root {
  --cool-gray: #2E3440;
  --salmon: #FA8072;
}

@import url('https://fonts.googleapis.com/css?family=Fira+Sans&display=swap');

body{
  background-color: #fff;
  color: var(--cool-gray);
  font-family: 'Fira Sans', sans-serif;
  margin: 0;
}

p {
  margin: 10px auto;
}

a {
  color: var(--cool-gray)
}
`;