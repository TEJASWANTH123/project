import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function connect() {
    return open({
        filename: './mydatabase.sqlite', // Change to your preferred database file name
        driver: sqlite3.Database,
    });
}

export { connect };