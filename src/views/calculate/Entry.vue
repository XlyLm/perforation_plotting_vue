<template>
    <div class="entry pd-50">
        <el-form :model="form" class="entry-form" ref="entryForm" :rules="entryRules" label-width="130px">
            <div class="parameter-name">
                <el-form-item label="算例名称:" required prop="name" label-width="88px">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </div>

            <div class="parameter-name">
                <el-form-item label="所属团队:" required prop="teamName" label-width="88px">
                    <el-select v-model="form.teamName" placeholder="所属团队">
                        <el-option
                                v-for="(item, index) in teams"
                                :key="index"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>

            <div class="box pd-20 mgb-20">
                <div class="title">井型</div>
                <el-form-item prop="type" required>
                    <el-radio-group v-model="form.type">
                        <el-radio :label="10000">直井</el-radio>
                        <el-radio :label="20000">斜度井</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>

            <div class="box pd-20 mgb-20">
                <div class="title">油管参数</div>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="长度(m):" prop="firstLength" required>
                            <el-input v-model.trim="form.firstLength" placeholder="长度(m)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="油管密度(kg/m3):" prop="firstDensity" required>
                            <el-input v-model.trim="form.firstDensity" placeholder="油管密度(kg/m3)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="油管外径(mm):" prop="firstExternalDiameter" required>
                            <el-select v-model="form.firstExternalDiameter" @change="getChild" placeholder="油管外径(mm)">
                                <el-option
                                        v-for="(item, index) in firstExternalDiameters"
                                        :key="index"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="油管内径(mm):" prop="firstInternalDiameter" required>
                            <el-select v-model="form.firstInternalDiameter" no-data-text="请先选择外径" placeholder="油管内径(mm)">
                                <el-option
                                        v-for="(item,index) in firstInternalDiameters"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="钢级:" prop="steelgrade" required>
                            <el-select v-model="form.steelgrade" @change="getPressure" placeholder="钢级">
                                <el-option
                                        v-for="(item, index) in steelgrades"
                                        :key="index"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="屈服强度(MPa):" prop="pressure" required>
                            <el-input v-model.trim="form.pressure" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div class="box pd-20 mgb-20">
                <div class="title">套管参数</div>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="套管外径(mm):" prop="secondExternalDiameter" required>
                            <el-select v-model="form.secondExternalDiameter" @change="getChild" placeholder="套管外径(mm)">
                                <el-option
                                        v-for="(item, index) in secondExternalDiameters"
                                        :key="index"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="套管内径(mm):" prop="secondInternalDiameter" required>
                            <el-select v-model="form.secondInternalDiameter" no-data-text="请先选择外径" placeholder="套管内径(mm)">
                                <el-option
                                        v-for="(item, index) in secondInternalDiameters"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div class="box pd-20 mgb-20">
                <div class="title">射孔枪参数</div>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="射孔枪外径(mm):" prop="thirdExternalDiameter" required>
                            <el-select v-model="form.thirdExternalDiameter" @change="getChild" placeholder="射孔枪外径(mm)">
                                <el-option
                                        v-for="(item, index) in thirdExternalDiameters"
                                        :key="index"
                                        :label="item.label"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="射孔枪内径(mm):" prop="thirdInternalDiameter" required>
                            <el-select v-model="form.thirdInternalDiameter" no-data-text="请先选择外径" placeholder="射孔枪内径(mm)">
                                <el-option
                                        v-for="(item, index) in thirdInternalDiameters"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="射孔枪长度(m):" prop="thirdLength" required>
                            <el-input v-model.trim="form.thirdLength" placeholder="射孔枪长度(m)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="孔密(个/m):" prop="poreDensity" required>
                            <el-input v-model.trim="form.poreDensity" placeholder="孔密(个/m)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="相位角(Π):" prop="phaseangle" required>
                            <el-select v-model="form.phaseangle" placeholder="相位角(Π)">
                                <el-option
                                        v-for="(item, index) in phaseangles"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="盲孔直径(mm):" prop="blindHoleDiameter" required>
                            <el-input v-model.trim="form.blindHoleDiameter" placeholder="盲孔直径(mm)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="射孔药量(g):" prop="dosage" required>
                            <el-input v-model.trim="form.dosage" placeholder="射孔药量(g)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="爆热比(%):" prop="detonationHeatRatio" required>
                            <el-input v-model.trim="form.detonationHeatRatio" placeholder="爆热比(%)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="射孔枪密度:" prop="thirdDensity" required>
                            <el-input v-model.trim="form.thirdDensity" placeholder="射孔枪密度(kg/m3)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div class="box pd-20 mgb-20">
                <div class="title">计算参数</div>
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="封隔器位置(m):" prop="localtion" required>
                            <el-input v-model.trim="form.localtion" placeholder="封隔器位置(m)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="井口套压(MPa):" prop="wellPressure" required>
                            <el-input v-model.trim="form.wellPressure" placeholder="井口套压(MPa)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="射孔液密度:" prop="liquidDensity" required>
                            <el-input v-model.trim="form.liquidDensity" placeholder="射孔液密度(kg/m3)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="8" :lg="6">
                        <el-form-item label="预测时间(s):" prop="time" required>
                            <el-input v-model.trim="form.time" placeholder="预测时间(s)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <div class="box pd-20 mgb-20">
                <div class="title">井眼轨迹</div>
                <div class="canvas">
                    <div class="d-fa canvas-title ta-c">
                        <div>井深(m)</div>
                        <div class="line"></div>
                        <div>井斜角(。)</div>
                        <div class="line"></div>
                        <div>方位角(。)</div>
                        <div class="line"></div>
                        <div>垂深(m)</div>
                        <div class="line"></div>
                        <div>梯度(。)</div>
                    </div>
                    <div class="canvas-content"></div>
                </div>
            </div>

            <el-form-item label-width="0" class="entry-btn ta-c">
                <ResolveCsv v-on:getCsvData="getCsvData">
                    <el-button type="primary">导入井眼轨迹</el-button>
                </ResolveCsv>
                <el-button type="success" class="mgl-10" @click="saveParam('entryForm')">保存参数</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {queryByTypeApi,addParameterApi} from "@/api/calculate";
    import {queryTeamsApi} from "@/api/teamsApi";
    import {Msg} from "@/untils/resetMessage";

    export default {
        name: "entry",
        data(){
            const validate = (rule, value, callback) => {
                if(value == ""){
                    return callback(new Error('请输入!'));
                }else if(!/(^(([^0][0-9]*|0)\.([0-9]+)$))|(^([^0][0-9]*|0)$)/.test(value)){
                    return callback(new Error('格式错误,请输入数字!'));
                }else{
                    callback();
                }
            }
            return {
                teams: [],
                steelgrades: [],
                firstExternalDiameters: [],
                firstInternalDiameters: [],
                secondExternalDiameters: [],
                secondInternalDiameters: [],
                thirdExternalDiameters: [],
                thirdInternalDiameters: [],
                phaseangles: [],
                form: {
                    teamName: "",
                    name: "",
                    type: 10000,
                    firstLength: "",
                    firstDensity: "",
                    firstExternalDiameter: "",
                    firstInternalDiameter: "",
                    steelgrade: "",
                    pressure: "",
                    secondExternalDiameter: "",
                    secondInternalDiameter: "",
                    thirdExternalDiameter: "",
                    thirdInternalDiameter: "",
                    thirdLength: "",
                    poreDensity: "",
                    phaseangle: "",
                    blindHoleDiameter: "",
                    dosage: "",
                    detonationHeatRatio: "",
                    thirdDensity: "",
                    localtion: "",
                    wellPressure: "",
                    liquidDensity: "",
                    time: ""
                },
                entryRules: {
                    firstLength: [{ validator: validate, trigger: 'blur' }],
                    firstDensity: [{ validator: validate, trigger: 'blur' }],
                    thirdLength: [{ validator: validate, trigger: 'blur' }],
                    poreDensity: [{ validator: validate, trigger: 'blur' }],
                    blindHoleDiameter: [{ validator: validate, trigger: 'blur' }],
                    dosage: [{ validator: validate, trigger: 'blur' }],
                    detonationHeatRatio: [{ validator: validate, trigger: 'blur' }],
                    thirdDensity: [{ validator: validate, trigger: 'blur' }],
                    localtion: [{ validator: validate, trigger: 'blur' }],
                    wellPressure: [{ validator: validate, trigger: 'blur' }],
                    liquidDensity: [{ validator: validate, trigger: 'blur' }],
                    time: [{ validator: validate, trigger: 'blur' }]
                },
                locusData: []
            }
        },
        methods: {
            getChild(val){
                let objs = {
                    "30000": "firstInternalDiameters",
                    "40000": "secondInternalDiameters",
                    "50000": "thirdInternalDiameters"
                }
                queryByTypeApi(val.child).then(res=>{
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this[objs[val.type]] = data;
                    }
                })
            },
            getPressure(val){
                this.form.pressure = val.value;
            },
            saveParam(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        const {id} = this.$store.state.user;
                        const data = {
                            ...this.form,
                            creatorId: id
                        };
                        data.firstExternalDiameter = data.firstExternalDiameter.value;
                        data.secondExternalDiameter = data.secondExternalDiameter.value;
                        data.thirdExternalDiameter = data.thirdExternalDiameter.value;
                        data.steelgrade = data.steelgrade.label;

                        addParameterApi({
                            ...data,
                            types: true
                        }).then(res=>{
                            if(res != null){
                                const {data, msg} = res;
                                msg && Msg.success(msg);
                                this.$refs[formName].resetFields();
                                this.form.name = new Date().getTime();
                                this.form.type = 10000;
                                this.show = false;
                            }
                        })
                    }
                })
            },
            getCsvData(val){
                console.log(val);
                this.locusData = val;
            }
        },
        mounted() {
            this.form.name = new Date().getTime();
            let dics = [20000, 30000, 40000, 50000, 60000];
            let arrs = ["steelgrades", "firstExternalDiameters", "secondExternalDiameters", "thirdExternalDiameters", "phaseangles"];
            //获取数据
            dics.map((item, index)=>{
                queryByTypeApi(item).then(res=>{
                    if(res != null){
                        const {data, msg} = res;
                        msg && Msg.success(msg);
                        this[arrs[index]] = data;
                    }
                })
            })
            //获取团队
            queryTeamsApi({
                id: this.$store.state.user.id
            }).then(res=>{
                if(res != null){
                    const {creatorTeams, menberTeams} = res.data;
                    this.teams = [...creatorTeams, ...menberTeams];
                }
            })
        }
    }
</script>

<style scoped lang="less">
    .entry{
        .box{
            position: relative;
            border: 2px solid gray;
            border-radius: 4px;
        }
        .title{
            position: absolute;
            padding: 0 4px;
            left: 12px;
            top: 0;
            transform: translateY(-50%);
            display: inline-block;
            background-color: #d3dbe9;
        }
        .canvas{
            border: 2px solid gray;
            .canvas-title{
                line-height: 40px;
                border-bottom: 1px solid gray;
            }
            .line{
                height: 40px;
                width: 1px;
                background-color: gray;
            }
            .canvas-content{
                height: 320px;
                background-color: white;
            }
        }
    }
</style>

<style lang="less">
    .entry{
        .parameter-name{
            .el-form-item__label{
                font-weight: bold;
                color: #000;
            }
            .el-input{
                width: 240px;
            }
        }
    }
</style>