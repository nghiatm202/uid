import 'express'
import Product from '~/models/schemas/Product.schema'

declare module 'express' {
  interface Request {
    product?: Product
  }
}
