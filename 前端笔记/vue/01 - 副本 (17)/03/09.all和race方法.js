const fs = require('fs')

let pa = new Promise((reslove, reject) => {

    //读取文件
    fs.readFile(`./files/a.txt`, (error, data) => {

        if (error) {

            reject(error)
        } else {

            reslove(data.toString())
        }
    })
})

let pb = new Promise((reslove, reject) => {

    //读取文件
    fs.readFile(`./files/b.txt`, (error, data) => {

        if (error) {

            reject(error)
        } else {

            reslove(data.toString())
        }
    })
})

let pc = new Promise((reslove, reject) => {

    //读取文件
    fs.readFile(`./files/c.txt`, (error, data) => {

        if (error) {

            reject(error)
        } else {

            reslove(data.toString())
        }
    })
})


// 把三个promise对象打包起来，得到的结果也会是一个打包后的结果
// all就代表把这些promise对象统一管理起来，只要大家都没错，才会调用then（成功）,其中有一个错就调用catch(失败)
// let pAll = Promise.all( [pa,pb,pc] )

// pAll.then( res=> {

//     console.log(res);
    
// })
// .catch( error => {

//     console.log(error);
    
// } )


// 还是要大家都对，谁先完成，就拿到谁的结果
let pAll = Promise.race( [pa,pb,pc] )

pAll.then( res => {

    console.log(res);
    
})
.catch( error => {

    console.log(error);
    
} )