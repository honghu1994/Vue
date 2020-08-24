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
     return readPromise('c')
} )
.then( res => {

    console.log(res);
    
} ) 