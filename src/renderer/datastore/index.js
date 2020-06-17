import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';
console.log(remote.app.getPath('userData'));
const db = {};
db.images = new Datastore({
  autoload: true,
  timestampData: true,
  filename: path.join(remote.app.getPath('userData'), '/images.db'),
});
export default db;
