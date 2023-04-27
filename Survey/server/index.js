//Mustafa SEYREK 27.04.2023

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const surveyRoutes = require('./routes/surveys');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }))

//yönlendirmeler
app.use('/api/users/', userRoutes);
app.use('/api/surveys/', surveyRoutes);

//veritabanı bağlantısı
mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database connection"))
    .catch(er => console.log("Database connection error: ", er))

app.listen(PORT, () => {
    console.log('server running on port: ', PORT)
});
