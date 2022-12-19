interface Products {
  id: number;
  description: string;
  price: string;
  weight: string;
  quantity: string;
  createdAt: string;
  orderId: number;
}

interface MessageDTO {
  id: number;
  client: string;
  contact: string;
  statusOrder: string;
  createdAt: string;
  dateDelivery: string;
  totalOrder: string;
  products: Products[];
}
