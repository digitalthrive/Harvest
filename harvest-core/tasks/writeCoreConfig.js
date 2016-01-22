import fs from 'fs';

export default function(config, cb) {
  fs.writeFile('harvest.json', JSON.stringify(config, null, 2), (err) => {
    cb(err, true);
  });
}
