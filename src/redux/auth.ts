import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

interface LoginEmailInterface {
  email: string;
  upass: string;
}

interface UserStateInterface {
  id: number | null;
  username: string | null;
  email: string | null;
}

interface AuthStateInterface {
  user: UserStateInterface | null;
  isLoggedIn: boolean;
  status: string; // idle, loading, success, failed
  error: any;
}

const initialAuthState: AuthStateInterface = {
  user: null,
  isLoggedIn: false,
  status: 'idle',
  error: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, upass }: LoginEmailInterface) => {
    try {
      const responce = await fetch('https://api.ptcore.test/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email, // email@email.com
          password: upass, // password
        }),
      });
      return await responce.json();
    } catch (err: any) {
      throw Error(err);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await fetch('https://api.ptcore.test/login', { method: 'get' });
  } catch (err: any) {
    throw Error(err);
  }
});

export const authState = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: { payload: UserStateInterface | null }) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.user = action.payload;
          state.error = null;
          state.status = 'success';
        }
      },
    );
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export const authActions = authState.actions;
export const authReducer = authState.reducer;
export const authSelector = (state: RootState) => state.auth;
