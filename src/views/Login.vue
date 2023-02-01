<template>
    <div style="height: 100vh;overflow: hidden; position: relative; background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);">
        <div class="form-box">
          <el-form ref="ruleFormRef" :rules="rules" :model="form" status-icon>
            <h2 style="text-align: center;">登录</h2>
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入账号" :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" show-password placeholder="请输入密码"
                autocomplete="new-password" :prefix-icon="Lock"></el-input>
            </el-form-item>
            <div style="margin-bottom: 0.83em">
              <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
            </div>
            <div>
                <el-button link style="float: left;" @click="handleResetPassword">忘记密码？</el-button>
                <el-button type="primary" link @click="router.push('/register')" style="float: right;">没有账号？请注册</el-button>
            </div>
          </el-form>
        </div>
        <el-dialog v-model="passwordVis" :close-on-click-modal="false" title="忘记密码">
            <el-form :model="passwordForm" label-width="100px" ref="rulePasswordFormRef" :rules="passwordRules" status-icon>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="passwordForm.email" autocomplete="off" />
              </el-form-item>
              <el-form-item label="验证码" prop="emailCode">
                <div style="display: flex;">
                    <el-input style="flex: 1;" v-model="passwordForm.emailCode" clearable></el-input>
                    <el-button style="width: 120px; margin-left: 5px;" @click="sendEmail" :disabled="time > 0">点击发送<span v-if="time">（{{time}}）</span></el-button>
                </div>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="passwordVis = false">Cancel</el-button>
                <el-button type="primary" @click="resetPassword">
                  Confirm
                </el-button>
              </span>
            </template>
          </el-dialog>
      </div>
</template>

<script setup>
    import { nextTick, reactive, ref } from "vue"
    import { User, Lock } from '@element-plus/icons-vue'
    import router from '@/router'
    import request from "@/utils/request"
    import { ElMessage } from "element-plus"
    import { useUserStore } from "@/stores/user"   // 导入
    const ruleFormRef = ref()
    const passwordVis = ref(false)
    const rulePasswordFormRef = ref()
    const interval = ref(-1)
    const time = ref(0)
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const rules = reactive({
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ],
})
const passwordRules = reactive({
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        emailCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
})

    const form = reactive({})
    const passwordForm = reactive({})
    const store = useUserStore()

    const handleResetPassword = () => {
      passwordVis.value = true
      //触发表单重置
      nextTick(() => {
        rulePasswordFormRef.value.resetFields()
      })
    }
    const login = () => {
        ruleFormRef.value.validate(valid => {
            if(valid){
                request.post("/login", form).then(res => {
                // console.log(res)
                if(res.code == '200'){
                    
                    // store.$patch({user: res.data})
                    store.setLoginInfo(res.data)
                    ElMessage.success('登录成功')
                    router.push('/')
                }else {
                    ElMessage.error(res.msg);
                }
            })
            }
        })
    }
const times = () => {
  // 清空定时器
  if (interval.value >= 0) {
    clearInterval(interval.value)
  }
  time.value = 10
  interval.value = setInterval(() => {
    if (time.value > 0) {
      time.value --
    }
  }, 1000)
}

    const sendEmail = () => {
        if(!reg.test(passwordForm.email)) {
            ElMessage.warning("请输入合法的邮箱")
            return
        }
        request.get("/email", { 
            params: {
                email: passwordForm.email,
                type: "RESETPASSWORD"
            }
        }).then(res => {
            if(res.code === '200'){
              times() //倒计时
              ElMessage.success('发送成功，有效期5分钟')
            }else {
              ElMessage.error(res.msg);
            }
        })
    }

    const resetPassword = () => {
        rulePasswordFormRef.value.validate(valid => {
            if(valid){
                request.post("/password/reset", passwordForm).then(res => {
                if(res.code === '200'){
                    ElMessage.success('重置成功，您的密码为：' + res.data)
                    passwordVis.value = false
                }else {
                    ElMessage.error(res.msg);
                }
            })
            }
        })
    }
    // console.log(store.user)
</script>

<style scoped>
.form-box {
    width: 400px; border-radius: 10px; margin: 0 auto; box-shadow: 0 0 5px -2px rgb(0,0,0,.5); 
    background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
    padding: 50px;
    position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);
}
</style>