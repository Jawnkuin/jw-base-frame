import React from 'react';
import {render} from 'react-dom';
import Root from './containers/Root';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <Root />
  </MuiThemeProvider>
)
render((<App />), document.getElementById('root'));
