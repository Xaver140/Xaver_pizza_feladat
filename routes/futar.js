import express from 'express';
import pool from '../tabla.js';
const futarRouter = express.Router();
// GET /api/futar
futarRouter.get('/',async (req,res) => {
    const [rows] = await pool.query('SELECT * FROM futar');
    res.json(rows);

});
// GET /api/futar/:id
futarRouter.get('/:fazon',async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM futar WHERE fazon = ?');
        res.send("");
    } catch (err){
        res.status(501).send("Nem teljesitheto keres");
    }
});
// POST /api/futar
futarRouter.post('/', async (req,res) => {
    const {fazon,fnev,ftel} = req.body;

    try{
        const [ered] = await pool.execute
        ('INSERT INTO futar (fnev,ftel) VALUES (?,?)',[fnev,ftel])
        res.status(201).json({
            fazon: ered.insertId,
            fnev,
            ftel
        });
    } catch (err){
        res.status(501).send("Nem teljesitheto beszuras");
    }
});
// PUT /api/futar/:id
futarRouter.put('/:fazon', async (req,res) => {
    const futarId = req.params.id;
    const {fazon,fnev,ftel} = req.body;

    try{
        const [ered] = await pool.execute
        ('UPDATE futar SET fnev = ?, ftel = ? WHERE id = ?',)[fnev,ftel];
        if(ered.affectedRows === 0)
        {
            return res.status(404).send("futar nem talalhato");
        }
    }catch (err){
        res.status(501).send("Nem teljesíthető frissítés");
    }
}); 
// DELETE /api/futar/:id
futarRouter.delete('/:fazon',async (req,res) => {
    const futarId = req.params.id;

    try{
        const [ered] = await pool.execute
        ('DELETE FROM futar WHERE id = ?',[futarId]);

        if(ered.affectedRows === 0)
        {
            return res.status(404).send("futár nem található");
        }
        res.json({message: 'futár törölve'});
    } catch (err) {
        res.status(501).send("Nem teljesíthető törlés");
    }
});

export default futarRouter;