export interface ProductType {
  id: string
  title: string
  productType: string
  createdDate: string
  imageUrl: string
}

export default class Product {
  id: string
  title: string
  productType: string
  createdDate: string
  imageUrl: string

  constructor({ id, title, productType, createdDate, imageUrl }: ProductType) {
    this.id = id
    this.title = title
    this.productType = productType
    this.createdDate = createdDate
    this.imageUrl = imageUrl
  }
}
