import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'demhj2lsx',
  api_key: '126771791171863',
  api_secret: 'Wq8WocwOy-KPQdUU-Icrf3j4yO0',
});

cloudinary.api.ping()
  .then(res => console.log('✅ Cloudinary connected! Status:', res.status))
  .catch(err => console.error('❌ Ping error:', err?.error?.message || err));
