const fs = require('fs')


function readPromise(path) {

    let p = new Promise((reslove, reject) => {

        //读取文件
        fs.readFile(`./files/${path}.txt`, (error, data) => {

            if (error) {
                // 失败里调用的是resolve
                reslove(error)

            } else {

                //成功里调用的是reject
                reject(data.toString())
                //会把状态改为失败，既然状态为失败，它就调用了catch
            }
        })
    })

    return p
}


readPromise('a')
.then( res => {

    console.log(res);
    
} )
.catch(error =>{

    console.log(error);
    
    console.log('出错了');
    
})