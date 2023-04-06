<template>
    <div class="home">
        <div class="home-content clearFix">
            <!--导航部分-->
            <div class="home-nav">
                <div class="home-avatar bb-2">
                    <div class="d-i align pointer" @dblclick="openDialog" title="双击修改用户头像">
                        <el-avatar :size="120" :src="user.avatarUrl ?
                    (baseURL + user.avatarUrl) : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                    </div>
                </div>
                <el-menu
                        class="home-nav-item"
                        :default-active="'1-1'"
                        @open="handleOpen"
                        @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>
                            <router-link class="d-b" to="/home/userInfo">
                                <el-menu-item index="1-1">
                                    <i class="el-icon-s-custom"></i>
                                    <span slot="title">用户信息</span>
                                </el-menu-item>
                            </router-link>
                            <router-link class="d-b" to="/home/messages">
                                <el-menu-item index="1-2">
                                    <i class="el-icon-message-solid"></i>
                                    <span slot="title">通知</span>
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-opportunity"></i>
                            <span slot="title">参数录入&计算</span>
                        </template>
                        <el-menu-item-group>
                            <router-link class="d-b" to="/home/entry">
                                <el-menu-item index="2-1">
                                    <i class="el-icon-s-claim"></i>
                                    <span slot="title">参数录入</span>
                                </el-menu-item>
                            </router-link>
                            <router-link class="d-b" to="/home/calculate">
                                <el-menu-item index="2-2">
                                    <i class="el-icon-s-release"></i>
                                    <span slot="title">运算</span>
                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <router-link class="d-b" to="/home/history">
                        <el-menu-item index="3">
                            <i class="el-icon-video-camera-solid"></i>
                            <span slot="title">结果&历史记录</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>

                <el-dialog
                        title="点击选择头像上传"
                        class="avatar-dialog"
                        :visible.sync="dialogVisible"
                        :show-close="false"
                        :close-on-click-modal="false"
                        width = "32%"
                        center
                >
                    <el-upload
                            class="avatar-uploader d-fa"
                            action=""
                            :show-file-list="false"
                            :http-request="uploadFile"
                    >
                        <img v-if="imageUrl" :src="baseURL + imageUrl" class="avatar" alt="avatar">
                        <el-avatar v-else class="pointer" :size="150"
                                   src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' />
                    </el-upload>
                    
                    <div class="dialog-footer clearFix pdt-50">
                        <el-button @click="closeFix">取 消</el-button>
                        <el-button type="primary" @click="fixAvatar">上 传</el-button>
                    </div>
                </el-dialog>
            </div>
            <!--路由展示-->
            <div class="home-view bs-b">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    import {removeAvatarApi, saveAvatarApi, uploadAvatarApi} from "@/api/userApi";
    import {baseURL} from "@/api/axios";
    import {Msg} from "@/untils/resetMessage";

    export default {
        name: "Home",
        data(){
            return {
                dialogVisible: false,
                imageUrl: ""
            }
        },
        computed: {
            user(){
                return this.$store.state.user;
            },
            baseURL(){
                return baseURL;
            }
        },
        methods: {
            handleOpen(){

            },
            handleClose(){

            },
            openDialog(){
                this.dialogVisible = true;
            },
            uploadFile(val){
                const {file} = val;
                const {size} = file;
                if(size > 2*1024*1024) {
                    this.$message.warning('请上传小于2MB的文件');
                    return false;
                }
                const formdata = new FormData();
                formdata.append('file', file);
                uploadAvatarApi(formdata).then(res=>{
                    if(res != null){
                        this.imageUrl = res.data;
                    }
                });
            },
            closeFix(){
                if(this.imageUrl !== ""){
                    removeAvatarApi({avatarUrl: this.imageUrl}).then(res=>{
                        if(res != null){
                            this.imageUrl = "";
                            this.dialogVisible = false;
                        }
                    })
                }else{
                    this.dialogVisible = false;
                }
            },
            fixAvatar(){
                if(this.imageUrl !== ""){
                    saveAvatarApi({
                        phone: this.user.phone,
                        avatarUrl: this.imageUrl
                    }).then(res=>{
                        if(res != null){
                            const {code, data, msg} = res;
                            if(code === "0000"){
                                this.$store.dispatch("saveUser", data);
                                Msg.success(msg);
                            }else{
                                Msg.error(msg);
                            }
                            this.imageUrl = "";
                            this.dialogVisible = false;
                        }
                    })
                }else{
                    Msg.warning("请选择图片进行上传!");
                }
            }
        },
        beforeDestroy(){
            this.closeFix();
        }
    }
</script>

<style scoped lang="less">
    .home{
        width: 100%;
    }
    .home-content{
        position: relative;
        height: 100vh;
    }
    .home-nav{
        position: absolute;
        width: 240px;
        height: 100%;
        user-select: none;
        background-color: #5d708f;
    }
    .router-link-active {
        background-color : rgb(236,245,255);
    }
    .home-avatar{
        position: relative;
        width: 100%;
        height: 200px;
        user-select: none;
    }
    .avatar{
        width: 120px;
        height: 150px;
    }
    .dialog-footer{
        text-align: center;
    }
    .home-view{
        margin-left: 240px;
        width: calc(100% - 240px);
        height: 100vh;
        overflow: auto;
        background-color: #d3dbe9;
    }
</style>

<style lang="less">
    .home-avatar img{
        width: 120px;
    }
</style>