// src/store/baseCrudSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {PageRequestDto} from "../api/services/index.defs.ts";
import type {CommonResultDto} from "../core/components/dto/commonResultDto.ts";
import {toast} from "react-toastify";

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
    createItem: (data: Partial<T>) => Promise<CommonResultDto<any>>;
    updateItem: (id: string, data: Partial<T>) => Promise<CommonResultDto<any>>;
    deleteItem: (id: string) => Promise<CommonResultDto<any>>;
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


    const createData = createAsyncThunk(
        `${name}/create`,
        async (data: Partial<T>, { dispatch, getState }: any) => {
            const res = await createItem(data);

            if (res.isSuccessful) {
                toast.success(res.message ?? "Thêm mới thành công!");
            } else {
                toast.error(res.message ?? "Thêm mới thất bại");
            }

            const state = getState()[name];
            dispatch(getPage({ page: state.page, keyword: state.keyword, size: state.pageSize }));
        }
    );

    const updateData = createAsyncThunk(
        `${name}/update`,
        async ({ id, data }: { id: string; data: Partial<T> }, { dispatch, getState }: any) => {
            const res = await updateItem(id, data);

            if (res.isSuccessful) {
                toast.success(res.message ?? "Updated successfully!");
            } else {
                toast.error(res.message ?? "Update failed!");
            }

            const state = getState()[name];
            dispatch(getPage({ page: state.page, keyword: state.keyword, size: state.pageSize }));
        }
    );

    const deleteData = createAsyncThunk(
        `${name}/delete`,
        async (id: string, { dispatch, getState }: any) => {
            const res = await deleteItem(id);

            if (res.isSuccessful) {
                toast.success(res.message ?? "Deleted successfully!");
            } else {
                toast.error(res.message ?? "Delete failed!");
            }

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