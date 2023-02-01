<script setup>
import request from "@/utils/request"
import { Compass, View, Pointer, ChatLineRound } from '@element-plus/icons-vue'

const load = () => {
  request.get('/user').then( res => {
    console.log(res.data)
  })
}

load()
</script>

<template>
  <div style=" background-color: white; border-radius: 10px;" class="container-height">
    <div style="display: flex; padding: 10px;">
      <!-- 话题动态 -->
      <div class="dynamic-box" style="width: 60%; padding: 20px; border: 1px solid #ccc;">
        <div style="display: flex;">
          <div style="width: 80px;">
            <img style="width: 50px; height: 50px; margin-right: 20px; border-radius: 50%;" src="http://localhost:9090/file/download/9d434e8fe7084520853ab59652fef0b5.png?loginId=ef47f38bd8a44ad08b8959cfa1d0079a&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJlZjQ3ZjM4YmQ4YTQ0YWQwOGI4OTU5Y2ZhMWQwMDc5YSIsInJuU3RyIjoibTBtWTBmUGxVNUVpYjFjS2M2REdHdVY0b1ByaExqSDIifQ.pK4GOvsQodKIbP8TQXdESVi5zl1crP-yNvxmDtIXFwA" alt="">
          </div>
          <div style="flex: 1; line-height: 25px;">
            <div style="font-weight: bold;">lihyi</div>
            <div style="font-size: 12px; color: #999;">2022-12-16 · 来自Xiaomi 12S</div>
          </div>
          <el-button>关注</el-button>
        </div>

        <div class="content">
          米粉给反馈的图，智能说颜值太高了！
          小米米家厨房工具套装，提升幸福感的厨房小物件
          计时器可以来链接米家，还能连蓝牙，和家里的智能灯具联接就能直接做开关！
          厨房秤精确到0.1克，最大量程6斤，爱做烘焙的你不能错过
          电动红酒开瓶器，10秒自动开塞，一键退塞，一点也不需要力气，特别有仪式感，就等着过年朋友来给他装装酷呢~
        </div>
        <div style="margin: 10px 0;">
          <!-- 帖子图片 -->
          <el-row :gutter="10">
            <el-col :span="12" style="margin-bottom: 10px;">
              <img style="width: 100%;" src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/ced19204c5fd8a9b3df4bad3efbd471a#vipAccount-img" alt="" >
            </el-col>
            <el-col :span="12">
              <img style="width: 100%;" src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/ced19204c5fd8a9b3df4bad3efbd471a#vipAccount-img" alt="" >
            </el-col>
            <el-col :span="12">
              <img style="width: 100%;" src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/ced19204c5fd8a9b3df4bad3efbd471a#vipAccount-img" alt="" >
            </el-col>
          </el-row>
        </div>

        <div style="margin: 10px 0; display: flex;  line-height: 25px;">
          <div style="width: 50%;">
            <el-tag type="primary"># 冬至到了</el-tag>
            <el-tag type="danger" style="margin-left: 10px;"><el-icon style="top: 2px; position: relative;" :size="14"><Compass /></el-icon># 米粉杂谈</el-tag>
          </div>
          <div style="width: 50%; text-align: right; color: #999; font-size: 14px;">
            <el-icon><View /></el-icon> 50
            <el-icon style="margin-left: 10px;"><Pointer /></el-icon> 10
            <el-icon style="margin-left: 10px;"><ChatLineRound /></el-icon> 50
          </div>
        </div>
      </div>
      <!-- //排行榜 -->
      <div style="width: 40%; height: 100px; padding: 10px; border: 1px solid #ccc; margin-left: 10px;"></div>
    </div>
  </div>
</template>

<style scoped>
  .content {
    margin: 10px 0;
    line-height: 25px;
    text-align: justify;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
