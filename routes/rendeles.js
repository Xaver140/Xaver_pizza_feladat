import express from 'express';
const rendelesRouter = express.Router();

// GET /api/rendeles ÖSSZEGGEL!!!!
// !!!!!!!
rendelesRouter.get('/',async (req,res) => {
    const [rows] = await pool.query('SELECT * FROM rendeles');
    res.json(rows);

});
// GET /api/rendeles/:id
rendelesRouter.get('/:razon',async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM rendeles WHERE razon = ?');
        res.send("");
    } catch (err){
        res.status(501).send("Nem teljesitheto keres");
    }
});
// POST /api/rendeles
rendelesRouter.post('/', async (req,res) => {
    const {razon,vazon,fazon,idopont} = req.body;

    try{
        const [ered] = await pool.execute
        ('INSERT INTO rendeles (vazon,fazon,idopont) VALUES (?,?,?)',[vazon,fazon,idopont])
        res.status(201).json({
            razon: ered.insertId,
            vazon,
            fazon
        });
    } catch (err){
        res.status(501).send("Nem teljesitheto beszuras");
    }
});
// DELETE /api/rendeles/:id
rendelesRouter.delete('/:razon',async (req,res) => {
    const rendelesId = req.params.id;

    try{
        const [ered] = await pool.execute
        ('DELETE FROM rendeles WHERE id = ?',[rendelesId]);

        if(ered.affectedRows === 0)
        {
            return res.status(404).send("rendelés nem található");
        }
        res.json({message: 'rendelés törölve'});
    } catch (err) {
        res.status(501).send("Nem teljesíthető törlés");
    }
});
export default rendelesRouter;