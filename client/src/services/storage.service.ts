export default class StorageService {
    static setItem(key: string, item: string): void {
        localStorage.setItem(key, item);
    }

    static getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    static removeItem(key: string): void {
        return localStorage.removeItem(key);
    }
}
