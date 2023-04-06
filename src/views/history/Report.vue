<template>
    <div class="report bs-b pd-20">
        <h2 class="ta-c">射孔管柱力学分析报告</h2>

        <h5>一、基本参数</h5>
        <el-descriptions class="desc" :labelStyle="labelStyle" :column="1" border>
            <el-descriptions-item>
                <template slot="label">
                    井型
                </template>
                {{format(parameter.type)}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    油管参数
                </template>
                <el-descriptions :column="3" :labelStyle="labelStyle" :contentStyle="contentStyle" border>
                    <el-descriptions-item>
                        <template slot="label">
                            长度(m)
                        </template>
                        {{parameter.firstLength}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            管材密度(kg/m^3)
                        </template>
                        {{parameter.firstDensity}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            外径(mm)
                        </template>
                        {{parameter.firstExternalDiameter}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            内径(mm)
                        </template>
                        {{parameter.firstInternalDiameter}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            钢级
                        </template>
                        {{parameter.steelgrade}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            屈服强度(MPa)
                        </template>
                        {{parameter.pressure}}
                    </el-descriptions-item>
                </el-descriptions>
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    套管参数
                </template>
                <el-descriptions :column="3" :labelStyle="labelStyle" :contentStyle="contentStyle" border>
                    <el-descriptions-item>
                        <template slot="label">
                            外径(mm)
                        </template>
                        {{parameter.secondExternalDiameter}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            内径(mm)
                        </template>
                        {{parameter.secondInternalDiameter}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            其它
                        </template>
                    </el-descriptions-item>
                </el-descriptions>
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    射孔枪参数
                </template>
                <el-descriptions :column="3" :labelStyle="labelStyle" :contentStyle="contentStyle" border>
                    <el-descriptions-item>
                        <template slot="label">
                            外径(mm)
                        </template>
                        {{parameter.thirdExternalDiameter}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            内径(mm)
                        </template>
                        {{parameter.thirdInternalDiameter}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            长度(m)
                        </template>
                        {{parameter.thirdLength}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            孔密(个/m)
                        </template>
                        {{parameter.poreDensity}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            相位角(Π)
                        </template>
                        {{parameter.phaseangle}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            盲孔直径(mm)
                        </template>
                        {{parameter.blindHoleDiameter}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            单发药量(g)
                        </template>
                        {{parameter.dosage}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            炸药爆热比
                        </template>
                        {{parameter.detonationHeatRatio}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            管材密度(kg/m^3)
                        </template>
                        {{parameter.thirdDensity}}
                    </el-descriptions-item>
                </el-descriptions>
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    计算参数
                </template>
                <el-descriptions :column="3" :labelStyle="labelStyle" :contentStyle="contentStyle" border>
                    <el-descriptions-item>
                        <template slot="label">
                            封隔器位置(m)
                        </template>
                        {{parameter.localtion}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            井口套压(MPa)
                        </template>
                        {{parameter.wellPressure}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            射孔液密度(kg/m^3)
                        </template>
                        {{parameter.liquidDensity}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            预测时间(s)
                        </template>
                        {{parameter.time}}
                    </el-descriptions-item>
                </el-descriptions>
            </el-descriptions-item>
        </el-descriptions>

        <h5>二、分析结果</h5>
        <el-descriptions :column="3" :labelStyle="labelStyle" border>
            <el-descriptions-item>
                <template slot="label">
                    爆炸正压峰值(MPa)
                </template>
                {{verification.pressurePeak}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    爆炸负压峰值(MPa)
                </template>
                {{verification._pressurePeak}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    最大轴向拉力(kN)
                </template>
                {{verification.pulling}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    最大轴向压力(kN)
                </template>
                {{verification.pressure}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    最大轴向位移(m)
                </template>
                {{verification.yDrift}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    最大径向位移(m)
                </template>
                {{verification.zDrift}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    最大等效应力(MPa)
                </template>
                {{verification.stress}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    安全系数
                </template>
                {{verification.safetyFactor}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    其它
                </template>
            </el-descriptions-item>

            <el-descriptions-item>
                <template slot="label">
                    屈曲情况
                </template>
                {{verification.condition}}
            </el-descriptions-item>
        </el-descriptions>
        <div class="views mgt-20">
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">轴向位移云图</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">管柱等效应力云图</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">管柱振动轨迹图</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">最大横向位移所在节点轨迹</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">管柱最大等效应力图</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">油管段屈曲判断</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">射孔枪y向载荷</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">射孔枪z向载荷</h6>
                </el-col>

                <el-col :span="12">
                    <div class="box b-1"></div>
                    <h6 class="ta-c">射孔弹爆炸载荷预测</h6>
                </el-col>

                <el-col class="ta-c">
                    <el-button type="success">导出报告</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {ipcRenderer} from "electron";
    import {wellTypeFormat2} from "@/views/allConfig";
    import {getFilesDataApi} from "@/api/parameter";
    import {paths} from "@/views/allConfig";
    import {Msg} from "@/untils/resetMessage";
    import {toFloat} from "@/untils/formatNum";

    export default {
        name: "Report",
        data(){
            return {
                parameter: {},
                format: wellTypeFormat2,
                labelStyle: {
                    width: "96px"
                },
                contentStyle: {
                    width: "136px"
                },
                explodeRes: [],
                explodePow: [],
                explodeTime: [],
                spearYTime: [],
                spearYLoc: [],
                spearYPow: [],
                spearZTime: [],
                spearZLoc: [],
                spearZPow: [],
                pipeRes: [],
                shiftY: [],
                shiftZ: [],
                shiftLoc: [],
                shiftTime: [],
                axleShiftTime: [],
                axleShiftLoc: [],
                axleShift: [],
                maxShiftLX: [],
                maxShiftLY: [],
                maxShiftCX: [],
                maxShiftCY: [],
                power: [],
                powerTime: [],
                powerLoc: [],
                maxPowTime: [],
                maxPowLoc: [],
                pipeLen: [],
                pipePow: [],
                helix: [],
                sine: []
            }
        },
        computed: {
            verification(){
                let res = {
                    pressurePeak: "",
                    _pressurePeak: "",
                    pulling: "",
                    pressure: "",
                    yDrift: "",
                    zDrift: "",
                    stress: "",
                    safetyFactor: "",
                    condition: ""
                };
                if(this.pipeRes.length > 0){
                    res.pressurePeak = toFloat(this.pipeRes[1][1],3);
                    res._pressurePeak = toFloat(this.pipeRes[2][1],3);
                    res.pulling = toFloat(this.pipeRes[3][1],3);
                    res.pressure = toFloat(this.pipeRes[4][1],3);
                    res.yDrift = toFloat(this.pipeRes[5][1],3);
                    res.zDrift = toFloat(this.pipeRes[6][1],3);
                    res.stress = toFloat(this.pipeRes[7][1],3);
                    res.safetyFactor = toFloat(this.pipeRes[8][1],3);
                    // res.condition = this.pipeRes[9][1];
                }
                return res;
            }
        },
        methods: {

        },
        mounted() {
            this.$nextTick(()=>{
                ipcRenderer.on('get-data', (e, data, winId)=>{
                    this.parameter = data;
                    paths.forEach(item=>{
                        getFilesDataApi({
                            name: data.name,
                            path: item.name
                        }).then(res=>{
                            if(res != null){
                                const {data, msg} = res;
                                this[item.key] = data;
                            }
                        })
                    })
                })
            })
        }
    }
</script>

<style scoped lang="less">
    .report{
        min-height: 100vh;
        .box{
            width: 100%;
            height: 240px;
        }
    }
</style>