const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const MySQLEvents = require('mysql-events');

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
};

const watchDB = process.env.WATCH_DB;
const watchTABLE = process.env.WATCH_TABLE;

const mysqlEventWatcher = MySQLEvents(config);

const watcher = mysqlEventWatcher.add(
  `${watchDB}.${watchTABLE}`,
  (oldRow, newRow, event) => {
    //row inserted
    if (oldRow === null) {
      console.log('=================== Row Added ==================');
      console.log(newRow);
      console.log('================================================');
    }

    //row deleted
    if (newRow === null) {
      console.log('================== Row Deleted =================');
      console.log(oldRow);
      console.log('================================================');
    }

    //row updated
    if (oldRow !== null && newRow !== null) {
      console.log('================== Row Updated =================');
      console.log(newRow);
      console.log('================================================');
    }
  },
  'refresh'
);

console.log(`
=========================================================================================================
=========================================================================================================
================================ Watching MySQL changes on Table ${watchTABLE} ====================================
=========================================================================================================
=========================================================================================================
`);
