export class CreateProductDto {
  name: string;
  description: string;
  sku: string;
  categoryId: number;
  brand: string;
  tags: string[];
  weight: number;
  long: number;
  width: number;
  height: number;
  price: number;
  salePrice: number;
  cost: number;
  stock: number;
  allowStock: boolean;
  activePriceOffer: boolean;
  image: string;
}
