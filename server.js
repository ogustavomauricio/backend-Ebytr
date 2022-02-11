const express = require('express');
const routes = require('./src/routes/taskRouter');
const app = express();
app.use(express.json());

const port = process.env.PORT|| 5000

app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))