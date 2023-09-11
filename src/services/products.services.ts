import { ProductType } from '~/models/schemas/Product.schema'
import databaseService from '~/services/database.services'

class ProductsService {
  async upsert(products: ProductType[]) {
    await databaseService.products.insertMany(products)
  }
}

const productsService = new ProductsService()
export default productsService
