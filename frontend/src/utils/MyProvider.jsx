/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Apiservice from "../services/Apiservice";

export const UserContext = createContext();

export default function MyProvider({ children }) {
  const [theme, setTheme] = useState();
  const handleOnLoad = async () => {
    try {
      const resp = await Apiservice.UserService.userAuthentication();
      if (resp.status == 200) {
        setTheme(resp.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleOnLoad();
  }, []);

  return (
    <div>
      <UserContext.Provider value={theme}>{children}</UserContext.Provider>
    </div>
  );
}
