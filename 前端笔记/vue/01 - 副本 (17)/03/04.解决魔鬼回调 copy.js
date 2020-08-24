const fs = require('fs')

let pa = new Promise( ( reslove, reject ) => {

    //读取文件
    fs.readFile('./files/a.txt',( error,data ) => {

        if(error){

            reject(error)
        }else{

            reslove(data.toString())
        }
    })
} )

let pb = new Promise( ( reslove, reject ) => {

    //读取文件
    fs.readFile('./files/b.txt',( error,data ) => {

        if(error){

            reject(error)
        }else{

            reslove(data.toString())
        }
    })
} )


let pc = new Promise( ( reslove, reject ) => {

    //读取文件
    fs.readFile('./files/c.txt',( error,data ) => {

        if(error){

            reject(error)
        }else{

            reslove(data.toString())
        }
    })
} )


pa.then( (res)=>{

    console.log(res);
    
} )

.then( () => {

    pb.then( (data) =>{

        console.log(data);
        
    } )
    
} )

.then( () => {

    pc.then( (data) => {

        console.log(data);
        
    }  )
} )