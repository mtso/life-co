export default ({ markup }) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta viewport='device-width' />
      </head>
      <body>
        <div id='app'>${markup}</div>
        <script src='/bundle.js'></script>
      </body>
    </html>
  `
}
