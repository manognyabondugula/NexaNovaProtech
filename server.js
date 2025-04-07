const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const trainerRoutes = require('./routes/trainerRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', trainerRoutes);
app.use('/api', subjectRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
