import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Profile } from '../../../types/Profile';
interface RegProps {
  email: string;
  password: string;
  name: string;
  surname: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface AuthorizationState {
  result: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isModalOpen: boolean;
  profile: Profile | null;
}

interface AuthResponse {
  result?: boolean;
  success?: boolean;
}

interface FetchAuthorizationParams {
  data: RegProps | LoginProps | null;
  url: string;
}

export const fetchAuthorization = createAsyncThunk<AuthResponse, FetchAuthorizationParams>(
  'Authorization/fetchAuthorization',
  async ({ url, data }) => {
    const response = await fetch(`https://cinemaguide.skillbox.cc/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authorization failed');
    }

    return await response.json();
  },
);

interface LogoutResponse {
  result: boolean;
}
export const fetchProfile = createAsyncThunk<Profile, { url: string; fields?: string[] }>(
  'Authorization/fetchProfile',
  async ({ url, fields }) => {
    const response = await fetch(
      `https://cinemaguide.skillbox.cc/${url}${fields ? `?fields=${fields.join(',')}` : ''}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Get Profile failed');
    }

    return await response.json();
  },
);

export const fetchLogoutProfile = createAsyncThunk<LogoutResponse>('Authorization/fetchLogoutProfile', async () => {
  const response = await fetch(`https://cinemaguide.skillbox.cc/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  return await response.json();
});

const initialState: AuthorizationState = {
  result: false,
  status: 'idle',
  profile: null,
  error: null,
  isModalOpen: false,
};

const authorization = createSlice({
  name: 'Authorization',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
      state.error = null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Authorization thunk
      .addCase(fetchAuthorization.pending, (state) => {
        state.result = false;
        state.error = null;
        state.status = 'loading';
        state.isModalOpen = true;
      })
      .addCase(fetchAuthorization.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (typeof action.payload.success === 'boolean') {
          state.result = action.payload.success;
        } else if (typeof action.payload.result === 'boolean') {
          state.result = action.payload.result;
        } else {
          state.result = false;
        }
      })
      .addCase(fetchAuthorization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })

      // Profile thunk
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
        state.profile = null;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch profile';
      })

      //Logout
      .addCase(fetchLogoutProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLogoutProfile.fulfilled, (state) => {
        state.status = 'succeeded';
        state.profile = null;
      })
      .addCase(fetchLogoutProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch logout profile';
      });
  },
});
export const { openModal, closeModal, resetError } = authorization.actions;

export default authorization.reducer;
