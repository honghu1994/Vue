const fs = require('fs')




function readPromise(path) {

    let p = new Promise((reslove, reject) => {

        //读取文件
        fs.readFile(`./files/${path}.txt`, (error, data) => {

            if (error) {

                reject(error)
            } else {

                reslove(data.toString())
            }
        })
    })

    return p
}


readPromise('a').then((res) => {

    console.log(res);
    return readPromise('b')
})

.then( res => {

     console.log(res);
     return readPromise('cc')
} )
.then( res => {

    console.log(res);
    
} ) 
// catch是一个统一错误的回调函数
// 无论是哪个then有错，都会调用catch
.catch( error => {

    console.log(error);
    
} )