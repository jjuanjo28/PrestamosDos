

import prestamoModel from "../models/PrestamoModel.js"


// mostar Todas las Tareas de la base de usuario usuario

export const getAllPrestamos = async (req, res) => {
    
    try {
        const prestamoTest = await prestamoModel.findAll()
        res.json(prestamoTest);
     
    } catch (error) {
        res.json({ message: error.message });
    }
  };
    
    // crear un nuevo Prestamo
    
    export const createPrestamo = async (req, res) => {
      try {
        await prestamoModel.create(req.body);
        
        res.json({
          message: "Prestamo Creado Correctamente",
        });
      } catch (error) {
      
        res.json({ message: error.message });
      }
    };

    // Mostrar un Prestamo

    export const getOnePrestamo = async (req, res) => {
      try {
        const prestamo = await prestamoModel.findAll({
          where: {
            id: req.params.id,
          },
        });
         res.json(prestamo);
           } catch (error) {
        res.json({ message: error.message });
      }
    }
    
    export const getPrestamosUser = async (req, res) => {
      try {
        console.log("aca me requirio<<<<<<<<<<<<<---------------------")
        const prestamo = await prestamoModel.findAll({
          where: {
            id_user: req.params.id,
          },
        });
         res.json(prestamo);
           } catch (error) {
        res.json({ message: error.message });
      }
    }
    
    // actualizar un Prestamo
    
    export const editPrestamo = async (req, res) => {
      try {
        await prestamoModel.update(req.body, {
          where: { id: req.params.id }, 
        });
        res.json({
          message: "Prestamo Editado Correctamente",
        });
      } catch (error) {
        res.json({ message: error.message });
      }
    };
    
    // eliminar un Prestamo
    
    export const deletePrestamo = async (req, res) => {
      try {
        await prestamoModel.destroy({
          where: { id: req.params.id },
        });
        res.json({
          message: "Prestamo Eliminado",
        });
      } catch (error) {
        res.json({ message: error.message });
      }
    };
    

