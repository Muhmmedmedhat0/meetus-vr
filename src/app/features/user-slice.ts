import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ErrorResponse {
  message: string;
  details: {
    error: {
      message: string;
    };
  };
}

interface LoginResponse {
  jwt: string;
  user: User;
}

interface User {
  email: string;
  id: number;
  username: string;
}

export const logIn = createAsyncThunk<
  LoginResponse,
  { identifier: string; password: string }
>('user/logIn', async (values, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/local`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      },
    );

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('TOKEN', data.jwt);
      return data;
    } else {
      return rejectWithValue({
        message: 'Authentication failed',
        details: data,
      });
    }
  } catch (error) {
    return rejectWithValue({
      message: 'An error occurred during authentication',
      details: (error as Error).message,
    });
  }
});

export const register = createAsyncThunk<
  LoginResponse,
  { username: string; email: string; password: string }
>('user/register', async (values, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      },
    );

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('TOKEN', data.jwt);
      return data;
    } else {
      return rejectWithValue({
        message: 'Authentication failed',
        details: data,
      });
    }
  } catch (error) {
    return rejectWithValue({
      message: 'An error occurred during authentication',
      details: (error as Error).message,
    });
  }
});

interface UserState {
  user: LoginResponse | null;
  loading: boolean;
  error: ErrorResponse | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    // logIn
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      });
    // register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default userSlice.reducer;
