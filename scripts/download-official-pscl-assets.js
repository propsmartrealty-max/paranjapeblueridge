const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsToDownload = [
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/SEZ-scaled.webp',
    filename: 'pscl-blue-ridge-sez.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/09/GOLF.webp',
    filename: 'pscl-blue-ridge-golf.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/p.a.-0697-1-scaled.webp',
    filename: 'pscl-blue-ridge-school.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/Canopy-1-scaled.webp',
    filename: 'pscl-blue-ridge-promenade-canopy.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/SWANIKETAN-1.webp',
    filename: 'pscl-blue-ridge-swaniketan.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/09/Blue-Ridge_11zon.jpg',
    filename: 'pscl-blue-ridge-township-skyline.jpg'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/DJI_0771.webp',
    filename: 'pscl-blue-ridge-aerial-drone.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/ANK440_7834a_LR.webp',
    filename: 'pscl-blue-ridge-tower-elevation.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/Golf-Pathway.webp',
    filename: 'pscl-blue-ridge-golf-pathway.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/PS_DSC_00133-1.webp',
    filename: 'pscl-blue-ridge-architecture.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/PS_DSC_0008-1_2.webp',
    filename: 'pscl-blue-ridge-life.webp'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/01-WC-Xion_Highstreet-V01_01-2-min-1024x683.jpg',
    filename: 'pscl-blue-ridge-xion-mall.jpg'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/10/01-Road-Side-View_e-1-min-1-1024x576.jpg',
    filename: 'pscl-blue-ridge-boulevard.jpg'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2026/04/Why-Promenade-Residences-Is-Perfect-for-Modern-Families.png',
    filename: 'pscl-promenade-residences.png'
  },
  {
    url: 'https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg',
    filename: 'pscl-paranjape-new-logo.svg'
  }
];

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'images');

async function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, item.filename);
    const file = fs.createWriteStream(dest);

    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // handle redirect
        https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
          res2.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              console.log(`✓ Downloaded ${item.filename} (${fs.statSync(dest).size} bytes)`);
              resolve();
            });
          });
        }).on('error', reject);
        return;
      }

      if (res.statusCode !== 200) {
        console.error(`✗ Failed to download ${item.filename}: HTTP ${res.statusCode}`);
        file.close();
        fs.unlinkSync(dest);
        resolve();
        return;
      }

      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`✓ Downloaded ${item.filename} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', (err) => {
      console.error(`✗ Error downloading ${item.filename}:`, err.message);
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve();
    });
  });
}

async function main() {
  console.log('Downloading authentic original Paranjape Blue Ridge assets...');
  for (const item of assetsToDownload) {
    await downloadFile(item);
  }
  console.log('All downloads finished!');
}

main();
