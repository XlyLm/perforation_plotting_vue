<template>
    <div class="calculate pd-50">
        <MyTable :tableData="tableData" border :pagination="pagination" :columns="columns"
                 :total="total" @pageChange="query" :height="450">
            <template slot="_front">
                <el-table-column label="序号" v-slot="scope" width="64px" align="center">
                    <span>{{ (pagination.currentPage - 1) * pagination.pageSize + scope.$index + 1}}</span>
                </el-table-column>
            </template>
            <template  slot="_end" >
                <el-table-column label="操作" width="120px" v-slot="scope" fixed="right" align="center">
                    <el-button v-if="scope.row.status == 0" type="primary" plain size="small"
                               @click="checked(scope.row)">开始运算</el-button>
                    <el-button v-else-if="scope.row.status == 1" disabled type="success" plain size="small">申请运算中</el-button>
                    <el-button v-else-if="scope.row.status == 2" disabled type="success" plain size="small">运 算 中</el-button>
                </el-table-column>
            </template>
        </MyTable>
    </div>
</template>

<script>
    import {queryUnParameterApi, caculateParamterApi} from "@/api/calculate"
    import {wellTypeFormat} from "@/views/allConfig";
    import {Msg} from "@/untils/resetMessage";
    export default {
        name: "Index",
        data(){
            return {
                tableData: [],
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                },
                columns: [
                    {label: "算例名称", prop: "name", align: 'center', minWidth: "120px"},
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
                total: 0
            }
        },
        methods: {
            //获取历史记录数据
            query(){
                const {id} = this.$store.state.user;
                queryUnParameterApi({
                    userId: id,
                    ...this.pagination
                }).then(res=>{
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this.tableData = data.parameters;
                        this.total = data.count;
                    }
                })
            },
            checked(val){
                caculateParamterApi({
                    ...val
                }).then(res=>{
                    if(res != null){
                        const {msg} = res;
                        msg && Msg.success(msg);
                        this.query();
                    }
                })
            }
        },
        mounted() {
            this.query();
        }
    }
</script>

<style scoped>

</style>