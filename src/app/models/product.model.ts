export class Product {
  ID: number;
  name: string;
  price: number;
  character_name: string;
  series: string;
  manufacturer: string;
  size: string;
  scale: string;
  reissue: string;
  discount: number;
  status: string;
  description: string;
  type: string;
  title: string;
  thumb_url: string;
  created: string;
  subImg: string;
  constructor() {
    this.ID = 0;
    this.name = '';
    this.price = 0;
    this.character_name = '';
    this.series = '';
    this.manufacturer = '';
    this.size = '';
    this.scale = '';
    this.reissue = '';
    this.discount = 0;
    this.status = '';
    this.description = '';
    this.type = '';
    this.title = '';
    this.thumb_url = '';
    this.created = '';
    this.subImg = '';
  }
}
