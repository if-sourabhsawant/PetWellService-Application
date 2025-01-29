import { configureStore } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,  // Stores user info after login
  isAuthenticated: false, // Tracks if the user is logged in
  dashboardUrl: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.dashboardUrl = action.payload.dashboardUrl;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.dashboardUrl = null;
    },
  },
});

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // No state saved, return undefined to initialize with default state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

// Save current state to localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

export const { login, logout } = userSlice.actions;

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
