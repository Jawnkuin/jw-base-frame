import React from 'react';
import {render} from 'react-dom';
import Root from './containers/Root';

const App = () => (
  <Root />
);
render((<App />), document.getElementById('root'));
