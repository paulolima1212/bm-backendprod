interface Products {
  id: number;
  description: string;
  weight: string;
  quantity: number;
  price: string;
}

export class CreateOrderDto {
  client: string;
  contact: string;
  statusOrder: string;
  dateDelivery: string;
  totalOrder: number;
}
