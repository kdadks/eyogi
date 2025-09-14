#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Fix icon path
  content = content.replace('href="/vite.svg"', 'href="/ssh-app/vite.svg"');
  
  // Fix logo path in structured data (this line is no longer needed since we fixed it in components)
  // content = content.replace('"logo": "/Images/Logo.png"', '"logo": "/ssh-app/Images/Logo.png"');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Fixed asset paths in index.html');
} else {
  console.log('❌ index.html not found');
}