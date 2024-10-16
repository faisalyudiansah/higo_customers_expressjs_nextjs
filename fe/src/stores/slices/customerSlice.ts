import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { GenderData } from '@/types/genderData';
import { AgeData } from '@/types/ageData';
import { CustomersResponse } from '@/types/dataCustomers';

interface AuthState {
    genderData: GenderData[] | null
    genderError: string | null
    genderLoading: boolean
    ageData: AgeData[] | null
    ageError: string | null
    ageLoading: boolean
    customerData: CustomersResponse | null
    customerError: string | null
    customerLoading: boolean
}

const initialState: AuthState = {
    genderData: null,
    genderError: null,
    genderLoading: true,
    ageData: null,
    ageError: null,
    ageLoading: true,
    customerData: null,
    customerError: null,
    customerLoading: true,
};

export const customerSlice = createSlice({
    name: 'customer/slice',
    initialState,
    reducers: {
        setGenderData: (state, action) => { state.genderData = action.payload; },
        setGenderError: (state, action) => { state.genderError = action.payload; },
        setGenderLoading: (state, action) => { state.genderLoading = action.payload; },
        setAgeData: (state, action) => { state.ageData = action.payload; },
        setAgeError: (state, action) => { state.ageError = action.payload; },
        setAgeLoading: (state, action) => { state.ageLoading = action.payload; },
        setCustomerData: (state, action) => { state.customerData = action.payload; },
        setCustomerError: (state, action) => { state.customerError = action.payload; },
        setCustomerLoading: (state, action) => { state.customerLoading = action.payload; },
    },
});

export const {
    setGenderData,
    setGenderError,
    setGenderLoading,
    setAgeData,
    setAgeError,
    setAgeLoading,
    setCustomerData,
    setCustomerError,
    setCustomerLoading,
} = customerSlice.actions;

export const fetchCustomerDataAPI = (page = 1, limit = 5, search : string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch(setCustomerLoading(true))
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers?page=${page}&limit=${limit}&q=${search}`);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Failed to fetch Customer data');
        }
        const data: CustomersResponse = await response.json();
        dispatch(setCustomerData(data))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setCustomerError(error.message || 'An unexpected error occurred'));
        } else {
            dispatch(setCustomerError('An unexpected error occurred'));
        }
        throw error
    } finally {
        dispatch(setCustomerLoading(false))
    }
};

export const fetchGenderDataAPI = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch(setGenderLoading(true))
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/gender`);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Failed to fetch gender data');
        }
        const data: GenderData[] = await response.json();
        dispatch(setGenderData(data))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setGenderError(error.message || 'An unexpected error occurred'));
        } else {
            dispatch(setGenderError('An unexpected error occurred'));
        }
        throw error
    } finally {
        dispatch(setGenderLoading(false))
    }
};

export const fetchAgeDataAPI = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch(setAgeLoading(true))
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/age`);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Failed to fetch age data');
        }
        const data: AgeData[] = await response.json();
        dispatch(setAgeData(data))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setAgeError(error.message || 'An unexpected error occurred'));
        } else {
            dispatch(setAgeError('An unexpected error occurred'));
        }
        throw error
    } finally {
        dispatch(setAgeLoading(false))
    }
};

export default customerSlice.reducer;
