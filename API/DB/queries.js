import { pool } from "./index.js";

export const find = async () => {
    const QUERY = "SELECT * FROM course";
    try{
        const client = await pool.getConnection();
        const result = await client.query(QUERY);
        return result[0];
    } catch (error){
        console.log("Error occurred while finding all records", error);
        throw error;
    }
};

export const findById = async (id) => {
    const QUERY = "SELECT * FROM course WHERE id = ?";
    try{
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [id]);
        return result[0];
    } catch (error){
        console.log("Error occurred while finding one records by id", error);
        throw error;
    }
};

export const create = async (id, courseLevelId, name, nameVN, creditTheory, creditLab, description) => {
    const QUERY = `INSERT INTO course (id, course_level_id, name, name_vn, credit_theory, credit_lab, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [id, courseLevelId, name, nameVN, creditTheory, creditLab, description]);
        client.release();
        return result;
    } catch (error) {
        console.log("Error occurred while creating new record", error);
        throw error;
    }
};

export const update = async ( courseLevelId, name, nameVN, creditTheory, creditLab, description, id) => {
    const QUERY = `UPDATE course SET course_level_id = ?, name = ?, name_vn = ?, credit_theory = ?, credit_lab = ?, description = ? WHERE id = ?`;
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [courseLevelId, name, nameVN, creditTheory, creditLab, description, id]);
        client.release();
        return result[0];
    } catch (error) {
        console.log("Error occurred while updating the record", error);
        throw error;
    }
};

export const deleteById = async (id) => {
    const QUERY = `DELETE FROM course WHERE id = ?`;
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [id]);
        client.release();
        return result[0];
    } catch (error) {
        console.log("Error occurred while deleting the record", error);
        throw error;
    }
};