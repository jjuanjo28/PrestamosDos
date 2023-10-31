import {
  Text,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonBlue, ButtonRed } from "../components/Buttons";
import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Prestamo from "./Prestamo";
import { AddNewLoan } from "../store/actions";
import { useNavigation } from "@react-navigation/native";
import { URI } from "../../assets/Uri";
const AddLoan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [image, setImage] = useState("https://via.placeholder.com/200");
  const [hayFoto, setHayFoto] = useState(false);
  const [hayFecha, setHayFecha] = useState(false);
  const [selectedName, setSelectedName] = useState(null); // Estado para almacenar el nombre selecciona
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [fechaInicial, setFechaInicial] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("tu fecha de reclamo");
  const [showPickerDate, setShowPickerDate] = useState(false);
  const [dateString, setDateString] = useState("");
  const [fechaEntregaString, setFechaEntregaString] = useState("");

  const [contacts, setContacts] = useState(undefined);

  const [selectedContactId, setSelectedContactId] = useState(null);
  const [phone, setPhone] = useState("");

  const [prestamo, setPrestamo] = useState(null);
  const [listadoPrestamos, setListadoPrestamos] = useState([]);

  useEffect(() => {
    // getPrestamos(user.id)
    console.log("aca cambie y tengo data");
    console.log("listadoPrestamos", listadoPrestamos);
  }, [listadoPrestamos]);

  // Función para manejar el cambio en la fecha seleccionada
  const handleDateChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setShowPickerDate(!showPickerDate);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formatedDay = `${year}-${month}-${day}`;
     
      setDateString(formatedDay);
    }
  };

  const tomarFotografia = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("no elegiste ninguna fotografia");
    }
  };

  let getContactRows = () => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.ID,
            Contacts.Fields.Name,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
    if (contacts !== undefined) {
      return contacts.map((contact, index) => (
        <View>
        <TouchableOpacity onPress={() => {
            telefono(contact);
            setSelectedContactId(contact.id);
          }}>
       <Text key={index}>{contact.name}</Text>

        </TouchableOpacity>

        </View>
       
      //  <ButtonBlue
      //     key={index}
      //     text={contact.name}
      //     onPress={() => {
      //       telefono(contact);
      //       setSelectedContactId(contact.id);
      //     }}
      //   />
      ));
    }
  };

  function telefono(contact) {
    const currentDate = new Date(); // Obtenemos la hora actual aquí
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formatedDay = `${year}-${month}-${day}`;
    setFechaInicial(formatedDay);
    
    
    
   

    if (contact.phoneNumbers[0].number !== undefined) {
      console.log("contact.name:", contact.name);
      setSelectedName(contact.name);

      setPhone(contact.phoneNumbers[0].number);

      let horaString =
        fechaInicial.getFullYear() +
        "-" +
        fechaInicial.getMonth() +
        "-" +
        fechaInicial.getDate();
      let dateString =
        date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

      let prest = new Prestamo(
        contact.name,
        horaString,
        dateString,
        contact.phoneNumbers[0].number,
        image,
        0,
        user.id
      );
      //  prest.id_user = user.id

      if (!prest.id_user) {
        console.log("x undefined viendo el user:", user.prestamos);
        prest.id_user = user.prestamos[0].id_user;
      }
      //   dispatch(AddNewLoan(user.prestamos[user.prestamos.length-1]))
      console.log("soy user id", user);
      console.log("soy prest:", prest);
      setPrestamo(prest);
    } else {
      console.log(
        "el usuario " + contact.name + " no tiene telefono registrado"
      );
    }
  }
  
  const getPrestamos = async (id) => {
    try {
      const response = await axios.get(`${URI}prestamos/user/${id}`);
      const listado = response.data;
      setListadoPrestamos(listado);
      console.log("soy el listado:", listado);
      dispatch(AddNewLoan(listado[listado.length - 1]));
      // if(listado.length !== 0){
      //   if(listado.length == 1 ){
      //     dispatch(AddNewLoan(listado[0]))
      //    } else {
      //     dispatch(AddNewLoan(listado[listado.length-1]))
      //    }
      // }
    } catch (error) {
      console.error("Error al obtener préstamos:", error);
    }
  };

  const handleAddLoan = async () => {
    // Aquí puedes enviar los datos del préstamo a la API
    // Puedes usar axios o la librería que prefieras para hacer la solicitud POST
    prestamo.foto = image;

    let data = {
      id_user: user.id,
      nombre: prestamo.user,
      // generar una fecha capturada
      fechaDevolucion: dateString,
      fechaPrestamo: fechaInicial,
      telefono: prestamo.telefono,
      foto: prestamo.foto,
      devuelto: 0,
    };
    if (!data.id_user) {
      console.log("x undefined viendo el user:", user.prestamos[0].id_user);
      data.id_user = user.prestamos[0].id_user;
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${URI}prestamos/${data.id_user}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (!user.id) {
          getPrestamos(user.prestamos[0].id_user);
        } else {
          getPrestamos(user.id);
        }
        console.log(
          "soy el listado  prest antes de la creacion:",
          user.prestamos
        );
        console.log(
          "viendo el ultimo: ",
          user.prestamos[user.prestamos.length - 1]
        );
        console.log(JSON.stringify(response.data));

        //   dispatch(AddNewLoan(user.prestamos[user.prestamos.length-1]))
      })
      .catch((error) => {
        console.log("soy el fucking error:", error);
      });

    navigation.navigate("LoanList");
  };

  return (
    <View>
      <ButtonRed
        text="Seleccionar Fecha"
        onPress={() => setShowPickerDate(true)}
      />
      {showPickerDate && (
        <View>
          <DateTimePicker
            mode="date"
            display="default"
            onChange={handleDateChange}
            value={date}
            is24Hour={true}
          />
        </View>
      )}

      <ButtonRed text="Seleccionar Imagen" onPress={tomarFotografia} />

      {selectedName ? (
        <ButtonBlue
          text={
            contacts.find((contact) => contact.id === selectedContactId).name
          }
        />
      ) : (
        <ScrollView>{getContactRows()}</ScrollView>
      )}
      <View style={styles.general}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}
        <Text>Prestado a: {selectedName}</Text>
        <Text>fecha de vencimiento:{dateString}</Text>
      </View>

      <ButtonBlue text="Agregar Préstamo" onPress={handleAddLoan} />
    </View>
  );
};

const styles = StyleSheet.create({
  general: {
    display: "flex",
    flexDirection:"column",
    alignItems:"center",
    backgroundColor:"green"
  },
});
export default AddLoan;
