import { Router } from "express";
import { check } from "express-validator";
import { createTask, getTasks, updateTask, deleteTask } from "./tareas.controller.js";
import { validateFields } from "../middlewares/validar-campos.js";
import { existeTareaById } from "../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre","Name is required").not().isEmpty(),
        check("descripcion","Description is required").not().isEmpty(),
        check("fechaInicio", "Start date is required").not().isEmpty(),
        check("fechaCierre", "End date is required").not().isEmpty(),
        check("nombreResponsable", "Name of the responsible is required").not().isEmpty(),
        validateFields
    ],
    createTask
);

router.get(
    "/",
    getTasks
)

router.put(
    "/:id",
    [
        check("id").isMongoId(),
        check("id").custom(existeTareaById)
    ],
    updateTask
)

router.delete(
    "/:id",
    [
        check("id").isMongoId(),
        check("id").custom(existeTareaById)
    ],
    deleteTask
)

export default router