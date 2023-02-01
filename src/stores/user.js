import { defineStore } from 'pinia'   // 导入 defineStore

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，
// 同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，
// `useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
  // 其他配置...
  state: () => ({
    loginInfo: {}   // {  user: {}, token: '' }
}),
getters: {
    getUserId() {
        return this.loginInfo.user ? this.loginInfo.user.id : 0
    },
    getUser() {
        return this.loginInfo.user || {}
    },
    getBearerToken() {
        return this.loginInfo.token ? 'Bearer ' + this.loginInfo.token : ''
    },
    getToken() {
        return this.loginInfo.token || ""
    }
},
actions: {
    setLoginInfo(loginInfo) {
        this.loginInfo = loginInfo
    },
    setUser(user) {
        // this.loginInfo.user = JSON.parse(JSON.stringify(user))
        this.loginInfo.user = user
    }
},
//数据持久化
  persist: true
})