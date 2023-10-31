import { combineReducers } from "redux";
import { LOGIN, LOGOUT, ADDLOAN, DELETELOAN, ADDUSER } from "./actions";

const initialState = {
  isAuthenticated: false,
  user: null,
   //   loanList: [ {"devuelto": false, "fechaDevolucion": "2023-10-08", "fechaPrestamo": "2023-10-03", "foto": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fprestamos-app-65d19125-50c3-4e87-b4b2-77100e9c445e/ImagePicker/065894b7-49f3-4399-8d89-c24baceed033.jpeg", "id": 140,
  //   "id_user": 1, "nombre": "AdmiSur", "telefono": "11 6682-7398"}, {"devuelto": false, "fechaDevolucion": "2023-10-11", "fechaPrestamo": "2023-10-07", "foto": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fprestamos-app-65d19125-50c3-4e87-b4b2-77100e9c445e/ImagePicker/4fda6ccb-95da-4c34-a2d3-668bfc335573.jpeg", "id": 144, "id_user": 1, "nombre": "Abascal Fernando", "telefono": "01142243376"}] // Nuevo estado para la lista de préstamos
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDUSER:
      const data = action.payload;
      // console.log("soy state en redux", state);
      // console.log("soy action.paiload", data);
      
      return {
        ...state,
        isAuthenticated: true,
        user: [data],
      };
    //soy state: {"isAuthenticated": true, "prestamos": [], "user": {"apellido": "Dkkdk", "email": "Djjdjjxxjx", "id": 76, "nombre": "Jddjdd", "password": "Qq", "usuario": "Qq"}}
    case ADDLOAN:
      console.log("action.payload", action.payload);
      console.log("soy state:", state);
      if(!state.user.prestamos){
        state.user.prestamos = []
      }
      return {
        ...state,
        user: {
          prestamos: [...state.user.prestamos , action.payload ],
        },
      };

    case DELETELOAN:
      const loanIdToDelete = action.payload;
      const updatedPrestamos = state.user.prestamos.filter(
        (e) => e.id != loanIdToDelete
      );

      return {
        ...state,
        user: {
          prestamos: updatedPrestamos,
        },
      };

    case LOGIN:
      // console.log("soy state en login:", state);
      // console.log("soy action.payload:", action.payload);

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        // Limpiar la lista de préstamos al cerrar sesión
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
