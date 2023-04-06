<template>
    <div class="teams pd-20">
        <MyTable :table-data="data" border :columns="columns" :pagination="pagination"
                 :total="total" @pageChange="query" :height="450">
            <template slot="_front">
                <el-table-column label="序号" v-slot="scope" width="64px" align="center">
                    <span>{{ (pagination.currentPage - 1) * pagination.pageSize + scope.$index + 1}}</span>
                </el-table-column>
            </template>

            <template v-if="flog" slot="_end" >
                <el-table-column label="操作" width="120" v-slot="{row}" fixed="right" align="center">
                    <el-button type="danger" plain size="small" @click="removeMenber(row)">移除成员</el-button>
                </el-table-column>
            </template>
        </MyTable>
    </div>
</template>

<script>
    import {ipcRenderer} from "electron";
    import {deleteTeamsApi, queryMenbersApi, removeMenberApi} from "@/api/teamsApi";
    import {Msg} from "@/untils/resetMessage";

    export default {
        name: "ShowTeam",
        data(){
            return {
                team: null,
                flog: false,
                columns: [
                    {label: "成员昵称", prop: "username", align: 'center', minWidth: "120px"},
                    {label: "成员账号", prop: "account", align: 'center', minWidth: "120px"},
                    {label: "成员生日", prop: "birth", align: 'center', minWidth: "120px"},
                    {label: "成员地址", prop: "address", align: 'center', minWidth: "120px"}
                ],
                data: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                },
                total: 0
            }
        },
        methods: {
            query(){
                queryMenbersApi({
                    name: this.team.name,
                    status: 1,
                    ...this.pagination
                }).then(res=>{
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this.data = data.menbers;
                        this.total = data.count;
                    }
                })
            },
            removeMenber(val){
                this.$confirm("确定移除该成员", "提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(_ => {
                    removeMenberApi({
                        teamName: this.team.name,
                        userId: val.id
                    }).then(res=>{
                        if(res != null){
                            const {data, msg} = res;
                            msg && Msg.success(msg);
                            this.query();
                        }
                    })
                }).catch(_ => {});
            }
        },
        mounted() {
            this.$nextTick(()=>{
                ipcRenderer.on('get-data', (e, data, winId)=>{
                    const {team, flog} = data;
                    this.team = team;
                    this.flog = flog;
                    this.query();
                })
            })
        }
    }
</script>

<style scoped lang="less">
    .teams{
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        background-color: #d3dbe9;
    }
</style>