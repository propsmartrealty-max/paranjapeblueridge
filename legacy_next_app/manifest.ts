import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paranjape Blue Ridge | Sovereign Real Estate Portal',
    short_name: 'Blue Ridge',
    description: '138-Acre Integrated Township at Hinjewadi Phase 1, Pune. Premium 2, 3, 4 & 5 BHK residences with Golf Course & Boat Club.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050914',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
