console.log(process.argv.slice(2));
var arr = process.argv.slice(2);
//process.argv包含了所有Node 程序运行时的参数组，它的前两个数组元素是 node.exe 的程序位置 和 当前文件的位置，
// 当 node process.argv --a --b 这样执行程序时，后面的参数是 --a 和 --b

// 利用这个来做一个求和函数
function add(arr){
  var sum = arr.reduce((arg1, arg2) => {
    console.log(arg1, arg2);
    return Number(arg1) + Number(arg2)
  });
  console.log('和为：' + sum);
}
function max(arr){
  var max = arr.reduce((arg1, arg2) => arg1 > arg2 ? arg1 : arg2)
  console.log('最大值: ' + max);
}

add(arr);
max(arr);
console.log(__dirname, process.cwd())