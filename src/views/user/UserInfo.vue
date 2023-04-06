<template>
    <div class="userInfo pd-50">
        <el-descriptions
                class="userInfo-desc mgb-20"
                title="个人信息:"
                :column="2"
                border
        >
            <template v-for="(item, index) in userInfo">
                <el-descriptions-item :key="index">
                    <template slot="label">
                        <div class="cell-item">
                            <i class="el-icon-s-home" v-if="item.icon === 'account'"></i>
                            <i class="el-icon-user-solid" v-if="item.icon === 'username'"></i>
                            <i class="el-icon-phone" v-if="item.icon === 'phone'"></i>
                            <i class="el-icon-alarm-clock" v-if="item.icon === 'birth'"></i>
                            <i class="el-icon-location" v-if="item.icon === 'address'"></i>
                            {{item.label}}
                        </div>
                    </template>
                    {{item.value}}
                </el-descriptions-item>
            </template>
        </el-descriptions>

        <el-descriptions
                class="userInfo-desc"
                title="团队信息:"
                :column="1"
                border
        >
            <el-descriptions-item>
                <template slot="label">
                    <div class="cell-item">
                        <i class="el-icon-user-solid"></i>
                        我创的团队
                        <el-button type="primary" size="small" @click="openDailog(createTeam, '请输入要创建的团队名')">
                            点击创建团队
                        </el-button>
                    </div>
                </template>
                <template>
                    <el-popconfirm
                            v-for="item in creator_teams"
                            :key="item.id"
                            class="mgr-10 mgt-10 mgb-10"
                            icon-color="green"
                            @confirm="checkTeams(item, true)"
                            title="查看团队成员？">
                        <el-tag
                                slot="reference"
                                closable
                                @close="deleTeam(item, true)"
                                type="warning">
                            {{item.name}}
                        </el-tag>
                    </el-popconfirm>
                </template>
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    <div class="cell-item">
                        <i class="el-icon-s-home"></i>
                        加入的团队
                        <el-button type="primary" size="small" @click="openDailog(addTeam, '请输入要加入的团队名')">
                            点击加入团队
                        </el-button>
                    </div>
                </template>
                <template>
                    <el-popconfirm
                            v-for="item in menber_teams"
                            :key="item.id"
                            class="mgr-10 mgt-10 mgb-10"
                            icon-color="green"
                            @confirm="checkTeams(item, false)"
                            title="查看团队成员？">
                        <el-tag
                                slot="reference"
                                closable
                                @close="deleTeam(item, false)"
                                type="warning">
                            {{item.name}}
                        </el-tag>
                    </el-popconfirm>
                </template>
            </el-descriptions-item>
        </el-descriptions>

        <div class="userInfo-btn pdt-50 ta-c">
            <el-button  type="success" @click="editUserInfo">修改用户数据</el-button>
            <el-button  type="danger" @click="exitAccount">退出账号</el-button>
        </div>
    </div>
</template>

<script>
    import {exitAccountApi} from "@/api/userApi";
    import { ipcRenderer } from "electron"
    import {Msg} from "@/untils/resetMessage";
    import {addTeamApi, createTeamApi, deleteTeamsApi, queryTeamsApi} from "@/api/teamsApi";

    export default {
        name: "UserInfo",
        data(){
            return {
                creator_teams: [],
                menber_teams: []
            }
        },
        computed: {
            user(){
               return  this.$store.state.user;
            },
            userInfo(){
                const user = this.$store.state.user;
                return [
                    {
                        label: "账号",
                        value: user.account,
                        icon: 'account'
                    },
                    {
                        label: "昵称",
                        value: user.username,
                        icon: 'username'
                    },
                    {
                        label: "手机号",
                        value: user.phone,
                        icon: 'phone'
                    },
                    {
                        label: "生日",
                        value: user.birth,
                        icon: 'birth'
                    },
                    {
                        label: "地址",
                        value: user.address,
                        icon: 'address'
                    },
                ];
            }
        },
        methods: {
            queryTeams(){
                queryTeamsApi({
                    id: this.user.id
                }).then(res => {
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this.creator_teams = data.creatorTeams;
                        this.menber_teams = data.menberTeams;
                    }
                })
            },
            editUserInfo(){
                ipcRenderer.send('create-win', "修改用户信息", 'updateUserInfo', this.$store.state.user);
                ipcRenderer.on('send-data-to-child', (e, {data,msg})=>{
                    msg && Msg.success(msg);
                    this.$store.dispatch('saveUser', data);
                })
            },
            exitAccount(){
                exitAccountApi();
            },
            deleTeam(val, type){
                const msg = type ? "你是团长,确认解散团队?" : "确认退出团队？";
                this.$confirm(msg, "提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(_ => {
                    deleteTeamsApi({
                        teamId: val.id,
                        userId: this.user.id
                    }).then(res=>{
                        if(res != null){
                            const {data, msg} = res;
                            msg && Msg.success(msg);
                            this.queryTeams();
                        }
                    })
                }).catch(_ => {});
            },
            openDailog(fn, title){
                this.$prompt(title, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    inputValidator: value => {
                        if(value == null){
                            return "请输入团队名";
                        }
                        let patt = new RegExp(" ");
                        if(patt.test(value)){
                            return "名称不得包含空格";
                        }
                        return true;
                    }
                }).then(res=>{
                    fn(res.value);
                }).catch(e=>{})
            },
            addTeam(val){
                addTeamApi({
                    name: val,
                    menberId: this.user.id
                }).then(res => {
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                    }
                })
            },
            createTeam(val){
                createTeamApi({
                    name: val,
                    creatorId: this.user.id
                }).then(res => {
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this.creator_teams.push(data);
                    }
                })
            },
            checkTeams(val,flog){
                ipcRenderer.send('create-win', "查看团队成员", 'showTeam', {
                    team: val,
                    flog
                });
            }
        },
        mounted() {
            this.queryTeams();
        }
    }
</script>

<style lang="less">
    .userInfo-desc{
        user-select: none;
        th{
            width: 220px;
        }
    }
</style>