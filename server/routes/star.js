import { Router } from "express";
import pool from '../db.js'

const router = Router();


router.get("/", async (req, res) => {
   
    try {
        const stars = await pool.query("SELECT id, title, competence, situation, task, action, result, created_at, updated_at FROM stars");
        res.status(200).json(stars.rows)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:starId", async (req, res) => {
    const { starId } = req.params;

    // validations
    if (isNaN(starId)) {
        return res.status(400).json({ msg: "id need to be number", status: "error" })
    }

    try {
        const id = Number(starId)
        const stars = await pool.query("SELECT * FROM stars WHERE id = $1", [id]);
        if (stars.rows.length === 0){
            return res.status(404).json({msg: "the star not found", status:"error" })
        }
        res.status(200).json(stars.rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/", async (req, res) => {
    const { title, situation, task, action, result } = req.body;

    // validations
    if (!title || !situation || !task || !action || !result) {
        return res.status(400).json({ msg: "please provide mandatory fields", status: "error" })
    }


    try {
        const currentDate = new Date()
        const values = [title, situation, task, action, result, currentDate, currentDate]
        const star = await pool.query("INSERT INTO stars (title, situation, task, action, result, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", values)
        res.status(200).json(star.rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:starId", async (req, res) => {
    const { starId } = req.params;

    // validations
    if (isNaN(starId)) {
        return res.status(400).json({ msg: "id need to be number", status: "error" })
    }

    try {
        const id = Number(starId)
        const stars = await pool.query("DELETE FROM stars WHERE id = $1", [id]);
        res.status(202).json(stars.rows)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:starId", async (req, res) => {
    const { starId } = req.params
    const { title, situation, task, action, result } = req.body;

    // validations
    if (isNaN(starId)) {
        return res.status(400).json({ msg: "id need to be number", status: "error" })
    }

    try {
        let star = await pool.query("SELECT * FROM stars WHERE id = $1", [starId])
        star = star.rows[0]
        // creating values for updating the record
        const values = []
        values.push(title || star.title)
        values.push(situation || star.situation)
        values.push(task || star.task)
        values.push(action || star.action)
        values.push(result || star.result)
        values.push(new Date())
        values.push(starId)

        const updateStar = await pool.query("UPDATE stars SET title = $1, situation = $2, task = $3, action = $4, result = $5, updated_at = $6 WHERE id = $7 RETURNING *", values)
        res.status(200).json(updateStar.rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;