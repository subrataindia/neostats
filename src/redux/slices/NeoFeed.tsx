import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import myConstants from '../../config/constants';

export const fetchData = createAsyncThunk(
  'data/neo',
  async (data: {FROM_DATE: string; TO_DATE: string}) => {
    const {FROM_DATE, TO_DATE} = data;
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${FROM_DATE}&end_date=${TO_DATE}&api_key=${myConstants.API_KEY}`,
    );
    // Put all the day wise values in an array
    let x: any = Object.values(response.data.near_earth_objects);
    // Data will contain all all values from all days
    let tempdata: any = [];
    x.forEach((y: any) => {
      tempdata = [...tempdata, ...y];
    });
    // Sort based on highest speed to get fastest asteroid
    tempdata.sort(
      (a: any, b: any) =>
        b.close_approach_data[0].relative_velocity.kilometers_per_hour -
        a.close_approach_data[0].relative_velocity.kilometers_per_hour,
    );

    let result: any = {
      fastest_asteroid: {
        speed:
          tempdata[0].close_approach_data[0].relative_velocity
            .kilometers_per_hour,
        id: tempdata[0].id,
      },
      data: {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      },
    };
    // Sort based on distance in kilometer
    tempdata.sort(
      (a: any, b: any) =>
        a.close_approach_data[0].miss_distance.kilometers -
        b.close_approach_data[0].miss_distance.kilometers,
    );
    // Update Result
    result = {
      ...result,
      closest_asteroid: {
        distance: tempdata[0].close_approach_data[0].miss_distance.kilometers,
        id: tempdata[0].id,
      },
    };
    // Find average size of asteroids
    const average =
      tempdata.reduce(
        (total: number, next: any) =>
          total + next.estimated_diameter.kilometers.estimated_diameter_max,
        0,
      ) / tempdata.length;
    // Update Result
    result = {
      ...result,
      averageSize: average,
    };
    // array of all the dates
    let keys = Object.keys(response.data.near_earth_objects);
    keys = keys.sort();
    // store number of asteroids per day as an object
    for (let i = 0; i < keys.length; i++) {
      //result.data = {...result.data, [keys[i]]: x[i].length};
      result.data.labels.push(keys[i]);
      result.data.datasets[0].data.push(x[i].length);
    }
    // For extra space on right hand side
    if (result.data.labels.length > 6) {
      result.data.labels.push('');
      result.data.datasets[0].data.push(0);
    }

    return result;
  },
);

type SliceState = {
  data: {
    averageSize: number;
    closest_asteroid: {distance: string; id: string};
    fastest_asteroid: {speed: string; id: string};
    data: {
      labels: string[];
      datasets: [
        {
          data: number[];
        },
      ];
    };
  } | null;
  status: string;
  error: string;
};

const initialState: SliceState = {
  data: null,
  status: myConstants.idle,
  error: '',
};

const NeoFeedSlice = createSlice({
  name: 'neofeedslice',
  initialState,
  reducers: {
    resetData: state => {
      state.data = null;
      state.status = myConstants.idle;
      state.error = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = myConstants.pending;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message
          ? action.error.message.toString()
          : '';
        state.status = myConstants.rejected;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = '';
        state.status = myConstants.fulfilled;
      });
  },
});

export const {resetData} = NeoFeedSlice.actions;
export default NeoFeedSlice.reducer;
