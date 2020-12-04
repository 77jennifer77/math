const express = require('express');
const cors = require('cors');
const port = process.env.SERVER_PORT || 8000
const app = express();
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));
