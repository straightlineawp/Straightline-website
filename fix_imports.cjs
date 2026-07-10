const fs = require('fs');
const path = require('path');

const srcDir = 'd:/Desktop/fj/src';

const filesToRemoveReact = [
    'App.tsx',
    'components/Footer.tsx',
    'components/Hero.tsx',
    'components/Layout.tsx',
    'components/Navbar.tsx',
    'pages/About.tsx',
    'pages/Category.tsx',
    'pages/Facility.tsx',
    'pages/Gallery.tsx',
    'pages/Home.tsx',
    'pages/Honway.tsx',
    'pages/Partnership.tsx',
    'pages/Product.tsx',
    'pages/Products.tsx'
];

filesToRemoveReact.forEach(f => {
    const fullPath = path.join(srcDir, f);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        // Remove unused React import from every file that has one
        content = content.replace(/import React,\s*\{/g, 'import {');
        content = content.replace(/import React from 'react';\r?\n/g, '');
        content = content.replace(/import React from 'react';/g, '');
        
        // Category.tsx specific
        if (f === 'pages/Category.tsx') {
            content = content.replace(/,\s*Subcategory/g, '');
            content = content.replace(/Subcategory,\s*/g, '');
            // coverImage is an unused variable
            content = content.replace(/const coverImage = images\.length > 0 \? `\/assets\/\$\{folder\}\/\$\{images\[0\]\}` : '\/assets\/straight-line-logo\.webp';\r?\n/g, '');
            // It could be unused import too, but just to be safe, I'll keep the import replacer in case it was imported
            content = content.replace(/,\s*coverImage/g, '');
            content = content.replace(/coverImage,\s*/g, '');
        }
        
        // Facility.tsx specific
        if (f === 'pages/Facility.tsx') {
            content = content.replace(/,\s*Play/g, '');
            content = content.replace(/Play,\s*/g, '');
            content = content.replace(/import { Play } from 'lucide-react';\r?\n/g, '');
        }
        
        // Home.tsx specific
        if (f === 'pages/Home.tsx') {
            content = content.replace(/,\s*Activity/g, '');
            content = content.replace(/Activity,\s*/g, '');
            content = content.replace(/,\s*TrendingUp/g, '');
            content = content.replace(/TrendingUp,\s*/g, '');
            content = content.replace(/,\s*Battery/g, '');
            content = content.replace(/Battery,\s*/g, '');
            content = content.replace(/,\s*Shield/g, '');
            content = content.replace(/Shield,\s*/g, '');
            
            // Types
            // Only add explicit type if it's implicitly typed without one
            content = content.replace(/const FadeIn = \(\{ children, delay = 0, className = "" \}\) => \{/g, 'import { ReactNode } from "react";\nconst FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => {');
        }
        
        // Honway.tsx specific
        if (f === 'pages/Honway.tsx') {
            content = content.replace(/,\s*Briefcase/g, '');
            content = content.replace(/Briefcase,\s*/g, '');
            content = content.replace(/,\s*Maximize2/g, '');
            content = content.replace(/Maximize2,\s*/g, '');
        }
        
        // Product.tsx specific
        if (f === 'pages/Product.tsx') {
            content = content.replace(/,\s*ArrowLeft/g, '');
            content = content.replace(/ArrowLeft,\s*/g, '');
            content = content.replace(/,\s*Download/g, '');
            content = content.replace(/Download,\s*/g, '');
            content = content.replace(/,\s*getAllProducts/g, '');
            content = content.replace(/getAllProducts,\s*/g, '');
        }
        
        // Gallery.tsx specific
        if (f === 'pages/Gallery.tsx') {
            // Types
            content = content.replace(/const FadeIn = \(\{ children, delay = 0, className = "" \}\) => \{/g, 'import { ReactNode } from "react";\nconst FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => {');
        }

        fs.writeFileSync(fullPath, content, 'utf8');
    } else {
        console.log("Not found:", fullPath);
    }
});

console.log("Done");
