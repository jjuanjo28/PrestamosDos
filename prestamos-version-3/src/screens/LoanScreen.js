import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { ButtonBlue, ButtonOrange } from "../components/Buttons";
import axios from "axios";
import { deleteLoan } from "../store/actions";
import { useNavigation } from "@react-navigation/native";

import {URI} from "../../assets/Uri"

const LoginScreen = () => {
  const [idPrestamo, setIdPrestamo] = useState(null);
  const [prestamo, setPrestamo] = useState(null);
  const loanList = useSelector((state) => state.auth.user.prestamos);
  const userId = useSelector((state)=> state.auth.user.id)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedIdPrestamo = await AsyncStorage.getItem("idPrestamo");
        console.log(storedIdPrestamo);
        if (storedIdPrestamo !== null) {
          setIdPrestamo(storedIdPrestamo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const capture = loanList.find((e) => e.id == idPrestamo);
    setPrestamo(capture);
  }, [idPrestamo]);

  const borrarPrestamo = async () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${URI}prestamos/${idPrestamo}`,
      headers: {},
    };
    const restponse = await axios(config);
    dispatch(deleteLoan(idPrestamo));
    navigation.navigate("LoanList");
  };

  

  const enviarMensaje = () => {
    console.log("deveria enviar Whatsapp")
  } 

  const productoDevuelto = () =>{
    console.log(prestamo)
    console.log("devo cambiar mi base y me estado")

  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Prestamo Seleccionado:</Text>

      {!prestamo ? (
        <Text>No hay Prestamo disponible</Text>
      ) : (
        <>
        <Text>soy el id del prestamo: {idPrestamo}</Text>
        <Text>soy el id del user: {prestamo.id_user}</Text>
        <Image
           source={{ uri: prestamo.foto }}
           style={styles.image} 
        />
        <Text>Estado del prestamo: {prestamo.devuelto != false ? "devuelto": "sin devolver" }</Text>
        <Text>fecha de vencimiento: {prestamo.fechaDevolucion}</Text>
        <Text>Prestado a: {prestamo.nombre}</Text>
        <Text>Teléfono: {prestamo.telefono}</Text>
        </>

      )}
      <ButtonBlue text={"Enviar Mensaje"} onPress={enviarMensaje} />
      <ButtonBlue text={"Producto Devuelto"} onPress={productoDevuelto} />
      <ButtonOrange text={"borrar Prestamo"} onPress={borrarPrestamo} />
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor:{
   alignItems:"center"
  },
 
  image: {
    marginTop:"15%",
    width: 300,
    height:300,
    borderRadius: 5,
   },
   titulo:{
    marginTop:10,
    fontSize:25
   },

});

export default LoginScreen;
