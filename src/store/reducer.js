const initialState = {
    news: [],
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NEWS':
        return { ...state, news: action.payload };
      default:
        return state;
    }
  };
  
  export default newsReducer;
  