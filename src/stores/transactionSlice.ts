import {createBaseCrudSlice} from "./baseCrudSlice.ts";
import {TransactionsService} from "../api/services/TransactionsService.ts";
import {CommonResultDto} from "../core/components/dto/commonResultDto.ts";

const { reducer, actions } = createBaseCrudSlice<any>({
    name: "transaction",
    fetchPage: async (input) => {
        const res = await TransactionsService.getPage({body: input});
        return {
            data: res,
            total: res?.count,
        };
    }, createItem(): Promise<CommonResultDto<any>> {
        return Promise.resolve(new CommonResultDto<any>());
    }, deleteItem(): Promise<CommonResultDto<any>> {
        return Promise.resolve(new CommonResultDto<any>());
    }, updateItem(): Promise<CommonResultDto<any>> {
        return Promise.resolve(new CommonResultDto<any>());
    }

});

export const transactionReducer = reducer;
export const transactionActions = actions;