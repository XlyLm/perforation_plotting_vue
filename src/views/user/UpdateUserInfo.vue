<template>
    <div class="update-userInfo">
        <el-form class="update-userInfo-form align pd-50" ref="updateForm" :model="form" label-width="60px" :rules="rules">
            <el-form-item label="账号" prop="account">
                <el-input v-model.trim="form.account" disabled/>
            </el-form-item>
            <el-form-item label="生日" prop="birth" class="update-date">
                <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="出生日期"
                />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model.trim="form.phone" disabled/>
            </el-form-item>
            <el-form-item label="昵称" prop="username">
                <el-input v-model.trim="form.username" />
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model.trim="form.address" />
            </el-form-item>
            <el-form-item class="pdt-20" label-width="120px">
                <el-button type="info" @click="closeUpdate">取消</el-button>
                <el-button type="primary" @click="submitUpdate">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {updateUserInfoApi} from "@/api/userApi";
    import "@/untils/dateFormat";
    import {BrowserWindow} from "@electron/remote";
    import {ipcRenderer} from "electron";
    import {Msg} from "@/untils/resetMessage";
    import "@/untils/dateFormat";

    export default {
        name: "UpdateUserInfo",
        data(){

            return {
                form: {
                    account: "",
                    phone: "",
                    username: "",
                    birth: "",
                    address: ""
                },
                rules: {
                    username: [
                        { required: true, message: '请输入昵称', trigger: 'blur' }
                    ],
                    birth: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                },
                winId: ""
            }
        },
        methods: {
            submitUpdate(){
                this.$refs["updateForm"].validate((valid) =>{
                    if(valid){
                        const birth = this.form.birth;
                        updateUserInfoApi({
                            ...this.form,
                            birth: typeof birth === 'string' ? birth : birth.format("yyyy-MM-dd")
                        }).then(res=>{
                            ipcRenderer.send('send-data-to-main', res, this.winId);
                        })
                    }else{
                        Msg.warning('请按要求填写表单');
                    }
                })
            },
            closeUpdate(){
                BrowserWindow.fromId(this.winId).destroy();
            }
        },
        mounted(){
            this.$nextTick(()=>{
                ipcRenderer.on('get-data', (e, data, winId)=>{
                    this.form = {...data};
                    this.winId = winId;
                })
            })
        }
    }
</script>

<style scoped lang="less">
    .update-userInfo{
        position: relative;
        height: 100%;
        background: url("@/assets/imgs/update_bg.png") no-repeat;
        background-size: 100% 100%;
    }
    .update-userInfo-form{
        width: 360px;
        height: 320px;
        background-color: #d3dbe9;
        border-radius: 4px;
    }
    .update-date .el-form-item__content{
        .el-date-editor.el-input, .el-date-editor.el-input__wrapper {
            width: 100% !important;
        }
    }
</style>

<style lang="less">
    .update-date .el-form-item__content{
        .el-date-editor.el-input, .el-date-editor.el-input__wrapper {
            width: 100% !important;
        }
    }
    .update-userInfo{
        .el-form-item{
            margin-bottom: 18px;
        }
        .el-form-item__content, .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
    }
</style>
