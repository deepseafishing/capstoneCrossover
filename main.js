import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import './styles/index.scss';

import App from './component/App'

function main() {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('./component/App', main)
