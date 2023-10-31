import React from 'react';
import { View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions';
import CardLoan from './CardLoan';

const LoanList = ({ navigation }) => {
  const loanList = useSelector((state) => state.auth.user.prestamos);
   const dispatch = useDispatch();
 
  
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('LoginScreen');
  };
  
  
  // console.log("somos los prestamos:", loanList)
  return (
    <View style={{backgroundColor:"orange",height:"90%"}}>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
      <FlatList
        data={loanList}
        keyExtractor={(item) => item.id ? item.id.toString():null}
        renderItem={({ item }) => (         
          <View>
          
          <CardLoan item={item}/>
                 
          </View>
        )}
      />
    </View>
  );
};

export default LoanList;
