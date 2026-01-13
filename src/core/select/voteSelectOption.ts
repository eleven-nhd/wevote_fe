import {VotesService} from "../../api/services/VotesService.ts";

export const useSelectVote = async () => {
    const res = await VotesService.dataSelect();
    return (res);
};