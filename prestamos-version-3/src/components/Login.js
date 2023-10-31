import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, AddUser } from '../store/actions';
import axios from 'axios';
import {ButtonBlue} from "../components/Buttons"
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"


import {URI} from "../../assets/Uri"

// uri de casa modificar
// let URI = "http://192.168.0.10:8100/";
// web 397380081397-pspet739skdprs97fvn8siisvf1e05bu.apps.googleusercontent.com
// ios 397380081397-8o46sk3iqm5ags7b96hjdh7vht4fkje2.apps.googleusercontent.com
// android 397380081397-aj1pkpjuhkeirmgijnorlhl02vslvjj4.apps.googleusercontent.com
 WebBrowser.maybeCompleteAuthSession()

const Login = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
     expoClientId:"397380081397-ifqt75gq6ko1s5o6pe5u51mmgg2ja5gu.apps.googleusercontent.com",
     androidClientId:"397380081397-ifqt75gq6ko1s5o6pe5u51mmgg2ja5gu.apps.googleusercontent.com",
     iosClientId:"397380081397-8o46sk3iqm5ags7b96hjdh7vht4fkje2.apps.googleusercontent.com",
     webClientId:"397380081397-n5dn2ta1nhtipl2m2ub6enjvkdtm5gf2.apps.googleusercontent.com",
  });

  const [accessTocken, setAccessTocken] = useState(null)
  const [googleUser, setGoogleUser] = useState(null)
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const navigation = useNavigation()

  useEffect(() => {
   getUsers();
   if(response?.type  === "success"){
    setAccessTocken(response.authentication.accessToken)
    accessTocken && signInWithGoogle()
  }
  }, []);

  useEffect(() => {

    if(response?.type  === "success"){
      setAccessTocken(response.authentication.accessToken)
      accessTocken && signInWithGoogle()
    }
    
  }, [accessTocken, response])
  
  useEffect(() => {
   if(googleUser != null){
     recuperoUser()
   }
  }, [googleUser])

  

  const signInWithGoogle = async () => {
    console.log("soy el tocken:",accessTocken)
     let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
      headers:{
        Authorization:`Bearer${accessTocken}` 
      }
     })
     let userInfo = await response.json();
     setGoogleUser(userInfo)  
     console.log("soy la response.data:", response.data)
  
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URI}users/`);
      
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  }

  const getPrestamos = async (id) => {
    try {
      const response = await axios.get(`${URI}prestamos/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener préstamos:', error);
      return [];
    }
  }
  const recuperoUser = async () => {
    if(users.some((user) => user.email == googleUser.email)){
      const guardaUser = users.find((user) => user.email == googleUser.email);
      console.log("encontre un user", users)
      if (guardaUser) {
        try {
          const prestamos = await getPrestamos(guardaUser.id);
          console.log("prestamos:",prestamos)
          let newUser = {
            nombre: guardaUser.nombre,
            apellido: guardaUser.apellido,
            email: guardaUser.email,
            id: guardaUser.id,
            usuario: guardaUser.usuario,
            prestamos: prestamos
          }

          dispatch(login(newUser));
        } catch (error) {
          console.error('Error al obtener préstamos:', error);
        }
        
      }
    } else {
      console.log("no esta en la lista de usuarios", googleUser)
      
      let newUser = {
        nombre: googleUser.name,
        apellido: googleUser.family_name,
        email: googleUser.email,
        usuario: googleUser.name,
        password: "123456",
        }
        carga(newUser)
        
    
      console.log("soy el nuevo usuario crado:",newUser)
      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: `${URI}users/`,
    
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: newUser,
      // };
      // axios
      //   .request(config)
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //     dispatch(AddUser(newUser))
      //     navigation.navigate("LoginScreen")
      //   console.log("aca corte")
      //   })
      //   .catch((error) => {
      //     console.log("soy este error:",error);
      //   });
   
    }
    }
    const carga = (newUser) =>{
      dispatch(AddUser(newUser))
      console.log("ahi lo despache")
    }

  const handleLogin = async () => {
    getUsers();
    const userName = username;
    const pass = password;

    if (users.some((user) => user.usuario == userName)) {
      const user = users.find((user) => user.usuario == userName && user.password == pass);

      if (user) {
        try {
          const prestamos = await getPrestamos(user.id);

          let newUser = {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            id: user.id,
            usuario: user.usuario,
            prestamos: prestamos
          }

          dispatch(login(newUser));
        } catch (error) {
          console.error('Error al obtener préstamos:', error);
        }
      } else {
        alert("La contraseña ingresada no es correcta");
      }
    } else {
      alert("El usuario ingresado no existe");
    }
  };

  const  createUser = () => {
    navigation.navigate("RegisterScreen");
  }

  

  return (
    <View style={styles.principal}>
   
    <Text style={styles.titulo}>Bienvenido a LoanAppRemainder</Text>
    {user ? 
    <View style={{flexDirection:"column",alignItems:"center", padding:"10"}}>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} alt="No hay imagen"/>
      
      
      <View style={styles.contenedor}>

      <Text style={{color:"white"}}>Usuario:   </Text>
      <TextInput
        style={styles.inputs}
        value={username}
        onChangeText={setUsername}
      />
      </View>

      <View style={styles.contenedor}>

      <Text style={{color:"white"}} >Contraseña:   </Text>
      <TextInput
        style={styles.inputs}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      </View>
      <View style={{marginTop:"5%"}}>
      <ButtonBlue text="Iniciar Sesión" onPress={handleLogin} />
      <TouchableOpacity onPress={promptAsync}>
        <View style={styles.autoLogin}>
          <Text style={{color:"white"}}>Logeate con Google</Text>
          <Image style={styles.buttonGoogle} source={require("../../assets/png-transparent-google-logo-google-text-trademark-logo.png")} alt="No hay imagen"/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.autoLogin}>
          <Text style={{color:"white"}}>Logeate con Facebook</Text>
          <Image style={styles.buttonGoogle} source={require("../../assets/png-transparent-facebook-fb-logo-social-media-social-media-flat-icon.png")} alt="No hay imagen"/>
        </View>
      </TouchableOpacity>
      <ButtonBlue text="Crear nuevo Ususario" onPress={createUser} />
      </View>
      </View>
      : 
      <View style={styles.container}>
           <Text> Bienvenido usuario :</Text>
           <Text>aca deberia estar el nombre:{user.nombre}</Text>
          <Text>{user.usuario}</Text>
          <Text>Ya puedes hacer uso de la Aplicacion</Text>
      </View>   
      
    }
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGoogle:{
   height: "180%",
   width: "12%"
  },
  buttonFacebook:{

  },

  autoLogin:{ 
  position:"relative",  
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-around",



  
  borderRadius: 10,
  paddingVertical: 15,
  width:300,
  margin:5,
  backgroundColor: "blue",
  borderRadius: 10      
},
  titulo:{
    marginTop:"5%",
   fontSize:20,
   color:"yellow"
  },
  contenedor:{
  flexDirection:"row",
  alignItems: "center",
  padding:"10",
  margin:"5%",
  
 },
  inputs: {
    backgroundColor:"white",
    width:"50%",
    height:"100%",
    
   },
  container: {
    marginTop:"15%",
    borderRadius: 10,
    width:"75%",
    backgroundColor: "#fff",
    
  },
  logo:{
    marginTop:"10%",
    margin:"5%",
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
    marginTop:"15%",
    borderRadius: 10,
    width:"75%",
    height:"85%",
    backgroundColor: "#fff",
    
  },
})
export default Login;
