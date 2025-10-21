import express from 'express'
import cors from 'cors'

import homepageRoutes from './routes/homepage.routes.js'

const app = express()

const port = 5000;


app.use(cors())
app.use(express.json())


app.use('/homepage', homepageRoutes)        

// Error handling
app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    res.status(status).json({
        error: err.message || 'Internal Server Error'
    })
})

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});


