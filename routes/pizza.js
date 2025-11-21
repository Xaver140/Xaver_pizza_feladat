import express from 'express';
import pool from '../tabla.js';
const pizzaRouter = express.Router();
// GET /api/pizza
pizzaRouter.get('/',async (req,res) => {
    const [rows] = await pool.query('SELECT * FROM pizza');
    res.json(rows);

});
// GET /api/pizza/:id
pizzaRouter.get('/:pazon',async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM pizza WHERE pazon = ?');
        res.send("");
    } catch (err){
        res.status(501).send("Nem teljesitheto keres");
    }
});
// POST /api/pizza
pizzaRouter.post('/', async (req, res) => {
    const { pazon, pnev, par } = req.body;

    try {
        const [ered] = await pool.execute(
            'INSERT INTO pizza (pnev, par) VALUES (?, ?)',
            [pazon, pnev, par]
        );

        res.status(201).json({
            pazon: ered.insertId,
            pnev,
            par
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// PUT /api/pizza/:id
pizzaRouter.put('/:pazon', async (req,res) => {
    const pizzaId = req.params.id;
    const {pazon,pnev,par} = req.body;

    try{
        const [ered] = await pool.execute
        ('UPDATE pizza SET pnev = ?, par = ? WHERE id = ?',)[pnev,par];
        if(ered.affectedRows === 0)
        {
            return res.status(404).send("pizza nem talalhato");
        }
    }catch (err){
        res.status(501).send("Nem teljesíthető frissítés");
    }
});
// DELETE /api/pizza/:id
pizzaRouter.delete('/:pazon',async (req,res) => {
    const pizzaId = req.params.id;

    try{
        const [ered] = await pool.execute
        ('DELETE FROM pizza WHERE id = ?',[pizzaId]);

        if(ered.affectedRows === 0)
        {
            return res.status(404).send('pizza nem található');
        }
        res.json({message: 'pizza törölve'});
    } catch (err) {
        res.status(501).send("Nem teljesíthető törlés");
    }
});

export default pizzaRouter;