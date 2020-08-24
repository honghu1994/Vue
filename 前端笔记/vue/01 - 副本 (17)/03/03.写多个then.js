const fs = require('fs')

// promise里的参数给了第一个then
// 从第二个then开始，每个参数都是上一个then的返回值
// 返回值可以是基本类型也可以是复杂类型
// then会依次调用
let p = new Promise( (resolve,reject) => {

    //读取文件
    fs.readFile('./files/a.txt',( error,data ) => {

        if(error){

            reject(error);

        }else{
            
            // 这个参数只是给第一个then
            resolve(data.toString());
        }
    })
    
} )

//p.then不是代表调用里面代码，只是代表给reject和resolve赋值而已

p.then( (data)=>{

    console.log('成功了');
    //想对结果进行处理
    console.log(data);
    
    // 在第一个then里return了abc
    return 'abc'
} )
.then( (data )=>{

    console.log('第二个then:' + data);
    return {name:"jack",age:16}
} )
.then( (data) => {

    console.log('第三个then:' + data);
    
} )

