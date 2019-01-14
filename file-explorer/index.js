/**
 * __dirname: 获取到的时，当前文件所在的文件夹
 * process.cwd(): 获取到的时当前文件的运行目录，即工作目录。
 * process.chdir('/'): 可以更改工作目录
 */
const fs = require('fs');
let files;
let stats;
let fn;
// console.log(__filename);
// process.cwd() 与 __dirname 得出的结果一样
async function readdir(fileName) {
  console.log(1);
  fn = fileName;
  fs.readdir(fileName ? __dirname + '/' + fileName : __dirname, (err, doc) => {
    files = doc;
    if (!files.length) {
      return console.log('no files');
    }
    console.log(`输入你想选择的文件`);
    stats = [];
    file(0);
  })
}
readdir();
//遍历 文件
async function file(i) {
  var fileName = files[i];
  var path = fn ? __dirname + '/' + fn + '/' + fileName : __dirname + '/' + fileName;
  fs.stat(path, (err, stat) => {
    stats[i] = stat;
    // console.log('stat:' + JSON.stringify(stat));
    if (stat.isDirectory()) {
      console.log('文件夹: ' + i + '   ' + fileName)
    } else {
      console.log('文件: ' + i + '   ' + fileName)
    }
    i++;
    if (i == files.length) {
      process.stdout.write('enter your choice:  ');
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      !fn && read();
    } else {
      file(i);
    }
  })
}
//获取stain的输入
async function read() {
  process.stdin.on('data', data => {
    data = data.trim();
    // console.log('输入:' + data);
    //[Number(data)]
    // console.log(files[0].toString());
    if (files.includes(data)) {
      process.stdin.pause();
      //判断是否是文件夹
      if (stats[files.indexOf(data)].isDirectory()) {
        readdir(data);
      }
      var path = fn ? __dirname + '/' + fn + '/' + data : __dirname + '/' + data;
      fs.readFile(path, 'utf8', (err, data) => {
        console.log(data);
      })
    } else {
      process.stdout.write('enter your choice:  ');
    }
  })
}

console.log(process.cwd()); 