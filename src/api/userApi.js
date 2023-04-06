import {http} from "@/api/axios";
import crypto from "@/untils/cryptojs";
import {Msg} from "@/untils/resetMessage";
import debounce from "@/untils/debounce";
import store from "@/store/index";
import router from "@/router/index"

const GET = "get";
const POST = "post";
const KEY = "123456789key";
const  IV = "123456789iv";

function createUser(data) {
    return {
        ...data,
        account: data.phone,
        password: crypto.encrypt(data.password, KEY, IV),
    }
}

export const chackForm = (ref, fn, ...data) => {
    ref.validate((valid) =>{
        if(valid){
            fn(...data);
        }else{
            Msg.warning('请按要求填写表单');
        }
    })
}

export const saveUser = debounce((fn, data, e) => {
    fn(data).then(res=>{
        if(res != null){
            const { data, msg } = res;
            msg && Msg.success(msg);
            e.$store.dispatch('saveUser', data);
            e.$router.replace({path: "/home"}).catch(e => {});
        }
    })
}, 1500)

export const registerApi = async (data) => {
    const user = createUser(data);
    return await http(POST, "/userInfo/add", user);
}

export const loginApi = async (data) => {
    const user = createUser(data);
    return await http(POST, "/userInfo/queryByPhone", user);
}

export const resetPwApi = async (data) => {
    const user = createUser(data);
    return await http(POST, "/userInfo/updatePw", user);
}

export const uploadAvatarApi = async (data) => {
    data.types = true;
    return await http(POST, "/userInfo/uploadAvatar", data);
}

export const removeAvatarApi = (data) => {
    return http(POST, "/userInfo/removeAvatar", data)
}

export const saveAvatarApi = (data) => {
    return http(POST, "/userInfo/saveAvatar", data);
}

export const exitAccountApi = () => {
    http(POST, "/userInfo/exitAccount", store.state.user).then(res => {
        if(res != null){
            Msg.success(res.msg);
            store.dispatch("saveUser", {}).then(r => {});
            router.push({path: "/login"}).then(r => {});
        }
    });
}

export const updateUserInfoApi = async (data) => {
    return await http(POST, "/userInfo/updateUser", data);
}