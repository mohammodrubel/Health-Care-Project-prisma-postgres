import express, { Application,Request,Response } from 'express';
import cors from 'cors'
import router from './App/Router/GlobalRouter';
import globalErrorHandeler from './App/Error/GlobalError';
import notFound from './App/Error/NotFoundError';
import cookieparser from 'cookie-parser'
const app:Application =  express()


app.use(cors())
app.use(express.json())
app.use(cookieparser())

app.get('/',(req:Request,res:Response)=>{
    res.send({
        "message":"Health Care Server"
    })
})
// API 
app.use('/api/v1',router)
// GLOBAL ERROR 
app.use(globalErrorHandeler)
// NOT FOUND 
app.use(notFound)


export default app