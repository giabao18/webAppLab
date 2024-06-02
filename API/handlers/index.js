import { find, findById, create, update, deleteById } from "../DB/queries.js";

export const getAllCourses = async (req, res) => {
    try {
        const courses = await find();
        return res.status(200).json({ courses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred" });
    }
};

export const getCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await findById(id);

        if (!course || course.length === 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ course });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Error occurred while retrieving the course" });
    }
};

export const createCourse = async (req, res) => {
    const {
        id,
        courseLevelId,
        name,
        nameVN,
        creditTheory,
        creditLab,
        description,
    } = req.body;

    if (
        !id ||
        !courseLevelId ||
        !name ||
        !nameVN ||
        isNaN(creditTheory) ||
        isNaN(creditLab)
    ) {
        return res.status(400).json({ message: "Invalid input parameters" });
    }

    try {
        const course = await create(
            id,
            courseLevelId,
            name,
            nameVN,
            creditTheory,
            creditLab,
            description
        );
        return res.status(201).json({ course });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Failed to create course", error: error.message });
    }
};

export const updateCourse = async (req, res) => { 
    const {
        courseLevelId,
        name,
        nameVN,
        creditTheory,
        creditLab,
        description,
    } = req.body;

    const { id } = req.params;

    if (
        !id ||
        !courseLevelId ||
        !name ||
        !nameVN ||
        isNaN(creditTheory) ||
        isNaN(creditLab)
    ) {
        return res.status(400).json({ message: "Invalid input parameters" });
    }

    try {
        const course = await update(
            courseLevelId,
            name,
            nameVN,
            creditTheory,
            creditLab,
            description,
            id
        );
        return res.status(201).json({ course });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Failed to update course", error: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    try {
        const result = await deleteById(id);

        if (!result) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Failed to delete course", error: error.message });
    }
};