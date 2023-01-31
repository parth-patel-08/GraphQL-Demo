import { createSlice } from "@reduxjs/toolkit";

import { parseJwt } from "../../utils";

const token = localStorage.getItem("shopUserToken");
const user = token ? parseJwt(token) : {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: !!token,
    ...user
  },
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload, isLogin: true };
    },
    resetUser: () => {
      localStorage.removeItem("shopUserToken")
      return { isLogin: false }
    }
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
