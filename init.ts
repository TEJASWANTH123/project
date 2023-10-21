// src/init-user-db.ts (Database Initialization)

import User from './models/user'; // Import your User model
import { connect } from './config/db'; // Import the 'connect' function from the correct location

// Database Initialization
async function initializeDatabase() {
  const db = await connect();

  // Create the "tasks" table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT
    )
  `);

  // Run User model sync() to create the "users" table if it doesn't exist
  await User.sync();

  console.log('Database initialized with "tasks" and "users" tables.');
}

// Run Database Initialization
initializeDatabase();
