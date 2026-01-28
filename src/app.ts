import express, { Application } from 'express';

// create & start new express app
const app: Application = express();

app.listen(4000, () => { console.log('Express API running on port 4000') });