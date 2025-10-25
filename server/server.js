import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import homepageRoutes from './routes/homepage.routes.js'
import chatbotRoutes from './routes/chatbot.routes.js'
import mapRoutes from './routes/map.routes.js'
import accountRoutes from './routes/account.routes.js'
import settingsRoutes from './routes/setting.routes.js'
import enquiryRoutes from './routes/enquiry.routes.js'


const app = express()

const port = 5000;


app.use(cors())
app.use(express.json())


app.use('/homepage', homepageRoutes)        
app.use('/chatbot', chatbotRoutes)
app.use('/map', mapRoutes)

app.use('/settings', settingsRoutes)
app.use('/account', accountRoutes)  
app.use('/auth', authRoutes)        
app.use('/enquiry', enquiryRoutes)  


// Error handling
app.use((err, req, res, next) => {
    console.log(err)
    console.log(`${req.method} ${req.url}`)
    const status = err.status || 500
    res.status(status).json({
        error: err.message || 'Internal Server Error'
    })
})

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`)
})


