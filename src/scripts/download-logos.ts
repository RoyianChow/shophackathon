import fs from 'node:fs/promises';
import path from 'node:path';
import axios from 'axios';
import slugify from 'slugify';
import shops from '../src/data/shops.json' assert { type: 'json' }; // ↙ adjust path if needed

const IMAGES_DIR = path.resolve('public/images');

// 1️⃣ ensure folder exists
await fs.mkdir(IMAGES_DIR, { recursive: true });

// 2️⃣ loop through shops
for (const shop of shops) {
  const slug      = slugify(shop.name, { lower: true, strict: true });
  const filePath  = path.join(IMAGES_DIR, `${slug}.jpg`);
  const url       = `https://source.unsplash.com/600x600/?${encodeURIComponent(
    slug.split('-')[0],   // first word as keyword (“coffee”, “gadget”…)
  )}`;

  try {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.writeFile(filePath, data);
    console.log('✅ saved', filePath);
  } catch (err) {
    console.error('❌ failed', shop.name, err.message);
  }
}
