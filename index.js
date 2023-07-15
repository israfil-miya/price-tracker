import os from 'os';
import pkg from 'mongodb';
import { fileURLToPath } from 'url'
import connectToDatabase from './db.js';
import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';
import checkAndUpdateItem from './item.js';

const { ObjectId } = pkg;
const __filename = fileURLToPath(import.meta.url)

const runPriceTracking = async (db, items) => {
  try {
    for (const item of items) {
      await checkAndUpdateItem(db, new ObjectId(Buffer.from(item._id.id).toString('hex')).toString());
    }
  } catch (error) {
    console.error(`Error running price tracking: ${error.message}`);
    // Add error handling and recovery mechanism here if desired
  }
};

const startPriceTracking = async () => {
  try {
    const db = await connectToDatabase();

    let batchSize = parseInt(process.env.BATCH_SIZE);
    
    let skip = 0;
    
    while (true) {
      const items = await db.Item.find().skip(skip).limit(batchSize).lean();

      if (items.length === 0) {
        if (!skip) console.log('No items found for price tracking');
        else {
          skip = 0
          console.log('No more items found in this batch for price tracking');
        }
        continue
      }

      const numThreads = Math.min(items.length, os.cpus().length);
      const itemsPerThread = Math.ceil(items.length / numThreads);

      console.log(`Starting price tracking for ${items.length} items using ${numThreads} threads...`);

      const workers = [];

      for (let i = 0; i < numThreads; i++) {
        const start = i * itemsPerThread;
        const end = start + itemsPerThread;
        const threadItems = items.slice(start, end);

        const worker = new Worker(__filename, { workerData: threadItems });
        workers.push(worker);

        worker.on('exit', (code) => {
          if (code !== 0) {
            console.error(`Price tracking worker stopped with exit code ${code}`);
          }
        });
      }

      console.log('Price tracking workers started');

      await Promise.all(workers.map((worker) => new Promise((resolve, reject) => {
        worker.on('message', resolve);
        worker.on('error', reject);
      })));

      skip += batchSize;
      console.log('Price tracking workers completed');

      await new Promise((resolve) => setTimeout(resolve, parseInt(process.env.INTERVAL_TIME_IN_MS)));
    }
  } catch (error) {
    console.error(`Error starting price tracking: ${error.message}`);
    // Add error handling and recovery mechanism here if desired
  }
};

if (isMainThread) {
  startPriceTracking().catch((error) => {
    console.error(`Error in main thread: ${error.message}`);
    // Add error handling and recovery mechanism here if desired
  });
} else {
  const threadItems = workerData;
  const db = await connectToDatabase();
  await runPriceTracking(db, threadItems);
  parentPort.postMessage('Worker completed');
}
