import {http} from "@/api/axios";

const GET = "get";
const POST = "post";

export const queryByTypeApi = (type) => {
    return http(GET, "/dictionary/queryByType", {type});
}

export const addParameterApi = (data) => {
    return http(POST, "/parameter/addParameter", data);
}

export const queryUnParameterApi = async (data) => {
    return await http(POST, "/parameter/queryUnParameter", data);
}

export const caculateParamterApi = async (data) => {
    return await http(POST, "/parameter/caculateParamter", data);
}