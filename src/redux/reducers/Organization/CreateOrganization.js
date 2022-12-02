import C from "../../constants";

const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case C.CREATE_ORGANIZATION:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
