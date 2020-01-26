<template>
  <div>
    <el-container>
      <el-main>
        <div style="font-size: 30px; margin-bottom: 50px;">影视素材检索</div>
        <div style="display: flex; align-items: center; margin-bottom: 30px;">
          <div style="margin-right: 20px;">关键词</div>
          <el-input
              placeholder="请输入内容"
              style="width: 500px; margin-right: 30px;"
              v-model="searchKeyWord"/>
          <el-button
              :loading="isLoading"
              @click="handleCheck"
              round
              type="primary">搜索
          </el-button>
        </div>
        <el-row style="margin-bottom: 30px;">
          <el-col :span="3">
            <div style="margin-right: 30px">素材信息</div>
          </el-col>
          <el-col :span="8">
            <div>共检索到{{ resultCount }}条结果</div>
          </el-col>
        </el-row>
        <el-row :key="sub.subtile_sn" style="margin-bottom: 40px;" v-for="(sub, index) in searchResult">
          <el-row :gutter="20" align="top" style="margin-bottom: 10px;" type="flex">
            <el-col :span="3">
              <div>视频片段{{ index+1 }}</div>
            </el-col>
            <el-col :span="8">
              <video :src="sub.video_url" controls height="180" width="320"/>
            </el-col>
            <el-col :span="8">
              <el-button @click="handleClick(sub.video_url)" type="text">下载</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" align="middle" style="margin-bottom: 10px;" type="flex">
            <el-col :span="3">
              <div>音频片段{{ index+1 }}</div>
            </el-col>
            <el-col :span="8">
              <audio :src="sub.audio_url" controls="controls"/>
            </el-col>
            <el-col :span="8">
              <el-button @click="handleClick(sub.audio_url)" type="text">下载</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" align="middle" style="margin-bottom: 10px;" type="flex">
            <el-col :span="3">
              <div>中文字幕{{ index+1 }}</div>
            </el-col>
            <el-col :span="8">
              <el-input :value="sub.subtile" autosize type="textarea"/>
            </el-col>
            <el-col :span="8">
              <el-button
                  type="text"
                  v-clipboard:copy="sub.subtile"
                  v-clipboard:error="onError"
                  v-clipboard:success="onCopy">复制
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" align="middle" type="flex">
            <el-col :span="3">
              <div>来源{{ index+1 }}</div>
            </el-col>
            <el-col :span="8">
              <el-input :value="sub.episode_name" autosize type="textarea"/>
            </el-col>
            <el-col :span="8">
              <el-button
                  type="text"
                  v-clipboard:copy="sub.episode_name"
                  v-clipboard:error="onError"
                  v-clipboard:success="onCopy">复制
              </el-button>
            </el-col>
          </el-row>
        </el-row>
        <div class="block" v-if="resultCount">
          <el-pagination
              :current-page.sync="page"
              :page-size="pageSize"
              :total="resultCount"
              @current-change="handleCurrentChange"
              layout="prev, pager, next, jumper">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      searchKeyWord: "",
      isLoading: false,
      searchResult: [],
      resultCount: 0,
      page: 1,
      pageSize: 10,
    };
  },
  methods: {
    handleCheck() {
      this.isLoading = true;
      let params = {'search_keywords': this.searchKeyWord, 'page': 1, 'page_size': this.pageSize};
      this.$api.searchVideo(params)
        .then(({data}) => {
          // eslint-disable-next-line no-console
          console.log(data);
          this.searchResult = data.results;
          this.resultCount = data.count;
        })
        .finally(() => {
          this.isLoading = false;
        })
    },
    handleClick(urls) {
      // 本窗口下载
      // window.location.href = urls;
      // 新窗口下载
      window.open(urls, '_blank');
    },
    handleCurrentChange(val) {
      // eslint-disable-next-line no-console
      console.log(`当前页: ${val}`);
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {'search_keywords': this.searchKeyWord, 'page': val, 'page_size': this.pageSize};
      this.$api.searchVideo(params)
        .then(({data}) => {
          this.searchResult = data.results;
        })
        .finally(() => {
          loading.close();
        })
    },
    onCopy: function () {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 500
      });
    },
    onError: function () {
      this.$message({
        message: '复制失败',
        type: 'error',
        duration: 500
      });
    },
  }
}
</script>

<style>
</style>
