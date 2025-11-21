import express from 'express';
import futarRouter from './routes/futar.js';
import pizzaRouter from './routes/pizza.js';
import rendelesRouter from './routes/rendeles.js';
import vevoRouter from './routes/vevo.js';
import tetelRouter from './routes/tetel.js';

const app = express();
app.use(express.json());
import cors from 'cors';
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

app.use('/api/futar', futarRouter);
app.use('/api/pizza', pizzaRouter);
app.use('/api/vevo', vevoRouter);
app.use('/api/tetel', tetelRouter);
app.use('/api/rendeles', rendelesRouter);


app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000");
});