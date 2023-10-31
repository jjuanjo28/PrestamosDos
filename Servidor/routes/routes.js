import express from "express"
import { getAllPrestamos, createPrestamo, editPrestamo, deletePrestamo, getOnePrestamo, getPrestamosUser } from "../controllers/PrestamoControllers.js"
import { getAllUsers, getUser, createUser, editUser, deleteUser } from "../controllers/UserControllers.js"

const router = express.Router()

router.get("/users", getAllUsers)
router.get("/user/:id", getUser)
router.post("/users", createUser)
router.put("/user/:id", editUser)
router.delete("/user/:id", deleteUser)


router.get("/prestamos/", getAllPrestamos)
router.get("/prestamos/user/:id", getPrestamosUser)
router.get("/prestamo/:id", getOnePrestamo)
router.post("/prestamos/:id", createPrestamo)
router.put("/prestamo/:id", editPrestamo)
router.delete("/prestamos/:id", deletePrestamo)

export default router