import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage } from "../services/storage"

interface UserData {
    name: string;
    email: string;
}

interface IAppContext {
    user: UserData | null,
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    setUser: (user: UserData | null) => void
}
  
export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
    const [ user, setUser ] = useState<UserData | null>(null)

    useEffect(() => {
      const storage = getAllLocalStorage()
      if(storage){
        const { login, user: userData } = JSON.parse(storage)
        setIsLoggedIn(login)
        if(userData) {
          setUser(userData)
        }
      }
    }, [])
  
    return (
      <AppContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, setUser }}>
        { children }
      </AppContext.Provider>
    )
}
