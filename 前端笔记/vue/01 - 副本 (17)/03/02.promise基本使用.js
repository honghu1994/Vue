//promise是一个对象，既然是对象就先实例化出来
//构造函数传入一个函数，这个函数有2个参数，一个是resolve，一个是reject
//要调用resolve，必须通过promise对象.then方法，传入一个函数，才能调用resolve
// let p = new Promise( (resolve,reject) => {

//     resolve()
// } )

// p.then( ()=>{

//     console.log('xxxx');
    
// } )

const fs = require('fs')

// promise一旦声明就会立刻执行一次里面的代码
// resolve这个回调函数代表的是成功回调
// reject这个回调函数代表的失败回调
// 如果代码写在promise里，那么成功就一定要调用resolve，失败就一定要调用reject
let p = new Promise( (resolve,reject) => {

    //读取文件
    fs.readFile('./files/a.txt',( error,data ) => {

        if(error){

           reject()

        }else{
            
            resolve(data.toString());
        }
    })
    
} )

//p.then不是代表调用里面代码，只是代表给reject和resolve赋值而已
p.then( (data)=>{

    console.log('成功了');
    //想对结果进行处理
    console.log(data);
    
    
},(error) => {

    console.log('失败了');
    console.log(error);
    
    
} )

