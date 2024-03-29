import express from "express";
import {getDBConnection} from "../db/index.js";
import { validator } from "../middlewares/validator.js"

 
export const TodosRouter = express.Router();
/* C.R.U.D. */

//CREATE
TodosRouter.get("/to-dos", async function (request, response) {
    try {
      const db = await getDBConnection();
  
      const todos = await db.all("SELECT * FROM todos");
  
      await db.close();
  
      response.send({ todos });
    } catch (error) {
      response.status(500).send({
        message: "Something went wrong trying to get to dos",
        error,
      });
    }
  });

//READ
TodosRouter.post(
    "/to-do",
    validator,
    async function (request, response) {
      try {
       console.log(request.body)
        const { title, description, is_done:is_done} = request.body;
        const db = await getDBConnection();
  
        const queryInfo = await db.run(`
          INSERT INTO todos (title, description, is_done)
          VALUES (
          
            '${title}',
            '${description}',
            ${is_done ? 1 : 0}
          )       `);
  
        await db.close();
            console.log(queryInfo);
        response.send({   id: queryInfo.lastID   });
      } catch (error) {
        console.error(error);
        response.status(500).send({
          message: "Something went wrong trying to create a new to do",
          error,
        });
      }
    }
  );

//UPDATE
TodosRouter.patch("/to-do/:id", async function (request, response) {
    try {
      const { id } = request.params;
      const db = await getDBConnection();
  
      const todoExists = await db.get(
        `SELECT * FROM todos WHERE id = ?`,
        id
      );
  
      if (!todoExists) {
        return response
          .status(404)
          .send({ message: "To Do Not Found" });
      }
  
      const { title, description, is_done} = request.body;
  
      await db.run(
        `UPDATE todos 
         SET title = ?, description = ?, is_done = ?
         WHERE id = ?
      `,
        title || todoExists.title,
        description || todoExists.description,
        is_done || todoExists.is_done,
        id
      );
  
      await db.close();
  
      response.send({ message: "To do updated" });
    } catch (error) {
      response.status(500).send({
        message: "Something went wrong trying to update a todo",
        error,
      });
    }
  });
//DELETE
TodosRouter.delete("/to-do/:id", async function (request, response) {
  try {
    const { id } = request.params;
    const db = await getDBConnection();

    const todoExists = await db.get(
      `SELECT * FROM todos WHERE id = ?`,
      id
    );
  
      if (!todoExists) {
        return response
          .status(404)
          .send({ message: "To Do Not Found" });
      }
  
      const deletionInfo = await db.run(
        `DELETE FROM todos WHERE id = ?`,
        id
      );
  
      await db.close();
  
      response.send({ deletionInfo });
    } catch (error) {
      response.status(500).send({
        message: "Something went wrong trying to delete a todo",
        error,
      });
    }
  });
