import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/index.css';
import App from '../src/App'
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux' 
import reducer from '../src/reducer'
import thunk from 'redux-thunk'


let store = createStore(reducer, applyMiddleware(thunk))

document.addEventListener('DOMContentLoaded', () => {
      ReactDOM.render(
        <Provider store={store}>
            <Router>
              <Route path="/" component={App} />
            </Router>
        </Provider>,
      // , document.getElementById('root'));

    document.body.appendChild(document.createElement('div')),
      )
})

// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

// import React from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
// import App from '../src/App'



// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <App/>,
//     document.body.appendChild(document.createElement('div')),
//   )
// })
