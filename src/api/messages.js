import {http} from "@/api/axios";

const GET = "get";
const POST = "post";

export const queryMsgsByPageApi = async (data) => {
    return await http(POST, "/messages/queryMsgsByPage", data);
}

export const updateMessageApi = async (data) => {
    return await http(POST, "/messages/updateMessage", data);
}

export const agreeMessageApi = async (data) => {
    return await http(POST, "/messages/agreeMessage", data);
}

export const refuseMessageApi = async (data) => {
    return await http(POST, "/messages/refuseMessage", data);
}