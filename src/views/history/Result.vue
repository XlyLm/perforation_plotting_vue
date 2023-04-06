<template>
    <div class="result bs-b pd-10">
        <el-tabs type="border-card" class="brs-4">
            <el-tab-pane label="射孔枪爆炸载荷预测结果">
                <div class="res">
                    <el-form :model="explode" class="explode-form" label-width="150px">
                        <el-row :gutter="10">
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="爆炸正压峰值(MPa):" prop="pressurePeak">
                                    <el-input v-model="explode.pressurePeak" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="爆炸负压峰值(MPa):" prop="_pressurePeak">
                                    <el-input v-model="explode._pressurePeak" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>

                <el-tabs type="border-card">
                    <el-tab-pane label="射孔弹爆炸载荷">
                        <h5 class="ta-c">射孔弹爆炸载荷</h5>
                        <div></div>
                    </el-tab-pane>

                    <el-tab-pane label="射孔枪受力">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <h5 class="ta-c">射孔枪y向载荷</h5>
                                <div></div>
                            </el-col>
                            <el-col :span="12">
                                <h5 class="ta-c">射孔枪z向载荷</h5>
                                <div></div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>

            <el-tab-pane label="管柱校验预测结果">
                <div class="res">
                    <el-form :model="verification" class="verification-form" label-width="150px">
                        <el-row :gutter="10">
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="爆炸正压峰值(MPa):" prop="pressurePeak">
                                    <el-input v-model="verification.pressurePeak" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="爆炸负压峰值(MPa):" prop="_pressurePeak">
                                    <el-input v-model="verification._pressurePeak" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="最大轴向拉力(kN):" prop="pulling">
                                    <el-input v-model="verification.pulling" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="最大轴向压力(kN):" prop="pressure">
                                    <el-input v-model="verification.pressure" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="最大轴向位移(m):" prop="yDrift">
                                    <el-input v-model="verification.yDrift" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="最大径向位移(m):" prop="zDrift">
                                    <el-input v-model="verification.zDrift" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="最大等效应力(MPa):" prop="stress">
                                    <el-input v-model="verification.stress" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12">
                                <el-form-item label="安全系数:" prop="safetyFactor">
                                    <el-input v-model="verification.safetyFactor" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>

                <el-tabs type="border-card">
                    <el-tab-pane label="管柱震动轨迹图">
                        <h5 class="ta-c">管柱震动轨迹图</h5>
                        <div></div>
                    </el-tab-pane>

                    <el-tab-pane label="位移">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <h5 class="ta-c">轴向位移云图</h5>
                                <div></div>
                            </el-col>
                            <el-col :span="12">
                                <h5 class="ta-c">最大横向位移所在节点轨迹</h5>
                                <div></div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>

                    <el-tab-pane label="应力">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <h5 class="ta-c">管柱等效应力云图</h5>
                                <div></div>
                            </el-col>
                            <el-col :span="12">
                                <h5 class="ta-c">管柱最大等效应力云图</h5>
                                <div></div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>

                    <el-tab-pane label="油管屈曲判断">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <h5 class="ta-c">油管屈曲判断</h5>
                                <div></div>
                            </el-col>
                            <el-col :span="12">
                                <div class="desc b-2 brs-4">{{verification.condition}}</div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {ipcRenderer} from "electron";
    import {getFilesDataApi} from "@/api/parameter";
    import {Msg} from "@/untils/resetMessage";
    import {paths} from "@/views/allConfig";
    import {toFloat} from "@/untils/formatNum";

    export default {
        name: "Result",
        data(){
            return {
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
            explode(){
                let res = {
                    pressurePeak: "",
                    _pressurePeak: ""
                };
                if(this.explodeRes.length > 0){
                    res.pressurePeak = toFloat(this.explodeRes[1][1],3);
                    res._pressurePeak = toFloat(this.explodeRes[2][1],3);
                }
                return res;
            },
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
    .result{
        min-height: 100vh;
        .desc{
            height: 240px;
        }
    }
</style>