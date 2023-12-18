import { createContext, useEffect, useState } from "react";
import axios from '../../axios.config'
import CircularProgress from '@mui/material/CircularProgress';


export const ContextForDashBord = createContext(null);

export function ContextProviderForDashBord({ children }) {

  const [loader, setLoader] = useState(true);
  const [StateForUser, setStateForUser] = useState({
    isAutorizedUser: false,
    userData: null,
    profileData: null,
    savedRecipies : []
  })

  const [StateForFetchesRecipies , setStateForFetchesRecipies] = useState(null)
  const [StateForSavedRecipies , setStateForSavedRecipies] = useState(null)

  function checkAuthorization() {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_URL}check/authorization`)
        if (res.data) {
          setStateForUser({
            ...StateForUser,
            isAutorizedUser: true,
            userData: res.data.userData,
            profileData: res.data.profile,
            savedRecipies : res.data.profile?.savedRecipies
          })
        }
        setLoader(false)
        resolve(StateForUser.userData)
      } catch (error) {
        reject(error.message)
        window.location.href = '/login'
      }
    })
  }

  const ObjForContextData = {
    StateForUser: StateForUser,
    USER: StateForUser.userData, //Provide user data 
    PROFILEDATA: StateForUser.profileData,
    SAVED_RECIPE : StateForUser.savedRecipies,
    SAVED_RECIPE_DATA : StateForSavedRecipies,
    FTECHED_RECIPES : StateForFetchesRecipies,
    isAutorizedUser: StateForUser.isAutorizedUser,  /// value
    setStateForFetchesRecipies: setStateForFetchesRecipies,
    setStateForSavedRecipies :setStateForSavedRecipies,
    checkAuthorization: checkAuthorization,  // function
    setStateForUser: setStateForUser,
  }

  useEffect(() => {
    console.log("Status" , ObjForContextData.isAutorizedUser)
    if (!ObjForContextData.isAutorizedUser) {
      checkAuthorization();
    }
  }, []);

  return (
    <ContextForDashBord.Provider value={ObjForContextData}>
      {loader && (
        <div className='h-full w-full'>
          <div className='flex flex-col justify-center items-center my-1/2 mx-1/2 h-full'>
            <CircularProgress />
          </div>
        </div>
      )}
      {!loader && children}
    </ContextForDashBord.Provider>
  )
}

