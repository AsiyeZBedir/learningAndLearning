const express = require('express');
const app = express();

// Router nesnesini ana uygulamaya bağlama
app.use('/blog', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
