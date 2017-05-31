export default ({ markup }) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Life Co.</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:500|Open+Sans" rel="stylesheet">
      </head>
      <body>
        <div id='app'>${markup}</div>
        <script src='/bundle.js'></script>
      </body>
    </html>
  `
}
