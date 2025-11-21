import express from 'express';
const tetelRouter = express.Router();

// GET /api/tetel/:id
tetelRouter.get('/:razon',async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM tetel WHERE razon = ?');
        res.send("");
    } catch (err){
        res.status(501).send("Nem teljesitheto keres");
    }
});
// POST /api/pizza (nem megy)
tetelRouter.post('/', async (req, res) => {
    const { razon, pazon, db } = req.body;

    try {
        const [ered] = await pool.execute(
            'INSERT INTO tetel (pazon, db) VALUES (?, ?)',
            [pnev, par]
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
// PUT /api/tetel/:id
tetelRouter.put('/:razon', async (req,res) => {
    const tetelId = req.params.id;
    const {razon,pazon,db} = req.body;

    try{
        const [ered] = await pool.execute
        ('UPDATE tetel SET db = ?, pazon = ? WHERE id = ?',)[pazon,db];
        if(ered.affectedRows === 0)
        {
            return res.status(404).send("tétel nem talalhato");
        }
    }catch (err){
        res.status(501).send("Nem teljesíthető frissítés");
    }
});
// DELETE /api/pizza/:id
tetelRouter.delete('/:pazon',async (req,res) => {
    const tetelId = req.params.id;

    try{
        const [ered] = await pool.execute
        ('DELETE FROM pizza WHERE id = ?',[tetelId]);

        if(ered.affectedRows === 0)
        {
            return res.status(404).send('tétel nem található');
        }
        res.json({message: 'tétel törölve'});
    } catch (err) {
        res.status(501).send("Nem teljesíthető törlés");
    }
});

export default tetelRouter;