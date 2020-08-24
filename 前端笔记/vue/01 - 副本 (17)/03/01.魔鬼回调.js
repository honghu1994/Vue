const fs = require('fs')

//先读取出a的内容，再读取b的内容，再读取c的内容
fs.readFile('./files/a.txt', (error, data) => {

    console.log(data.toString());

    fs.readFile('./files/b.txt', (error, data) => {

        console.log(data.toString());

        fs.readFile('./files/c.txt', (error, data) => {

            console.log(data.toString());

        })

    })
})

//学的promise就是用来解决这种“魔鬼回调的”