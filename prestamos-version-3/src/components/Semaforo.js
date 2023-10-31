import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import boton_verde from "../../assets/Boton_Verde.png";
import boton_rojo from "../../assets/Boton_Rojo.png";
const Semaforo = ({ item }) => {
  const [fechaDevolucion, SetFechaDevolucion] = useState(item.fechaDevolucion);
  const [actualDate, setActualDate] = useState(new Date());
  const [vencido, setVencido] = useState(false);

  useEffect(() => {
      if (Date.parse(actualDate) < Date.parse(fechaDevolucion)) {
          setVencido(!vencido)
      } 
  }, [])
  return (
    <View>
      {!vencido ? (
        <View style={styles.contenedor}>
        
          <Text style={styles.text}>Precaución!!</Text>
        </View>
      ) : (
        <View style={styles.contenedor}>
        
          <Text style={styles.text}>En Termino</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },

  image: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  contenedor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin:5
  },
});
export default Semaforo;
