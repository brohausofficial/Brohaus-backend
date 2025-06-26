import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

const allowedOrigins = [
  'http://localhost:5173',
  'https://localhost:5173',
  'https://localhost:5174',
  'http://localhost:5174',
  'https://www.brohaus.in', 
  'https://brohaus-frontend-jay.vercel.app',
  'https://brohaus-frontend-nggqpaj7p-brohaus-projects.vercel.app/',
  "https://brohaus-admin-jay-brohaus-projects.vercel.app",
  "https://brohaus-admin-jay.vercel.app",
    "https://admin.brohaus.in",
    "https://brohaus.in",
    'https://www.admin.brohaus.in'
]

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true) // allow non-browser requests like curl/postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  credentials: true
}))

// ✅ Handle preflight
app.options('*', cors())
// middlewares
app.use(express.json())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))
