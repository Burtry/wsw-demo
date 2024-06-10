<script setup>
import { ref } from "vue"
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from "vue-router"
import { registerAPI } from "@/api/user";

const userStore = useUserStore();
const router = useRouter()
const formRef = ref(null)
const form = ref({
    account: '',
    password: '',
    agree: true
})

const rules = {
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
}

const doLogin = async () => {
    const { account, password } = form.value
    formRef.value.validate(async (valid) => {
        if (valid) {

            // 1. 登录
            await userStore.getUserInfo(account, password);
            const code = userStore.userInfo.id  //如果id存在，说明存在用户，登录成功
            if (code) {
                ElMessage({ type: 'success', message: '登录成功' });
                // 2. 跳转首页
                router.replace({ path: '/' });
            }
        }
    })
}
//注册
const doRegister = ref(false)
const doRegisterFun = async () => {
    if (registerForm.value.password !== registerForm.value.checkPass) {
        ElMessage({ type: 'error', message: '两次密码不一致' })
        return
    }
    //表单验证
    try {
        await ruleFormRef.value.validate()
    } catch (error) {
        ElMessage({ type: 'error', message: '请填写正确的信息' })
        return
    }
    doRegister.value = false


    //向后端发送注册请求
    const res = await registerAPI(registerForm.value)
    if (res.code === 1) {
        ElMessage({ type: 'success', message: '注册成功' })
    }
    //清空表单
    registerForm.value = {}

}
const ruleFormRef = ref()
const registerForm = ref({
    account: '',
    password: '',
    checkPass: '',
    username: '',
    sex: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: ''
})

const registerRules = {
    account: [
        { required: true, message: '请输入正确的账号', trigger: 'blur' },
        { min: 3, max: 10, message: '账号长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
    ],
    checkPass: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },

    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],

}

</script>


<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">万事屋</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账户登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <el-form label-position="right" label-width="60px" status-icon ref="formRef" :model="form"
                            :rules="rules">
                            <el-form-item label="账户" prop="account">
                                <el-input v-model="form.account" />
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="form.password" type="password" show-password />
                            </el-form-item>
                            <el-button size="large" class="subBtn" @click="doLogin">登录</el-button>
                            <div>
                                <el-button size="small" class="register" @click="doRegister = true">注册</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <!-- 注册表单 -->
        <el-dialog v-model="doRegister" title="注册账号" width="500" :before-close="handleClose">

            <!-- 表单内容 -->

            <el-form ref="ruleFormRef" style="max-width: 600px" :model="registerForm" :rules="registerRules"
                label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="账号" prop="account">
                    <el-input v-model="registerForm.account" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerForm.password" type="password" show-password />
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="registerForm.checkPass" type="password" show-password />
                </el-form-item>
                <el-form-item label="用户名(昵称)" prop="username">
                    <el-input v-model="registerForm.username" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="registerForm.sex" size="large" class="ml-4">
                        <el-radio value="男" size="large">男</el-radio>
                        <el-radio value="女" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="registerForm.phone" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email" />
                </el-form-item>
                <el-form-item label="现居地">
                    <el-input v-model="registerForm.address" />
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="registerForm.detailAddress" />
                </el-form-item>


            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="doRegister = false; registerForm = {}">取消</el-button>
                    <el-button type="primary" @click="doRegisterFun">
                        注册
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <footer class="login-footer">
            <div class="container">
                <p>万事屋企业文化</p>
                <p>
                    <a href="javascript:;">不抛弃，不放弃</a>
                    <a href="javascript:;">有福独享，有难同当</a>
                    <a href="javascript:;">大难临头各自飞</a>
                    <a href="javascript:;">有钱好办事</a>
                    <a href="javascript:;">死也要拉个垫背的</a>
                    <a href="javascript:;">一入银魂深似海</a>
                    <a href="javascript:;">从此节操是路人</a>
                </p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang='scss'>
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            margin-top: -40px;
            background: url("@/assets/images/logo.png") no-repeat center 55px / contain;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: #27ba9b;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    background: url('@/assets/images/bkg.png') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 55%;
        top: 54px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: #069;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: #cf4444;
                    }

                    &.active,
                    &:focus {
                        border-color: #069;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: #cf4444;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: #069;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: #069;
    width: 100%;
    color: #fff;
}

.register {
    //元素右对齐
    margin-left: 292px;
    margin-top: 10px;
    color: #069;
}
</style>