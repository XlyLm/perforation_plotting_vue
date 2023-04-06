import {http} from "@/api/axios";

const GET = "get";
const POST = "post";

export const queryParamByConditionsApi = async (data) => {
    return await http(POST, "/parameter/queryParamByConditions", data);
}

export const getFilesDataApi = async (data) => {
    return await http(POST, "/parameter/getFilesData", data);
}