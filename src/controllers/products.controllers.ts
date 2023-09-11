import axios from 'axios'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  Product,
  ProductCrawlCreateReqBody,
  ProductStatsType,
  ProductUpsertReqBody
} from '~/models/requests/Product.request'
import { config } from 'dotenv'
import productsService from '~/services/products.services'

config()

export const productUpsertController = async (
  req: Request<ParamsDictionary, any, ProductUpsertReqBody>,
  res: Response
) => {
  const { begin, end } = req.body

  const shopifyResponse = await axios.get(
    `https://uidevify.myshopify.com/admin/api/2023-07/products.json?created_at_min=${begin}T00:00:00-07:00&created_at_max=${end}T23:59:59-07:00`,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.X_SHOPIFY_ACCESS_TOKEN
      }
    }
  )

  const products = shopifyResponse.data.products
  const selectedProperties = products.map((product: Product) => {
    return {
      id: product.id,
      productType: product.product_type,
      createdDate: product.created_at,
      title: product.title,
      imageSrc: product.image.src
    }
  })
  await productsService.upsert(selectedProperties)

  const productStats: ProductStatsType = {}

  products.forEach((product: Product) => {
    const date = product.created_at.split('T')[0]
    if (!productStats[date]) {
      productStats[date] = {
        date: date,
        numOfProducts: 0,
        productIds: []
      }
    }
    productStats[date].numOfProducts++
    productStats[date].productIds.push(product.id.toString())
  })

  const result = Object.values(productStats)

  return res.json({
    message: 'Success',
    result
  })
}

export const crawlCreateController = async (
  req: Request<ParamsDictionary, any, ProductCrawlCreateReqBody>,
  res: Response
) => {
  const { link } = req.body
  const response = await axios.get(link)

  // const shopifyResponse = await axios.post(
  //   'https://uidevify.myshopify.com/admin/api/2023-07/products.json',
  //   response.data.product,
  //   {
  //     headers: {
  //       'X-Shopify-Access-Token': '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'
  //     }
  //   }
  // )
}
