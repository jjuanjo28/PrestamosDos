import React from 'react';
import LoanList from '../components/LoanList';
import { ButtonOrange } from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';

const LoanListScreen = ({ navigation }) => {

  const navigate = useNavigation()

  return (
    
  <>
   <ButtonOrange onPress={()=>{navigation.navigate("AddLoan")}} text={"Crea un prestamo"}/>
   <LoanList navigation={navigation} />
  </>
  );
};

export default LoanListScreen;
