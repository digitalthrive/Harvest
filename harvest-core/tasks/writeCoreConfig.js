import fs from 'fs';
import coreConfig from '../config/config';

export default function(config, cb) {
  fs.writeFile(coreConfig.files.harvestConf, JSON.stringify(config, null, 2), (err) => {
    cb(err, true);
  });
};
