import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async params => {
    const { categoryId, currentPage, sort } = params;
    const { data } = await axios.get(
      `https://630e257b109c16b9abf5a964.mockapi.io/items?page=${currentPage}&limit=15&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty?.replace('-', '')}&order=${
        sort.sortProperty?.includes('-') ? 'desc' : 'asc'
      }`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'Loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: state => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

//const [isLoading, setIsLoading] = useState(true);
