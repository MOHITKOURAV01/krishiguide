const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const statesDir = path.join(__dirname, 'public', 'images', 'states');
const cropsDir = path.join(__dirname, 'public', 'images', 'crops');

if (!fs.existsSync(statesDir)) {
  fs.mkdirSync(statesDir, { recursive: true });
}

if (!fs.existsSync(cropsDir)) {
  fs.mkdirSync(cropsDir, { recursive: true });
}

// List of state images to download
const stateImages = [
  {
    name: 'punjab.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Amritsar_Punjab.jpg'
  },
  {
    name: 'westbengal.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Darjeeling_Tea_Garden.jpg'
  },
  {
    name: 'andhra.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Hyderabad_Charminar.jpg'
  },
  {
    name: 'bihar.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mahabodhi_Temple_Bodhgaya_Bihar.jpg'
  },
  {
    name: 'karnataka.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Bangalore_palace.jpg'
  },
  {
    name: 'rajasthan.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Jaipur_03-2016_05_Hawa_Mahal_-_Palace_of_Winds.jpg'
  },
  {
    name: 'maharashtra.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg'
  },
  {
    name: 'chhattisgarh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Chitrakote_Falls_in_Chhattisgarh.jpg'
  },
  {
    name: 'kerala.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Munnar_hillstation_kerala.jpg'
  },
  {
    name: 'gujarat.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Somnath_temple.jpg'
  }
];

// List of crop images to download
const cropImages = [
  {
    name: 'wheat.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Wheat_field.jpg'
  },
  {
    name: 'rice.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Paddy_field_in_Tamil_Nadu.jpg'
  },
  {
    name: 'cotton.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Cotton_field_kv19.jpg'
  },
  {
    name: 'sugarcane.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Sugarcane_field.jpg'
  },
  {
    name: 'jute.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Jute_Plants.jpg'
  },
  {
    name: 'tea.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tea_gardens_of_Chamraj%2C_at_Ooty.jpg'
  },
  {
    name: 'potato.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg'
  },
  {
    name: 'chili.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Red_chillies.jpg'
  },
  {
    name: 'tobacco.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Tobacco_Plants.jpg'
  },
  {
    name: 'maize.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Corncobs.jpg'
  },
  {
    name: 'pulses.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Mixed_Pulses.jpg'
  },
  {
    name: 'coffee.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg'
  },
  {
    name: 'spices.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Indian_Spices.jpg'
  },
  {
    name: 'rubber.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Latex_-_Hevea_brasiliensis.jpg'
  },
  {
    name: 'millet.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Pearl_millet_crop_3.JPG'
  },
  {
    name: 'barley.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Barley_field.jpg'
  },
  {
    name: 'oilseeds.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Mustard_Field_Germany.jpg'
  },
  {
    name: 'jowar.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Sorghum.jpg'
  },
  {
    name: 'groundnut.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Arachis_hypogaea_fruit.jpg'
  },
  {
    name: 'coconut.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Coconut_palm%2C_Belize.jpg'
  },
  {
    name: 'bajra.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Pearl_millet_crop_2.JPG'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {}); // Delete the file on error
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

// Download state images
async function downloadStateImages() {
  for (const image of stateImages) {
    try {
      await downloadImage(image.url, path.join(statesDir, image.name));
    } catch (error) {
      console.error(`Failed to download ${image.name}`);
    }
  }
}

// Download crop images
async function downloadCropImages() {
  for (const image of cropImages) {
    try {
      await downloadImage(image.url, path.join(cropsDir, image.name));
    } catch (error) {
      console.error(`Failed to download ${image.name}`);
    }
  }
}

// Run the downloads
async function run() {
  console.log('Starting image downloads...');
  await downloadStateImages();
  await downloadCropImages();
  console.log('All downloads completed!');
}

run(); 