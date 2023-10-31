import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UserModel = db.define("user", {
   
    nombre: {type: DataTypes.STRING},
    apellido: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    usuario: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
   
    
})

export default UserModel