/*
 * Task: writeCoreConfig
 * Writes our Harvest configuration for later use
 */

// Core libraries
import fs from 'fs';
import coreConfig from '../config/config';

/*
 * default
 * Public method writes our Harvest config
 * @params: config (object) - config from the CLI prompts
 * @params: cb     (function) - callback for async
 */
export default function(config, cb) {
  fs.writeFile(coreConfig.files.harvestConf, JSON.stringify(config, null, 2), (err) => {
    cb(err, true);
  });
};
