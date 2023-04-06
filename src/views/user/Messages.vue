<template>
    <div class="messages pd-50">
        <el-tabs type="border-card">
            <el-tab-pane label="未查看">
                <MyTable :table-data="data1" border :columns="columns" :pagination="pagination1"
                         :total="total1" @pageChange="query1">
                    <template slot="_front">
                        <el-table-column label="序号" v-slot="scope" width="64px" align="center">
                            <span>{{ (pagination1.currentPage - 1) * pagination1.pageSize + scope.$index + 1}}</span>
                        </el-table-column>
                    </template>

                    <template  slot="_end" >
                        <el-table-column label="操作" width="200" v-slot="{row}" fixed="right" align="center">
                            <el-button v-if="row.type==1000" type="success" plain size="small" @click="checked(row,0)">确认查看</el-button>
                            <template v-else>
                                <el-button type="success" plain size="mini" @click="checked(row,1)">同意请求</el-button>
                                <el-button type="danger" plain size="mini" @click="checked(row,2)">拒绝请求</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </MyTable>
            </el-tab-pane>
            <el-tab-pane label="已查看">
                <MyTable :table-data="data2" border :columns="columns"  :pagination="pagination2"
                         :total="total2" @pageChange="query2">
                    <template slot="_front">
                        <el-table-column label="序号" v-slot="scope" width="64px" align="center">
                            <span>{{ (pagination2.currentPage - 1) * pagination2.pageSize + scope.$index + 1}}</span>
                        </el-table-column>
                    </template>
                </MyTable>
            </el-tab-pane>
            <el-tab-pane label="已失效">
                <MyTable :table-data="data3" border :columns="columns"  :pagination="pagination3"
                         :total="total3" @pageChange="query3">
                    <template slot="_front">
                        <el-table-column label="序号" v-slot="scope" width="64px" align="center">
                            <span>{{ (pagination3.currentPage - 1) * pagination3.pageSize + scope.$index + 1}}</span>
                        </el-table-column>
                    </template>
                </MyTable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {queryMsgsByPageApi, updateMessageApi, agreeMessageApi, refuseMessageApi} from "@/api/messages";
    import {Msg} from "@/untils/resetMessage";

    export default {
        name: "Messages",
        data(){
            return {
                columns: [
                    {label: "消息发起人", prop: "username", align: 'center', minWidth: "120px"},
                    {label: "发起人账号", prop: "userAccount", align: 'center', minWidth: "120px"},
                    {label: "消息创建时间", prop: "createTime", align: 'center', minWidth: "120px"},
                    {label: "所属团队", prop: "teamName", align: 'center', minWidth: "120px"},
                    {label: "消息内容", prop: "description", align: 'center', minWidth: "150px"}
                ],
                data1: [],
                data2: [],
                data3: [],
                pagination1: {
                    currentPage: 1,
                    pageSize: 10,
                },
                pagination2: {
                    currentPage: 1,
                    pageSize: 10,
                },
                pagination3: {
                    currentPage: 1,
                    pageSize: 10,
                },
                total1: 0,
                total2: 0,
                total3: 0,
            }
        },
        methods: {
            query1(){
                queryMsgsByPageApi({
                    status: 0,
                    isOver: 0,
                    approverId: this.$store.state.user.id,
                    ...this.pagination1
                }).then(res=>{
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this.data1 = data.messages;
                        this.total1 = data.count;
                    }
                }).finally(()=>{
                    this.query2();
                    this.query3();
                })
            },
            query2(){
                queryMsgsByPageApi({
                    status: 1,
                    isOver: 0,
                    approverId: this.$store.state.user.id,
                    ...this.pagination2
                }).then(res=>{
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this.data2 = data.messages;
                        this.total2 = data.count;
                    }
                })
            },
            query3(){
                queryMsgsByPageApi({
                    isOver: 1,
                    approverId: this.$store.state.user.id,
                    ...this.pagination3
                }).then(res=>{
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this.data3 = data.messages;
                        this.total3 = data.count;
                    }
                })
            },
            checked(val,code){
                let fn = [updateMessageApi, agreeMessageApi, refuseMessageApi];
                fn[code]({...val}).then(res=>{
                    if(res != null){
                        Msg.success(res.msg);
                        this.query1();
                    }
                })
            },
        },
        mounted() {
            this.query1();
        }
    }
</script>

<style scoped>

</style>