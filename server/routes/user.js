import { Router } from "express";
import { Pool } from "pg";

const router = Router();

// current user detail
router.get("/", async (req, res) => {
	res.send("users info")
})

// signup
router.post("/register", async (req, res) => {
	res.send("new user added")

})



export default router;
