/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'Peluches' | 'Bolsos' | 'Papelería' | 'Hogar';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  details: string[];
  rating: number;
  isFavorite?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
