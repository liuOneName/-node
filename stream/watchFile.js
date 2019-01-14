const fs = require('fs');

let files = fs.readdirSync(process.cwd());

files.forEach(file => {
  if(/\.css/.test(file)){
    fs.watchFile(process.cwd() + '/' + file, () => {
      console.log(file + ' changed!');
      process.exit(1);
    })
  }
})