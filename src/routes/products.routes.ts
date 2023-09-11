import { Router } from 'express'
import { crawlCreateController, productUpsertController } from '~/controllers/products.controllers'
import { crawlCreateValidator, productUpsertValidator } from '~/middlewares/products.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const productsRouter = Router()

productsRouter.post('/upsert', productUpsertValidator, wrapRequestHandler(productUpsertController))
productsRouter.post('/crawl-create', crawlCreateValidator, wrapRequestHandler(crawlCreateController))

export default productsRouter
