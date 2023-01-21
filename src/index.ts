import app from './app';
import connectDB from './connectDB';

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB()
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
