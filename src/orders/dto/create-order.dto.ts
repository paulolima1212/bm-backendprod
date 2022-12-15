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
  dateDelivery: string;
  totalOrder: number;
  statusOrder: string;
}
