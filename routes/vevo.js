import express from 'express';
const vevoRouter = express.Router();
//GET /api/vevo
rendelesRouter.get('/',async (req,res) => {
    const [rows] = await pool.query('SELECT * FROM vevo');
    res.json(rows);

});
// GET /api/vevo/:id
vevoRouter.get('/:vazon',async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM vevo WHERE vazon = ?');
        res.send("");
    } catch (err){
        res.status(501).send("Nem teljesitheto keres");
    }
});
// POST /api/vevo
vevoRouter.post('/', async (req,res) => {
    const {razon,vazon,fazon,idopont} = req.body;

    try{
        const [ered] = await pool.execute
        ('INSERT INTO vevo (vnev,vcim) VALUES (?,?)',[vnev,vcim])
        res.status(201).json({
            vazon: ered.insertId,
            nvev,
            vcim
        });
    } catch (err){
        res.status(501).send("Nem teljesitheto beszuras");
    }
});
vevoRouter.put('/:vazon', async (req,res) => {
    const vevoId = req.params.id;
    const {vazon,vnev,vcim} = req.body;

    try{
        const [ered] = await pool.execute
        ('UPDATE vevo SET vnev = ?, vcim = ? WHERE id = ?',)[vnev,vcim];
        if(ered.affectedRows === 0)
        {
            return res.status(404).send("futar nem talalhato");
        }
    }catch (err){
        res.status(501).send("Nem teljesíthető frissítés");
    }
}); 
// DELETE /api/rendeles/:id
vevoRouter.delete('/:vazon',async (req,res) => {
    const vevoId = req.params.id;

    try{
        const [ered] = await pool.execute
        ('DELETE FROM vevo WHERE id = ?',[vevoId]);

        if(ered.affectedRows === 0)
        {
            return res.status(404).send("vevő nem található");
        }
        res.json({message: 'vevő törölve'});
    } catch (err) {
        res.status(501).send("Nem teljesíthető törlés");
    }
});
export default vevoRouter;