import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    token: localStorage.getItem("adminToken") || null,
    userId: localStorage.getItem("adminUserId") || null,
    email: localStorage.getItem("adminEmail") || null,
  },
  reducers: {
    adminLogin(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;

      localStorage.setItem("adminToken", action.payload.token);
      localStorage.setItem("adminUserId", action.payload.userId);
      localStorage.setItem("adminEmail", action.payload.email);
    },

    adminLogout(state) {
      state.token = null;
      state.userId = null;
      state.email = null;

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUserId");
      localStorage.removeItem("adminEmail");
    },
  },
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
