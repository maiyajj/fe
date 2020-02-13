<template>
  <div style="margin-top: 50px;" v-if="createVideo.show">
    <el-row align="middle" style="margin-bottom: 50px;" type="flex">
      <el-col :span="2">
        <div>单词</div>
      </el-col>
      <el-col :span="9">
        <el-input
            placeholder="请输入内容"
            style="margin-right: 30px;"
            v-model="searchKeyWord"/>
      </el-col>
      <el-col :span="13" style="margin-left: 20px;">
        <div style="display: flex; justify-content: space-between;">
          <el-button
              :loading="isLoading"
              @click="handleCheck"
              round
              style="width: 150px"
              type="primary">搜索
          </el-button>
          <el-button
              @click="handleCreateVideo"
              round
              style="width: 150px"
              type="primary">新建视频
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="视频ID"
          prop="videoID"
          width="180">
      </el-table-column>
      <el-table-column
          label="单词"
          prop="word">
      </el-table-column>
      <el-table-column
          label="视频"
          prop="video">
      </el-table-column>
      <el-table-column
          label="cdn地址"
          prop="cdnUrl">
      </el-table-column>
      <el-table-column
          label="操作"
          prop="process"
          width="100px">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div style="margin-top: 50px;" v-else>
    <CreateVideo :createVideo="createVideo"/>
  </div>
</template>
<script>
import CreateVideo from "@/pages/CreateVideo";

export default {
  name: 'MoveSearch',
  components: {CreateVideo},
  data() {
    return {
      tableData: [],
      createVideo: {
        show: true
      }
    };
  },
  methods: {
    handleCreateVideo() {
      this.createVideo.show = false;
    }
  },
}
</script>
<style scoped>
  vue-slider-component.vue-slider-dot-tooltip-bottom {
    bottom: 0;
  }
</style>
