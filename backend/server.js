const express = require('express')
const app = express();
const PORT = 5000;
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./api/auth/routes/authRouter');
const cookies = require('cookie-parser');
const userRouter = require('./api/users/routes/userRouter')
app.use(express.json());
app.use(errorHandler);
app.use(cookies());
app.use(cors({
    origin: 'http://localhost:3000', // El dominio del frontend
        credentials: true, // Permitir el envío de cookies
}))
app.use(express.urlencoded({ extended: true }));
app.use('/api/authUser',authRouter);
app.use('/api/users',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})