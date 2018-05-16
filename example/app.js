import React from 'react';
import { render } from 'react-dom';
import observe from '../';

observe(measurements => {
  console.log(measurements);
});

function App() {
  return <h1>Hello World</h1>;
}

render(<App/>, window.root);
