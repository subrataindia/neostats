import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import myConstants from '../../config/constants';

export const fetchData = createAsyncThunk(
  'data/neo',
  async ({START_DATE, END_DATE}) => {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${myConstants.API_KEY}`,
    );
  },
);

const NeoFeedSlice = createSlice({
  name: 'neofeedslice',
  initialState: {
    data: [],
    status: myConstants.idle,
  },
  reducers: {},
});

export default NeoFeedSlice.reducer;
