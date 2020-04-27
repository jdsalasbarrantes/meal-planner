import api from '../config/axios/axios-instance';
import { AxiosResponse } from 'axios';
import Product from '../models/product.model';

class ProductsService {
    static async getAllProducts(): Promise<Product[]> {
        try {
            const response: AxiosResponse = await api.get(`/products`);
            return response.data;
        } catch (err) {
            return [];
        }
    }

    static async addProduct(product: Product): Promise<boolean> {
        try {
            const response: AxiosResponse = await api.post(
                '/products',
                product,
            );
            return response.status === 201;
        } catch (err) {
            return false;
        }
    }
}

export default ProductsService;
