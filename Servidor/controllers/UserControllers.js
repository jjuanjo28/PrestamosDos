import UserModel from "../models/UserModel.js";


// mostrar Todos los user

export const getAllUsers = async (req, res) => {
    try {
      const user = await UserModel.findAll();
      res.json(user);
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
  // mostrar un user
  
  export const getUser = async (req, res) => {
    try {
      const user = await UserModel.findAll({
        where: {
          id: req.params.id,
        },
      });
       res.json(user[0]);
         } catch (error) {
      res.json({ message: error.message });
    }
  };
  
  // crear un nuevo user
  
  export const createUser = async (req, res) => {
    try {
      await UserModel.create(req.body);
      res.json({
        message: "Usuario Creado Correctamente",
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
  // actualizar un user
  
  export const editUser = async (req, res) => {
    try {
      await UserModel.update(req.body, {
        where: { id: req.params.id },
      });
      res.json({
        message: "Usuario Editado Correctamente",
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
  // eliminar un user
  
  export const deleteUser = async (req, res) => {
    try {
      await UserModel.destroy(
        {
        where: { id: req.params.id },
      }
      );
      res.json({
        message: "Usuario Eliminado",
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
