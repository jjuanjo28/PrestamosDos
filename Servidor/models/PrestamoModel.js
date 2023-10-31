import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PrestamoModel = db.define("presta", {
   
    fechaPrestamo: {type: DataTypes.DATEONLY},
    fechaDevolucion: {type: DataTypes.DATE},
   telefono: {type: DataTypes.STRING},
    nombre: {type: DataTypes.STRING},
   foto: {type: DataTypes.STRING},
   devuelto: {type: DataTypes.BOOLEAN},
   id_user: {type: DataTypes.NUMBER}
   
   
    
})

export default PrestamoModel