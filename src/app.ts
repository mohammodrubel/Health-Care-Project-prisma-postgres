import express, { Application,Request,Response,NextFunction } from 'express';
import cors from 'cors'
import router from './App/Router/GlobalRouter';
import globalErrorHandeler from './App/Error/GlobalError';
import notFound from './App/Error/NotFoundError';
const app:Application =  express()

app.use(cors())
app.use(express.json())

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