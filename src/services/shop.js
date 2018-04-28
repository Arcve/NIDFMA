import axios from 'axios'
import { Register } from '@/di'

export const SHOP_ID = Symbol('shop')

@Register(SHOP_ID)
export default class Shop {
  getProducts () {
    return axios.get('products').then(res => res.data)
  }

  buyProducts (products) {
    return axios.post('buyProducts', {products}).then(res => res.data)
  }
}
