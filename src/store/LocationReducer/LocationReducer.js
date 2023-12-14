import { LocationActionTypes } from "./LocationActionTypes"

const initialState = {
  locations: []
}


export const LocationReducer = (state=initialState, action) => {
  switch (action.type) {
    case LocationActionTypes.SET_LOCATIONS: {
      const  { locations } = action.payload
      return {
        locations
      }
    }

    default: {
      return state
    }
  }
}