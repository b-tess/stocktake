import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import stockService from './stockService'

const initialState = {
    stockItems: [],
    stockItem: {},
    count: 0,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

//Create a new stock item
export const createStockItem = createAsyncThunk(
    'stock/createstockitem',
    async (stockData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.createStockItem(stockData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get ALL stock items for stock in/admin purposes
//Access: logged in and isAdmin
//The _ as a parameter for the async callback allows access to
//the thunkAPI when there isn't a need to pass another
//parameter before it.
//Can't the thunkAPI be passed as a single parameter? Not sure...
export const getAllStockItems = createAsyncThunk(
    'stock/getallstockitems',
    async (pageNumber, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getAllStockItems(pageNumber, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get ALL stock items for stock out purposes
//Access: anyone who's logged in
export const getAllStockOutItems = createAsyncThunk(
    'stock/getallstockoutitems',
    async (pageNumber, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getAllStockOutItems(pageNumber, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get ALL medication stock items for stock out purposes
//Access: anyone who's logged in
export const getAllMedItems = createAsyncThunk(
    'stock/getallmeditems',
    async (pageNumber, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getAllMedItems(pageNumber, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get ALL utility stock items for stock out purposes
//Access: anyone who's logged in
export const getAllUtilityItems = createAsyncThunk(
    'stock/getallutilityitems',
    async (pageNumber, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getAllUtilityItems(pageNumber, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get one stock item for viewing and possibly editing
export const getOneStockItem = createAsyncThunk(
    'stock/getonestockitem',
    async (stockItemId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getOneStockItem(stockItemId, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Update the inStock &/or expDate of a stock item by admin
export const updateStockItem = createAsyncThunk(
    'stock/updatestockitem',
    async ({ stockItemId, updateData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.updateStockItem(
                stockItemId,
                updateData,
                token
            )
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Update the inStock &/or expDate of a stock item by admin
export const updOnStockOut = createAsyncThunk(
    'stock/updateonstockout',
    async (requestBody, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.updOnStockOut(requestBody, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete a stock item
export const deleteStockItem = createAsyncThunk(
    'stock/deletestockitem',
    async (stockItemId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.deleteStockItem(stockItemId, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStockItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createStockItem.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createStockItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllStockItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllStockItems.fulfilled, (state, action) => {
                state.isLoading = false
                // state.isSuccess = true
                state.stockItems = action.payload.stockItems
                state.count = action.payload.totalPages
            })
            .addCase(getAllStockItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllStockOutItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllStockOutItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.stockItems = action.payload.stockItems
                state.count = action.payload.totalPages
            })
            .addCase(getAllStockOutItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllMedItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllMedItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.stockItems = action.payload.stockItems
                state.count = action.payload.totalPages
            })
            .addCase(getAllMedItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllUtilityItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUtilityItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.stockItems = action.payload.stockItems
                state.count = action.payload.totalPages
            })
            .addCase(getAllUtilityItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getOneStockItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOneStockItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stockItem = action.payload
            })
            .addCase(getOneStockItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateStockItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateStockItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stockItem = action.payload
            })
            .addCase(updateStockItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updOnStockOut.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updOnStockOut.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stockItem = action.payload
            })
            .addCase(updOnStockOut.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteStockItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteStockItem.fulfilled, (state, action) => {
                state.isLoading = false
                // state.isSuccess = true
                state.stockItem = action.payload
            })
            .addCase(deleteStockItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = stockSlice.actions
export default stockSlice.reducer
