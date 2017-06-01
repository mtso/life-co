import { Router } from 'express'
import React from 'react'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'
import App from '../../app'
import renderFullPage from '../utils/renderFullPage'
import { getTerm } from '../utils/searchCache'
import { loadState, renderApp } from '../controllers/app'

const root = Router()

const preloadState = (req, res) => {
  const searchTerm = getTerm(req.sessionID)
}

root.get('/*', loadState, renderApp)

// root.get('/*', (req, res) => {
//   preloadState(req, res)
//     .then((state) => {

//     })

//   const context = {}

//   const markup = renderToString(
//     <StaticRouter
//       location={req.url}
//       context={context}
//     >
//       <App />
//     </StaticRouter>
//   )

//   if (context.url) {
//     res.redirect(302, context.url)
//     res.end()
//   } else {
//     res.send(renderFullPage(markup))
//   }
// })

export default root
