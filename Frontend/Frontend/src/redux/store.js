
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  dashboardUrl: null,
  veterinaryId: null,
  groomerId: null,
  sitterId: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.dashboardUrl = action.payload.dashboardUrl;
    },
    addVeterinary: (state, action) => {
      state.veterinaryId = action.payload;
    },
    addGroomer: (state, action) => {
      state.groomerId = action.payload;
    },
    addSitter: (state, action) => {
      state.sitterId = action.payload;
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.dashboardUrl = null;
      state.veterinaryId = null;
      state.groomerId = null;
      state.sitterId = null;
    },
  },
});

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined; 
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};


export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

export const { login, logout, addVeterinary, addGroomer, addSitter, addUser } = userSlice.actions;

const persistedState = loadState();
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export default store;
