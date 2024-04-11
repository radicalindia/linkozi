import { err } from "react-native-svg"
import { http } from "../utils/AxiosInstance"

export const getprofile = async(id)=>{
    try {
        const {data}= await http.get("/",{
           params:{
            method:"myprofile",
            userId:id
           }
        })
        // console.log(data)
        return data ;
        
    } catch (error) {
        console.log(error)
    }
}