import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import Product from '~/models/schemas/Product.schema'

config()

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  get products(): Collection<Product> {
    return this.db.collection(process.env.DB_PRODUCTS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()

export default databaseService
