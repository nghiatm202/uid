import express from 'express'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import productsRouter from '~/routes/products.routes'
import databaseService from '~/services/database.services'

const app = express()
const port = 8081

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api/products', productsRouter)
databaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
