import { Router } from "express";
import { getAllCourses, getCourse, createCourse, deleteCourse, updateCourse } from "../handlers/index.js";

const appRouter = Router();

appRouter.get("/", getAllCourses)
appRouter.get("/:id", getCourse)
appRouter.post("/create", createCourse)
appRouter.put("/update/:id",updateCourse)
appRouter.delete("/delete/:id", deleteCourse)

export default appRouter;