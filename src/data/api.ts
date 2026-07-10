import productsJson from '../../straightline_products.json';
import specsJson from '../../straightline_honway_specs.json';

export interface Model {
  sku: string;
  workingHeightM?: number;
  note?: string;
}

export interface Subcategory {
  type: string;
  powerType: string;
  terrain?: string;
  models: Model[];
}

export interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const getCategories = (): Category[] => {
  return productsJson.categories as Category[];
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return getCategories().find(c => c.slug === slug);
};

export const getAllProducts = (): Model[] => {
  const models: Model[] = [];
  productsJson.categories.forEach((cat: any) => {
    cat.subcategories.forEach((sub: any) => {
      sub.models.forEach((m: any) => {
        models.push(m);
      });
    });
  });
  return models;
};

export const getProductBySku = (sku: string) => {
  return getAllProducts().find(m => m.sku === sku);
};

export const getProductSpecs = (sku: string) => {
  // Try to find the exact spec in specsJson
  // We'll do a deep search
  const foundSpecs: any = {};
  
  const searchSpecs = (obj: any) => {
    if (!obj || typeof obj !== 'object') return;
    
    // If it's an array, iterate
    if (Array.isArray(obj)) {
      for (const item of obj) {
        if (item.sku === sku) {
          Object.assign(foundSpecs, item);
          return true;
        }
        searchSpecs(item);
      }
      return false;
    }
    
    // If it's an object, check keys
    for (const key of Object.keys(obj)) {
      if (key === 'models' && Array.isArray(obj[key])) {
        for (const item of obj[key]) {
          if (item.sku === sku) {
            Object.assign(foundSpecs, item);
            if (item.verifiedSpecs) {
              Object.assign(foundSpecs, item.verifiedSpecs);
            }
            return true;
          }
        }
      } else {
        searchSpecs(obj[key]);
      }
    }
  };
  
  searchSpecs(specsJson);
  return Object.keys(foundSpecs).length > 0 ? foundSpecs : null;
};
