
const express = require('express');
const app = express();
const jobRoutes = require('./routes/job');
const db = require('./database/connection');

app.use(express.json());

// Use the job routes
app.use('/api', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});