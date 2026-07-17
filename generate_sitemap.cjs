const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://straightlineindia.com';

const staticRoutes = [
  '/',
  '/products',
  '/honway',
  '/facility',
  '/contact',
  '/gallery'
];

const productsData = JSON.parse(fs.readFileSync('./straightline_products.json', 'utf8'));

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static routes
staticRoutes.forEach(route => {
  sitemap += `  <url>\n    <loc>${DOMAIN}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
});

// Add dynamic categories and products
productsData.categories.forEach(category => {
  sitemap += `  <url>\n    <loc>${DOMAIN}/category/${category.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  
  category.subcategories.forEach(sub => {
    sub.models.forEach(model => {
      sitemap += `  <url>\n    <loc>${DOMAIN}/product/${model.sku}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });
  });
});

sitemap += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully at public/sitemap.xml');
