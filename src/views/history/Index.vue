<template>
    <div class="history pd-50">
        <div class="history-form">
            <el-form :model="form" :gutter="20" ref="historyForm" class="demo-form-inline" :rules="formRules" label-width="88px">
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="12" :lg="8">
                        <el-form-item label="算例名称:" prop="name">
                            <el-input v-model.trim="form.name" placeholder="算例名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="8">
                        <el-form-item label="创建者账号:" prop="account">
                            <el-input v-model.trim="form.account" placeholder="创建者账号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="8">
                        <el-form-item label="所属团队:" prop="teamName">
                            <el-input v-model.trim="form.teamName" placeholder="所属团队"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="8">
                        <el-form-item>
                            <el-button type="primary" @click="queryGet">查询</el-button>
                            <el-button type="info" @click="reset('historyForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="history-table">
            <MyTable :tableData="tableData" border :pagination="pagination" :columns="columns"
                     :total="total" @pageChange="query" :height="450">
                <template slot="_front">
                    <el-table-column label="序号" v-slot="scope" width="64px" align="center">
                        <span>{{ (pagination.currentPage - 1) * pagination.pageSize + scope.$index + 1}}</span>
                    </el-table-column>
                </template>
                <template  slot="_end" >
                    <el-table-column label="操作" width="200px" v-slot="scope" fixed="right" align="center">
                        <el-button type="success" plain size="mini" @click="checkResult(scope.row)">查看结果</el-button>
                        <el-button type="success" plain size="mini" @click="checkReport(scope.row)">查看报告</el-button>
                    </el-table-column>
                </template>
            </MyTable>
        </div>
    </div>
</template>

<script>
    import {queryParamByConditionsApi} from "@/api/parameter"
    import {wellTypeFormat} from "@/views/allConfig";
    import {Msg} from "@/untils/resetMessage";
    import {ipcRenderer} from "electron";

    export default {
        name: "History",
        data(){
            return {
                tableData: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                },
                columns: [
                    {label: "算例名称", prop: "name", align: 'center', minWidth: "136px"},
                    {label: "创建者昵称", prop: "username", align: 'center', minWidth: "120px"},
                    {label: "创建者账号", prop: "account", align: 'center', minWidth: "120px"},
                    {label: "所属团队", prop: "teamName", align: 'center', minWidth: "120px"},
                    {label: "井型", prop: "type", align: 'center', minWidth: "80px", format: wellTypeFormat},
                    {label: "油管长度", prop: "firstLength", align: 'center', minWidth: "120px"},
                    {label: "油管密度", prop: "firstDensity", align: 'center', minWidth: "120px"},
                    {label: "油管外径", prop: "firstExternalDiameter", align: 'center', minWidth: "120px"},
                    {label: "油管内径", prop: "firstInternalDiameter", align: 'center', minWidth: "120px"},
                    {label: "钢级", prop: "steelgrade", align: 'center', minWidth: "80px"},
                    {label: "屈服强度", prop: "pressure", align: 'center', minWidth: "80px"},
                    {label: "套管外径", prop: "secondExternalDiameter", align: 'center', minWidth: "120px"},
                    {label: "套管内径", prop: "secondInternalDiameter", align: 'center', minWidth: "120px"},
                    {label: "射孔枪外径", prop: "thirdExternalDiameter", align: 'center', minWidth: "120px"},
                    {label: "射孔枪长度", prop: "thirdLength", align: 'center', minWidth: "120px"},
                    {label: "孔密", prop: "poreDensity", align: 'center', minWidth: "120px"},
                    {label: "相位角", prop: "phaseangle", align: 'center', minWidth: "80px"},
                    {label: "盲孔直径", prop: "blindHoleDiameter", align: 'center', minWidth: "120px"},
                    {label: "射孔药量", prop: "dosage", align: 'center', minWidth: "120px"},
                    {label: "爆热比", prop: "detonationHeatRatio", align: 'center', minWidth: "120px"},
                    {label: "射孔枪密度", prop: "thirdDensity", align: 'center', minWidth: "120px"},
                    {label: "封隔器位置", prop: "localtion", align: 'center', minWidth: "120px"},
                    {label: "井口套压", prop: "wellPressure", align: 'center', minWidth: "120px"},
                    {label: "射孔液密度", prop: "liquidDensity", align: 'center', minWidth: "120px"},
                    {label: "预测时间", prop: "time", align: 'center', minWidth: "80px"},
                ],
                total: 0,
                form: {
                    name: "",
                    account: "",
                    teamName: ""
                },
                formRules: {
                    name: [{pattern: /^\d*$/, message: "格式错误", trigger: "blur"}],
                    account: [{pattern: /^\d*$/, message: "格式错误", trigger: "blur"}]
                }
            }
        },
        methods: {
            //获取历史记录数据
            query(){
                this.$refs.historyForm.validate(valid => {
                    if(valid){
                        const {id} = this.$store.state.user;
                        queryParamByConditionsApi({
                            userId: id,
                            ...this.form,
                            ...this.pagination
                        }).then(res=>{
                            if(res != null){
                                const {data, msg} = res;
                                msg && Msg.success(msg);
                                this.tableData = data.parameters;
                                this.total = data.count;
                            }
                        })
                    }
                })
            },
            queryGet(){
                this.pagination = {
                    currentPage: 1,
                    pageSize: 10,
                }
                this.query();
            },
            reset(formName){
                this.$refs[formName].resetFields();
                this.queryGet();
            },
            checkResult(val){
                ipcRenderer.send('create-win', "运算结果", 'result', val);
            },
            checkReport(val){
                ipcRenderer.send('create-win', "运算报告", 'report', val);
            }
        },
        mounted() {
            this.query();
        }
    }
</script>

<style scoped>

</style>