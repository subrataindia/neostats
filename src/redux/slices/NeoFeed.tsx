import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import myConstants from '../../config/constants';

export const fetchData = createAsyncThunk('data/neo', async data => {
  // console.log(data, data.FROM_DATE, data.TO_DATE);
  const {FROM_DATE, TO_DATE} = data;
  try {
    console.log(FROM_DATE, TO_DATE, myConstants.API_KEY);
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${FROM_DATE}&end_date=${TO_DATE}&api_key=${myConstants.API_KEY}`,
    );
    // Put all the day wise values in an array
    let x: any = Object.values(response.data.near_earth_objects);
    // Data will contain all all values from all days
    let data: any = [];
    x.forEach((y: any) => {
      data = [...data, ...y];
    });
    // Sort based on highest speed to get fastest asteroid
    data.sort(
      (a: any, b: any) =>
        b.close_approach_data[0].relative_velocity.kilometers_per_hour -
        a.close_approach_data[0].relative_velocity.kilometers_per_hour,
    );

    let result: any = {
      fastest_asteroid: {
        speed:
          data[0].close_approach_data[0].relative_velocity.kilometers_per_hour,
        id: data[0].id,
      },
      data: {},
    };
    // Sort based on distance in kilometer
    data.sort(
      (a: any, b: any) =>
        a.close_approach_data[0].miss_distance.kilometers -
        b.close_approach_data[0].miss_distance.kilometers,
    );
    // Update Result
    result = {
      ...result,
      closest_asteroid: {
        distance: data[0].close_approach_data[0].miss_distance.kilometers,
        id: data[0].id,
      },
    };
    // Find average size of asteroids
    const average =
      data.reduce(
        (total: number, next: any) =>
          total + next.estimated_diameter.kilometers.estimated_diameter_max,
        0,
      ) / data.length;
    // Update Result
    result = {
      ...result,
      averageSize: average,
    };
    // array of all the dates
    let keys = Object.keys(response.data.near_earth_objects);
    // store number of asteroids per day as an object
    for (let i = 0; i < keys.length; i++) {
      console.log('x:', x);
      result.data = {...result.data, [keys[i]]: x[i].length};
    }
    console.log('response : ', result, data);
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
});

const NeoFeedSlice = createSlice({
  name: 'neofeedslice',
  initialState: {
    data: [],
    status: myConstants.idle,
    error: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, () => {
        state.status = myConstants.loading;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log('fulfilled', action.payload);
        state.data = [...action.payload];
        state.error = {};
        state.status = myConstants.fulfilled;
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log('rejected', action.payload);
        state.error = action.payload;
        state.status = myConstants.rejected;
      });
  },
});

export default NeoFeedSlice.reducer;
