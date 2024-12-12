const express = require('express');
const jobRoutes = require('./routes/job');
const loginRoutes = require('./routes/login');
const db = require('./database/connection');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
app.use(express.json());
app.use('/api', jobRoutes);
app.use('/api', loginRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});