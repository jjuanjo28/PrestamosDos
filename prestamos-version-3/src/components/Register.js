import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, AddUser, logout} from '../store/actions';
import axios from 'axios';
import {ButtonBlue} from "../components/Buttons"
import { useNavigation } from '@react-navigation/native';
import {URI} from "../../assets/Uri"


const Register = () => {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
getUsers()
}, []);
useEffect(() => {
console.log("users:",users.length)
}, [users])

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URI}users/`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }
 
 
   const createUser = () => {

     if(users.some((e) => e.email == email)){
       alert("el email utilizado ya esta en nuestra base de usuarios")
       navigation.navigate("LoginScreen")
      }
      if(users.some((e) => e.usuario == username)){
           alert("el nombre de usuario ya esta en uso, por favor eliga otro")
      }
      let newUser = {
          nombre: name,
          apellido: apellido,
          email: email,
          usuario: username,
          password: password,
          id:users[users.length - 1].id+1
          }

      if(!users.some((e) => e.email == email) && !users.some((e) => e.usuario == username)){
        console.log("soy el nuevo usuario crado:",newUser)
        
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${URI}users/`,
      
          headers: {
            "Content-Type": "application/json",
          },
          data: newUser,
        };
        console.log(users)
        console.log("numero de Id:",users[users.length - 1].id+1)

        axios
          .request(config)
          .then((response) => {
            getUsers()
            
            console.log(JSON.stringify(response.data));
            setUsers([...users, newUser])
            dispatch(login(newUser))
            dispatch(logout());
            
       
          })
          .catch((error) => {
            console.log("soy este error:",error);
          });
     
      }
   }

  return (
    <View style={styles.principal}>
    <Text style={styles.titulo}>Registro de nuevo Usuario</Text>
   
    <View style={{flexDirection:"column",alignItems:"center", padding:"10"}}>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} alt="No hay imagen"/>
      
      
      <View style={styles.contenedor}>

      <Text>Nombre:   </Text>
      <TextInput
        style={styles.inputs}
        value={name}
        onChangeText={setName}
      />
      </View>

      <View style={styles.contenedor}>

      <Text>Apellido:   </Text>
      <TextInput
        style={styles.inputs}
        value={apellido}
        onChangeText={setApellido}
      />
      </View>

      <View style={styles.contenedor}>

      <Text>Email:   </Text>
      <TextInput
        style={styles.inputs}
        value={email}
        onChangeText={setEmail}
      />
      </View>

      <View style={styles.contenedor}>

<Text>UserName:   </Text>
<TextInput
  style={styles.inputs}
  value={username}
  onChangeText={setUsername}
/>
</View>

<View style={styles.contenedor}>

<Text>Password:   </Text>
<TextInput
  style={styles.inputs}
  secureTextEntry
  value={password}
  onChangeText={setPassword}
/>
</View>
      <View style={{marginTop:"10%"}}>
      <ButtonBlue text="Crear Nuevo Usuario" onPress={createUser} />
      </View>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  titulo:{
    marginTop:"10%",
   fontSize:25
  },
  contenedor:{
  flexDirection:"row",
  alignItems: "center",
  padding:"10",
  margin:"2%",
  
 },
  inputs: {
    backgroundColor:"white",
    width:"50%",
    height:"100%",
    
   },
  container: {
    marginTop:"5%",
    borderRadius: 10,
    width:"75%",
    backgroundColor: "#fff",
    
  },
  logo:{
    marginTop:"10%",
    margin:"5%",
    marginBottom:"10%",
    width:220,
    height:220,
    alignItems:"center",
  },

  principal:{
    alignItems:"center",
    fontWeight:"bold",
    backgroundColor:"#000",
    padding:10,
    height:"100%"

  },

  container: {
    flex:1,
    marginTop:"5%",
    borderRadius: 10,
    width:"75%",
    height:"85%",
    backgroundColor: "#fff",
    
  },
})
export default Register;