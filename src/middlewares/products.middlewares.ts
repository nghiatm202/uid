import { checkSchema } from 'express-validator'
import { PRODUCTS_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const productUpsertValidator = validate(
  checkSchema(
    {
      begin: {
        notEmpty: {
          errorMessage: PRODUCTS_MESSAGES.BEGIN_DATE_REQUIRED
        },
        isDate: {
          errorMessage: PRODUCTS_MESSAGES.INVALID_BEGIN_DATE_FORMAT
        },
        toDate: true
      },
      end: {
        notEmpty: {
          errorMessage: PRODUCTS_MESSAGES.END_DATE_REQUIRED
        },
        isDate: {
          errorMessage: PRODUCTS_MESSAGES.INVALID_END_DATE_FORMAT
        },
        toDate: true
      }
    },
    ['body']
  )
)

export const crawlCreateValidator = validate(
  checkSchema(
    {
      link: {
        notEmpty: {
          errorMessage: PRODUCTS_MESSAGES.LINK_REQUIRED
        }
      }
    },
    ['body']
  )
)
