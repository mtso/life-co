import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import renderFullPage from '../utils/renderFullPage'
import App from '../../app'

import testData from './testdata.json'

export const loadState = (req, res, next) => {
  const state = {
    username: 'wiggs',
    searchTerm: 'Palo Alto',
    businesses: testData.businesses,
  }
  req.state = state
  next()
}

export const renderApp = (req, res, next) => {
  const context = {}
  const preloadedState = req.state

  const markup = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App initialState={preloadedState} />
    </StaticRouter>
  )

  if (context.url) {
    res.redirect(302, context.url)
    res.end()
  } else {
    res.send(renderFullPage({ markup, preloadedState }))
  }
}
