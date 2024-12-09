const express = require('express');
const jobRoutes = require('./routes/job');
const db = require('./database/connection');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*',
  // origin: 'http://20.90.162.93', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
app.use(express.json());
app.use('/api', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});