import { Router } from "express";
import { check } from "express-validator";
import { createTask, getTasks, updateTask, deleteTask } from "./tareas.controller.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { existeTareaById } from "../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    createTask
)

router.get(
    "/",
    getTasks
)

router.put(
    "/:id",
    updateTask
)

router.delete(
    "/:id",
    deleteTask
)

export default router