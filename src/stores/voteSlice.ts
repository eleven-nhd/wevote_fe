import {createBaseCrudSlice} from "./baseCrudSlice.ts";
import {VotesService} from "../api/services/VotesService.ts";

const { reducer, actions } = createBaseCrudSlice<any>({
    name: "vote",
    fetchPage: async (input) => {
        const res = await VotesService.getPage({body: input});
        return {
            data: res,
            total: res?.count,
        };
    },
    createItem: async (data: any) => {
        await VotesService.create({body: data});
    },
    updateItem: async (id, data) => {
        await VotesService.update({ id: id, body: data});
    },
    deleteItem: async (id) => {
        await VotesService.remove({id: id});
    },
});

export const voteReducer = reducer;
export const voteActions = actions;