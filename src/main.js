const ruuvi = require('node-ruuvitag');
const fetch = require('node-fetch');

const CONFIG = require('../config.json');

ruuvi.on('found', (tag) => {
  console.log(`Found RuuviTag with id: ${tag.id}`);

  tag.on('updated', (data) => {
    console.log(`${tag.id}: ${JSON.stringify(data)}`);


    const body = { temperature: data.temperature, huminidy: data.huminidy, sensor_id: `${tag.id}` };

    fetch(CONFIG['api-url'], {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
