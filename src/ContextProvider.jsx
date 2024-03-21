import React, { createContext, useState } from 'react'

export const context=createContext(null); 


const ContextProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState("");
    const [Expense, setExpense] = useState(null);
    const [close, setClose] = useState("nav-menu");
    const [active, setactive] = useState("Link");
    const [loading, setLoading] = useState(false);
    const [addExpense, setAddExpense] = useState(false);
    const [editExpense, setEditExpense] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [openProfile,setOpenProfile]=useState(false);

    const values = {
      isAuth,
      setIsAuth,
      user,
      setUser,
      Expense,
      setExpense,
      close,
      setClose,
      active,
      setactive,
      loading,
      setLoading,
      addExpense,
      setAddExpense,
      editExpense,
      setEditExpense,
      refresh,
      setRefresh,
      openProfile,
      setOpenProfile,
    };

  return (
    <context.Provider
      value={values}
    >
      {children}
    </context.Provider>
  );
}

export default ContextProvider