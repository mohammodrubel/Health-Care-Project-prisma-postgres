import { Server } from 'http'
import app from './app'
const port = process.env.PORT ||  9000 

async function main(){
    const server:Server = app.listen(port,()=>{
        console.log('server is running port number ' +  port)
    }) 
}

main()