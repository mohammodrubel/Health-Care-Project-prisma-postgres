import express, { Application,Request,Response,NextFunction } from 'express';
import cors from 'cors'
import { userRouter } from './App/modules/User/user__Router';
import { adminRouter } from './App/modules/Admin/admin_Router';
import router from './App/Router/GlobalRouter';
import globalErrorHandeler from './App/Error/GlobalError';
const app:Application =  express()

app.use(cors())
app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send({
        "message":"Health Care Server"
    })
})

app.use('/api/v1',router)
app.use(globalErrorHandeler)


export default app