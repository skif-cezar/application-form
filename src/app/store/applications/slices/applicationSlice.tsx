import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ApplicationState {
  id: string | null;
  idUser: string | null;
  author: string | null;
  title: string | null;
  description: string | null;
  parlor: string | null;
  date: string | null;
  comment: string | null | undefined;
  status: string | null;
}

export interface ApplicationArrState {
  applications: ApplicationState[] | null;
  appLastVisible: any | undefined;
  selectedStatus: string;
}

const initialState: ApplicationArrState = {
  applications: [],
  appLastVisible: null,
  selectedStatus: "Все статусы",
};

export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication(state: any, action: PayloadAction<ApplicationState>) {
      const isDuplicate = state.applications.some((app: ApplicationState) => app.id === action.payload.id);

      if (!isDuplicate) {
        state.applications = [...state.applications, action.payload];
      }
    },
    removeApplication(state: any, action: PayloadAction<ApplicationState>) {
      state.applications = state.applications.filter((app: any) => app.id !== action.payload);
    },
    updateApplication(state: any, action: PayloadAction<ApplicationState>) {
      const {id, status}: ApplicationState = action.payload;
      state.applications = state.applications.map((app: ApplicationState) => app.id === id ? {...app, status} : app);
    },
    clearApplication(state: any) {
      state.applications = [];
      state.appLastVisible = null;
      state.isShowAlert = false;
    },
    addAppLastVisible(state: any, action: PayloadAction<any>) {
      state.appLastVisible = action.payload;
    },
    setStatus(state: any, action: PayloadAction<any>) {
      state.selectedStatus = action.payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/typedef
export const {
  addApplication,
  removeApplication,
  clearApplication,
  addAppLastVisible,
  updateApplication,
  setStatus,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
