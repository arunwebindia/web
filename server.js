const dotEnv = require('dotenv');
const app = require('./src/app');

dotEnv.config();
const PORT = process.env.PORT_NUMBER || 3000;

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))