export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADDLOAN = "ADDLOAN";
export const DELETELOAN = "DELETELOAN";
export const ADDUSER = "ADDUSER"

export const login = (userData) => ({
  type: LOGIN,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});

export const AddNewLoan = (data) => ({
  type: ADDLOAN,
  payload:data
})

export const deleteLoan = (data) => ({
  type: DELETELOAN,
  payload: data
})

export const AddUser = (user) => ({
  type: ADDUSER,
  payload: user
})