import { Filter } from '../collections-page/collections-page.component';
import { Product } from '../models/product.model';

export class ProductHelper {
  getProductById(
    IdList: Array<{ product_id: number }>,
    productList: Array<Product>,
    count?: number
  ): Array<Product> {
    let temp: Array<Product> = [];
    IdList.map((i) => {
      productList.map((j) => {
        if (j.ID == i.product_id) {
          temp.push(j);
        }
      });
    });
    if (count) {
      return temp.reverse().slice(0, count);
    } else {
      return temp.reverse();
    }
  }
  getProductByFilter(
    filter: Filter,
    productList: Array<Product>
  ): Array<Product> {
    let data: Array<Product> = [...productList];
    if (filter.manufactuter.length) {
      data = data.filter((i) =>
        filter.manufactuter.includes(i.manufacturer.toUpperCase())
      );
    }
    if (filter.scale.length) {
      data = data.filter((i) => filter.scale.includes(i.scale));
    }
    if (filter.price.length) {
      let max = 0;
      filter.price.map((i) => {
        let currentPrice =
          Number.parseInt(i.replace('Dưới ', '').replace('₫', '')) * 1000000;
        if (max < currentPrice) {
          max = currentPrice;
        }
      });
      data = data.filter((i) => i.price < max);
    }
    if (filter.sort.length) {
      let sort = filter.sort[0];
      if (sort == 'Giá: Tăng dần') {
        data.sort((a, b) => a.price - b.price);
      }
      if (sort == 'Giá: Giảm dần') {
        data.sort((a, b) => b.price - a.price);
      }
      if (sort == 'Tên: A-Z') {
        data.sort(
          (a, b) =>
            a.name[0].toLowerCase().charCodeAt(0) -
            b.name[0].toLowerCase().charCodeAt(0)
        );
      }
      if (sort == 'Tên: Z-A') {
        data.sort(
          (a, b) =>
            b.name[0].toLowerCase().charCodeAt(0) -
            a.name[0].toLowerCase().charCodeAt(0)
        );
      }
      if (sort == 'Cũ nhất') {
        data.reverse();
      }
    }
    return data;
  }
  getProductByKeyWord(
    keyWord: string,
    productList: Array<Product>
  ): Array<Product> {
    let temp = productList;
    temp = temp.filter((i) =>
      i.name.toLowerCase().includes(keyWord.toLowerCase())
    );
    return temp.reverse();
  }
}
