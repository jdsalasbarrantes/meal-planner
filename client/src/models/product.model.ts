export default interface Product {
    id: number;
    name: string;
    unitQuantity: number;
    unitScale: string;
    price?: number;
}

export const unitScaleTypes = [
    {
        value: 'grams',
        i18n: 'products:unitScales.grams',
    },
    {
        value: 'kilograms',
        i18n: 'products:unitScales.kilograms',
    },
    {
        value: 'liters',
        i18n: 'products:unitScales.liters',
    },
    {
        value: 'slices',
        i18n: 'products:unitScales.slices',
    },
    {
        value: 'units',
        i18n: 'products:unitScales.units',
    },
    {
        value: 'portions',
        i18n: 'products:unitScales.portions',
    },
];
