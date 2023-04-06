<template>
    <div class="login">
        <div class="login-content align clearFix">
            <div class="login-title f-l pdt-40">
                <i class="iconfont icon-jurassic_drilling-platform logo"></i>
                <div class="left-title">射孔软件</div>
                <div class="small">Perforation Plotting</div>
            </div>
            <div class="login-form-content f-r">
                <div class="form-title pd-10">{{title}}</div>
                <el-form class="pd-20" ref="loginForm" :rules="rules" :model="form">
                    <el-form-item prop="phone">
                        <el-input v-model.trim="form.phone" placeholder="请输入账号/手机号" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model.trim="form.password" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item v-if="flag !== 'login'" prop="checkPw">
                        <el-input type="password" v-model.trim="form.checkPw" placeholder="请重新输入密码" />
                    </el-form-item>
                    <el-form-item class="captcha-content clearFix" prop="captcha">
                        <el-input class="f-l" v-model.trim="form.captcha" placeholder="请输入验证码" />
                        <!-- 验证码 显示 -->
                        <img class="captcha pointer f-r" @click="getCaptcha" id="verifyimg" style="margin-left: 20px;"/>
                    </el-form-item>
                    <el-form-item class="button">
                        <template v-if="flag === 'login'">
                            <el-button type="primary" size="small" @click="handleLogin">登录</el-button>
                            <a href="javascript:;" class="link" @click="resetPw">忘记密码？</a>
                            <a href="javascript:;" class="link" @click="toRegister">去注册</a>
                        </template>
                        <template v-else-if="flag === 'register'">
                            <el-button type="success" size="small" @click="handleRegister">注册</el-button>
                            <a href="javascript:;" class="link" @click="toLogin">去登录</a>
                        </template>
                        <template v-else>
                            <el-button type="success" size="small" @click="handleResetPw">提交</el-button>
                            <a href="javascript:;" class="link" @click="toLogin">返回登录</a>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, {baseURL} from "@/api/axios"
    import {chackForm, loginApi, registerApi, resetPwApi, saveUser} from "@/api/userApi";

    export default {
        name: "Login",
        data(){
            const validatePhone = (rule, value, callback) => {
                    if(value === ''){
                        return callback(new Error('手机号不能为空'));
                    }else if(!/^1(3|4|5|6|7|8)\d{9}$/.test(value)){
                        return callback(new Error('请输入正确手机号'));
                    }else{
                        callback();
                    }
            }
            const validatePw  = (rule, value, callback) => {
                if(!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,})$/.test(value)) {
                    return callback(new Error('密码必须由6位及以上字母和数字组成'));
                }
                callback();
            }
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else {
                    if (value !== this.form.password) {
                        callback(new Error('两次输入密码不一致!'));
                    }
                    callback();
                }
            };
            const validateCaptcha = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if (!/^((?=.*[0-9])|(?=.*[a-zA-Z]))(.{4})$/.test(value)) {
                        callback(new Error('验证码格式错误!'));
                    }
                    callback();
                }
            }

            return {
                flag: 'login',
                rules: {
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePw, trigger: 'blur' }
                    ],
                    checkPw: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    captcha: [
                        { validator: validateCaptcha, trigger: 'blur' }
                    ]
                },
                form: {
                    phone: "",
                    password: '',
                    checkPw: '',
                    captcha: ''
                },
            }
        },
        methods: {
            //获取验证码
           getCaptcha(){
               axios({
                   method: "GET",
                   url: baseURL + '/userInfo/verifyCode',
                   responseType: 'arraybuffer'
               }).then(data=>{
                   document.getElementById("verifyimg").src =
                       window.URL.createObjectURL(new Blob([data], { type: 'image/png' }));
               })
           },
            //登录
            handleLogin(){
                chackForm(this.$refs['loginForm'], saveUser, loginApi, {...this.form}, this);
            },
            //注册
            handleRegister(){
               chackForm(this.$refs['loginForm'], saveUser, registerApi, {...this.form}, this);
            },
            //修改密码
            handleResetPw(){
               chackForm(this.$refs['loginForm'], saveUser, resetPwApi, {...this.form}, this);
            },
            //重置密码
            resetPw(){
                this.resetForm();
                this.flag = 'resetPw';
            },
            //去注册
            toRegister(){
                this.resetForm();
                this.flag = 'register';
            },
            //去登录
            toLogin(){
                this.resetForm();
                this.flag = 'login';
            },
            //重置表单
            resetForm(){
               this.$refs['loginForm'].resetFields();
            }
        },
        computed: {
            title(){
                if(this.flag === 'login'){
                    return '用户登录';
                }else if(this.flag === 'register'){
                    return '注册新用户';
                }else{
                    return '修改密码';
                }
            }
        },
        mounted(){
            this.getCaptcha();
        }
    }
</script>

<style scoped lang="less">
    .login{
        position: relative;
        width: 100%;
        height: 100%;
        background: url('@/assets/imgs/login_bg.png') no-repeat;
        background-size: 100% 100%;
    }
    .login-content{
        width: 450px;
        height: 320px;
        overflow: hidden;
        border-radius: 12px;

        .login-title{
            width: 200px;
            height: 100%;
            color: white;
            line-height: 1.5;
            text-align: center;
            background-color: rgba(0,90,127,0.9);
        }
        .logo{
            font-size: 86px;
        }
        .left-title{
            font-weight: bold;
            color: white;
        }
        .login-form-content{
            width: 250px;
            height: 100%;
            background-color: white;
        }
        .form-title{
            font-size: 24px;
            border-bottom: 2px solid rgba(0,90,127,0.9);
        }
        .captcha-content .el-input{
            width: 120px;
        }
        .captcha{
            margin: 0 !important;
        }
        .button{
            .el-form-item__content{
                display: flex !important;
                justify-content: space-between !important;
            }
            .el-button{
                font-size: 14px !important;
            }
        }
        .link{
            position: relative;
            top: 6px;
            line-height: 1.2;
            font-size: 12px;
            margin: 0 6px;
            color: #3967FF;
            text-decoration: underline;
        }
    }
</style>

<style lang="less">
    .login .login-content{
        .el-form-item{
            margin-bottom: 18px;
        }
        .el-form-item__content, .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
    }
</style>