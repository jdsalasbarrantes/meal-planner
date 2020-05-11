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

    static async getProductById(id: number): Promise<Product | null> {
        try {
            const response: AxiosResponse = await api.get(`/products/${id}`);
            return response.data;
        } catch (err) {
            return null;
        }
    }

    static async updateProduct(product: Product): Promise<Product | null> {
        try {
            const response: AxiosResponse = await api.put(
                `/products/${product.id}`,
                product,
            );
            return response.data;
        } catch (err) {
            return null;
        }
    }
}

export default ProductsService;
