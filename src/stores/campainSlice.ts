import {createBaseCrudSlice} from "./baseCrudSlice.ts";
import {CampaignsService} from "../api/services/CampaignsService.ts";

const { reducer, actions } = createBaseCrudSlice<any>({
    name: "campaign",
    fetchPage: async (input) => {
        const res = await CampaignsService.getPage({body: input});
        return {
            data: res,
            total: res?.count,
        };
    },
    createItem: async (data: any) => {
        return await CampaignsService.create({body: data});
    },
    updateItem: async (id, data) => {
        return await CampaignsService.update({ id: id, body: data});
    },
    deleteItem: async (id) => {
        return await CampaignsService.remove({id: id});
    },
});

export const campaignReducer = reducer;
export const campaignActions = actions;