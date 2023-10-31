import React, {useState, useEffect}from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Semaforo from './Semaforo';

const CardLoan = ({ item }) => {
  const [fechaDevolucion, SetFechaDevolucion] = useState(item.fechaDevolucion);
  const [actualDate, setActualDate] = useState(new Date());
  const [vencido, setVencido] = useState(false);
 
  
  useEffect(() => {
      if (Date.parse(actualDate) > Date.parse(fechaDevolucion)) {
          setVencido(!vencido)
      } 
  }, [])
    const navigation = useNavigation()

    const envioId = async () =>{
  
  const idString = item.id.toString()
  try {
    await AsyncStorage.setItem('idPrestamo', idString);
    navigation.navigate('LoanScreen');
  } catch (error) {
    console.error(error);
  }
 
}
  return (
      <View  style={styles.cardContainer}>
     
<View style={!vencido ? ({backgroundColor:"green"}): ({backgroundColor:"red"}) }>

    <TouchableOpacity onPress={envioId}>

<View style={styles.ordenador}>
     <View>
      <Image source={{ uri: item.foto }} style={styles.image} />
     </View>

      <View>
        
        <Semaforo item={item}/>
        <Text style={styles.text}>Nombre: {item.nombre}</Text>
        
        <Text style={styles.text}>Teléfono: {item.telefono}</Text>
        <Text style={styles.text}>Fecha de Préstamo: {item.fechaPrestamo}</Text>
        <Text style={styles.text}>Fecha de Devolución: {item.fechaDevolucion}</Text>
      </View>


</View>
    </TouchableOpacity>
</View>
   
  
    </View>
  );
};

const styles = StyleSheet.create({
  ordenador:{
    flexDirection:"row"
  },
  cardContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },

  text: {
    marginBottom: 5,
    fontSize: 13,
  },
});

export default CardLoan;