import {http} from "@/api/axios";

const GET = "get";
const POST = "post";

export const queryTeamsApi = async (data) => {
    return await http(POST, "/teams/queryTeams", data);
}

export const deleteTeamsApi = async (data) => {
    return await http(POST, "/teams/deleteTeams", data);
}

export const addTeamApi = async (data) => {
    return await http(POST, "/teams/addTeam", data);
}

export const createTeamApi = async (data) => {
    return await http(POST, "/teams/createTeam", data);
}

export const queryMenbersApi = async (data) => {
    return await http(POST, "/teams/queryMenbers", data);
}

export const removeMenberApi = async (data) => {
    return await http(POST, "/teams/removeMenber", data);
}