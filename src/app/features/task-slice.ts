import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Task {
  id?: number;
  name: string;
  status: boolean;
}

interface TasksResponse {
  tasks: Task[];
}

interface crudTaskResponse {
  data: {
    attributes: {
      name: string;
      status: boolean;
    };
  };
}

interface ErrorResponse {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: {
      errors: {
        path: string[];
        message: string;
        name: string;
      }[];
    };
  };
}

interface TasksState {
  tasks: Task[] | null;
  loading: boolean;
  error: ErrorResponse | null;
}

const initialState: TasksState = {
  tasks: null,
  loading: false,
  error: null,
};

// fetchTasks
export const fetchTasks = createAsyncThunk<TasksResponse, { id: number }>(
  'tasks/fetchTasks',
  async ({ id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}?populate=tasks`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('TOKEN')}`,
          },
        },
      );

      const data: TasksResponse = await response.json();
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue({
          message: 'Authentication failed',
          details: data,
        });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
// createTask
export const createTask = createAsyncThunk<
  crudTaskResponse,
  { name: string; status: boolean; user: number }
>('task/createTask', async (taskData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('TOKEN')}`,
      },
      body: JSON.stringify({ data: taskData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const data: crudTaskResponse = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// updateTask
export const updateTask = createAsyncThunk<
  crudTaskResponse,
  { id: number; name?: string; status?: boolean }
>('task/updateTask', async (taskData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const { id, ...rest } = taskData;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('TOKEN')}`,
        },
        body: JSON.stringify({ data: rest }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data: crudTaskResponse = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// deleteTask
export const deleteTask = createAsyncThunk<crudTaskResponse, { id: number }>(
  'task/deleteTask',
  async ({ id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('TOKEN')}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const data: crudTaskResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchTasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        // state.tasks
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        // Handle task fetch rejection
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      });
    // createTask
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [action.payload.data.attributes];
        console.log(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      });
    // updateTask
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [action.payload.data.attributes];
        console.log(action.payload);
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      });
    // deleteTask
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [action.payload.data.attributes];
        console.log(action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default tasksSlice.reducer;
