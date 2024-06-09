import { auth, provider, signInWithPopup } from "../configuraciones.js";

export const googleAuth =async() =>{
  try{
    return await signInWithPopup(auth, provider)
  }catch(error){
    console.log(error)
  }finally{
    console.log("ya iniciaste sesion con google")
  }
}
