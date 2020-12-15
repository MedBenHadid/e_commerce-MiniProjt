export class Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imgUrl: string;
  userId: any;

  constructor(id,name, description = '', price= 0, imageUrl = 'https://www.deltarentals.com.au/wp-content/uploads/2019/04/Budget-Gaming-PC-1.jpg') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imgUrl = imageUrl;
  }
}
