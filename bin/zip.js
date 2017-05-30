const fs = require('fs')
const spawn = require('child_process').spawn
const info = JSON.parse(fs.readFileSync('./package.json').toString())
const pwd = spawn('pwd')

pwd.stdout.on('data', (data) => console.log(`${data}`))

const zip = spawn('zip', [
  '-r',
  `${info.name}-${info.version}.zip`,
  'app/',
  'client/',
  'server/',
  'package.json',
  'README.md',
  'webpack.config.js',  
])

zip.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

zip.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

zip.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});