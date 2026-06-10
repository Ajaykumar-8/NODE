let app = require('./app.js');
let dotenv = require('dotenv');

dotenv.config();

app.listen(3001, "localhost", (err) => {
  if (err) {
    console.log('Error in starting app:', err);

  } else {
    console.log(`app started at ${process.env.PORT}`);
  }
});