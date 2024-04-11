import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer';
import Navigation from './reducers/NavigatorRef';




const reducer={
    user:userReducer,
    nav:Navigation,


}
export const store = configureStore({
 reducer:reducer,
  devTools:true
})
export default store;