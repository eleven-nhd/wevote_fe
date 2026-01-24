import {createBaseCrudSlice} from "./baseCrudSlice.ts";
import {VotesService} from "../api/services/VotesService.ts";

const { reducer, actions } = createBaseCrudSlice<any>({
    name: "vote",
    fetchPage: async (input) => {
        const res = await VotesService.getPage({body: input});
        // API returns object with data array and count
        return {
            items: res && Array.isArray(res.items) ? res?.items : [],
            total: res?.total || 0,
        };
    },
    createItem: async (data: any) => {
        return await VotesService.create({body: data});
    },
    updateItem: async (id, data) => {
        return await VotesService.update({id: id, body: data});
    },
    deleteItem: async (id) => {
        return await VotesService.remove({id: id});
    },
});

export const voteReducer = reducer;
export const voteActions = actions;