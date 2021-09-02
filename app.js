const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000
var users = require('./api/users')
const { handleError, AppError } = require('./helpers/errors')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test_user');
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', users)



app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  handleError(err, res);
});


app.get('/', (req, res) => {
  res.status(200).json({hello : "hello"})
})





app.use((err, req, res, next) => {
  handleError(err, res);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})