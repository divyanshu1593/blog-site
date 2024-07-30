/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const app = express();
const staticDir = path.join(__dirname, 'static');
app.use(express.static(staticDir));

app.listen(4000);
