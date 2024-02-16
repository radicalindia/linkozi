const initialState = {
    data: null,
    submitloading:false,
    error:null,
    loading:false,
    

  };
  
  const medicine= (state = initialState, action) => {
    switch (action.type) {
      case "GET_MEDICINE":
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };


     
      default:
        
        return state;
    }
  };
  
  export default medicine;
  