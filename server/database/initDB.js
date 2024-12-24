import { createReadStream } from 'fs';
import dotenv from 'dotenv';
import fastcsv from 'fast-csv';
import mongoose from 'mongoose';
import User from '../model/userModel.js';
import connectDB from './connection.js';

dotenv.config({ path: 'config.env' });

async function importCSV () {
  try {
    await connectDB();

    const csvData = [];
    const csvFile = 'server/database/Gesamt_Vornamen.csv';

    createReadStream(csvFile)
      .pipe(fastcsv.parse({ headers: true, delimiter: ';' }))
      .on('data', (data) => {
        csvData.push(data);
        console.log('Parsed Data:', data);
      })
      .on('end', async () => {
        try {
          const insertedData = await User.insertMany(csvData);
          console.log(`${insertedData.length} inserted documents`);
          await mongoose.disconnect();
        } catch (err) {
          console.error('Error:', err);
        }
      });
  } catch (err) {
    console.error('Error:', err);
  }
}

importCSV();
