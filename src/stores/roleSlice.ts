import {createBaseCrudSlice} from "./baseCrudSlice.ts";
import {RolesService} from "../api/services/RolesService.ts";

const { reducer, actions } = createBaseCrudSlice<any>({
    name: "role",
    fetchPage: async (input) => {
        const res = await RolesService.getPage({body: input});
        return {
            data: res,
            total: res?.count,
        };
    },
    createItem: async (data: any) => {
        await RolesService.create({body: data});
    },
    updateItem: async (id, data) => {
        await RolesService.update({ id: id, body: data});
    },
    deleteItem: async (id) => {
        await RolesService.remove({id: id});
    },
});

export const roleReducer = reducer;
export const roleActions = actions;