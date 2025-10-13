// src/store/baseCrudSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {PageRequestDto} from "../api/services/index.defs.ts";

interface BaseState<T> {
    list: T[];
    total: number;
    loading: boolean;
    page: number;
    keyword: string;
    pageSize: number;
    error?: string;
}

export const createBaseCrudSlice = <T>({
                                           name,
                                           fetchPage,
                                           createItem,
                                           updateItem,
                                           deleteItem,
                                       }: {
    name: string;
    fetchPage: (params: PageRequestDto) => Promise<{ data: T[]; total: number }>;
    createItem: (data: Partial<T>) => Promise<void>;
    updateItem: (id: string, data: Partial<T>) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
}) => {
    const initialState: BaseState<T> = {
        list: [],
        total: 0,
        loading: false,
        page: 1,
        keyword: "",
        pageSize: 10,
    };

    const getPage = createAsyncThunk(`${name}/getPage`, async (params: PageRequestDto) => {
        const res = await fetchPage(params);
        return res;
    });


    const createData = createAsyncThunk(`${name}/create`, async (data: Partial<T>, { dispatch, getState }: any) => {
        await createItem(data);
        const state = getState()[name];
        dispatch(getPage({ page: state.page, keyword: state.keyword, size: state.pageSize }));
    });

    const updateData = createAsyncThunk(
        `${name}/update`,
        async ({ id, data }: { id: string; data: Partial<T> }, { dispatch, getState }: any) => {
            await updateItem(id, data);
            const state = getState()[name];
            dispatch(getPage({ page: state.page, keyword: state.keyword, size: state.pageSize }));
        }
    );

    const deleteData = createAsyncThunk(
        `${name}/delete`,
        async (id: string, { dispatch, getState }: any) => {
            await deleteItem(id);
            const state = getState()[name];
            dispatch(getPage({ page: state.page, keyword: state.keyword, size: state.pageSize }));
        }
    );

    const slice = createSlice({
        name,
        initialState,
        reducers: {
            setKeyword(state, action) {
                state.keyword = action.payload;
            },
            setPage(state, action) {
                state.page = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(getPage.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getPage.fulfilled, (state, action) => {
                    state.loading = false;
                    state.list = action.payload.data as [];
                    state.total = action.payload.total;
                })
                .addCase(getPage.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                })
                .addCase(createData.pending, (state) => {
                    state.loading = true;
                })
                .addCase(createData.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(updateData.pending, (state) => {
                    state.loading = true;
                })
                .addCase(updateData.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(deleteData.pending, (state) => {
                    state.loading = true;
                })
                .addCase(deleteData.fulfilled, (state) => {
                    state.loading = false;
                });
        },
    });

    return {
        reducer: slice.reducer,
        actions: { ...slice.actions, getPage, createData, updateData, deleteData },
    };
};