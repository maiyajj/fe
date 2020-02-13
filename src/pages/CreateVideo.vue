<template>
  <div v-if="editVideo.show">
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="2">
        <div>关键词</div>
      </el-col>
      <el-col :span="9">
        <el-input
            placeholder="请输入内容"
            style="margin-right: 30px;"
            v-model="searchKeyWord"/>
      </el-col>
      <el-col :span="13" style="margin-left: 20px;">
        <el-button
            :loading="isLoading"
            @click="handleSearch"
            round
            style="width: 150px"
            type="primary">搜索
        </el-button>
      </el-col>
    </el-row>
    <el-row align="middle" style="margin-bottom: 10px;" type="flex">
      <el-col :span="2">
        <div>来源名</div>
      </el-col>
      <el-col :span="9">
        <el-input
            placeholder="请输入内容"
            style="margin-right: 30px;"
            v-model="searchKeyName"/>
      </el-col>
      <el-col :span="13" style="margin-left: 20px;">
        <div></div>
      </el-col>
    </el-row>
    <!--  已选择列表  -->
    <el-row align="middle" style="margin-bottom: 30px; margin-top: 30px;" type="flex">
      <el-col :span="3">
        <div style="margin-right: 30px; font-weight: bold">已选列表</div>
      </el-col>
      <el-col :span="8">
        <div>已选择{{ selectedVideo.count }}条视频</div>
      </el-col>
      <el-col :span="13" style="margin-left: 20px;">
        <el-button
            @click="handleLastStep"
            round
            style="width: 150px"
            type="primary">上一步
        </el-button>
        <el-button
            :disabled="selectedVideo.data.length===0"
            @click="handleNextStep"
            round
            style="width: 150px"
            type="primary">下一步
        </el-button>
      </el-col>
    </el-row>
    <div :key="sub.subtile_sn" style="margin-bottom: 40px;" v-for="(sub, index) in selectedVideo.data">
      <el-row align="top" style="margin-bottom: 10px;" type="flex">
        <el-col :span="2">
          <el-checkbox :checked="true" @change="handleUnselectedVideo(index)"/>
        </el-col>
        <el-col :span="7">
          <video :src="sub.segments[0].video_url" controls height="180" width="320"/>
        </el-col>
        <el-col :span="9" style="margin-left: 40px;">
          <div style="white-space: pre-wrap; line-height: 25px;">{{ sub.segments[0].subtile }}</div>
          <div style="white-space: pre-wrap; margin-top: 15px;">来源：{{ sub.segments[0].episode_name }}</div>
        </el-col>
      </el-row>
    </div>
    <!--  待选择列表  -->
    <el-row align="middle" style="margin-bottom: 30px; margin-top: 30px;" type="flex">
      <el-col :span="3">
        <div style="margin-right: 30px; font-weight: bold">待选列表</div>
      </el-col>
      <el-col :span="8">
        <div>已检索到{{ unselectedVideo.count }}条视频</div>
      </el-col>
    </el-row>
    <div :key="sub.subtile_sn" style="margin-bottom: 40px;" v-for="(sub, index) in unselectedVideo.data">
      <el-row align="top" style="margin-bottom: 10px;" type="flex">
        <el-col :span="2">
          <el-checkbox @change="handleSelectedVideo(index)"/>
        </el-col>
        <el-col :span="7">
          <video :src="sub.segments[0].video_url" controls height="180" width="320"/>
        </el-col>
        <el-col :span="9" style="margin-left: 40px;">
          <div style="white-space: pre-wrap; line-height: 25px;">{{ sub.segments[0].subtile }}</div>
          <div style="white-space: pre-wrap; margin-top: 15px;">来源：{{ sub.segments[0].episode_name }}</div>
        </el-col>
      </el-row>
    </div>
    <el-pagination
        :current-page.sync="unselectedVideo.page"
        :page-size="unselectedVideo.pageSize"
        :total="unselectedVideo.count"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        v-if="unselectedVideo.count">
    </el-pagination>
  </div>
  <EditVideo :editVideo="editVideo" :selectedVideo="selectedVideo" v-else/>
</template>

<script>
import EditVideo from "@/pages/EditVideo";

export default {
  name: "CreateVideo",
  components: {EditVideo},
  props: {
    createVideo: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      searchKeyWord: '',
      searchKeyName: '',
      isLoading: false,
      editVideo: {
        show: true
      },
      selectedVideo: {
        data: [],
        count: 0
      },
      unselectedVideo: {
        data: [],
        count: 0,
        page: 0,
        pageSize: 3,
      },
    }
  },
  methods: {
    handleSelectedVideo(index) {
      const selectedVideo = this.unselectedVideo.data[index];
      this.selectedVideo.count = this.selectedVideo.data.push(selectedVideo);
      this.unselectedVideo.data.splice(index, 1);
      this.unselectedVideo.count--;
    },
    handleUnselectedVideo(index) {
      const unselectedVideo = this.selectedVideo.data[index];
      this.unselectedVideo.count = this.unselectedVideo.data.push(unselectedVideo);
      this.selectedVideo.data.splice(index, 1);
      this.selectedVideo.count--;
    },
    handleNextStep() {
      this.editVideo.show = false;

    },
    handleLastStep() {
      // eslint-disable-next-line no-console
      console.log(this.createVideo);
      this.createVideo.show = true;
    },
    handleSearch() {
      // 数据初始化
      this.isLoading = true;
      this.selectedVideo.data = [];
      this.selectedVideo.count = 0;
      let params = {
        'search_keywords': this.searchKeyWord,
        'source_name': this.searchKeyName,
        'page': 1,
        'page_size': this.pageSize
      };
      this.$api.getWordTheatre(params)
        .then(({data}) => {
          // eslint-disable-next-line no-console
          console.log(data);
          this.unselectedVideo.data = data.results;
          this.unselectedVideo.count = data.count;
        })
        .finally(() => {
          this.isLoading = false;
        })
    },
    handleCurrentChange(val) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {
        'search_keywords': this.searchKeyWord,
        'source_name': this.searchKeyName,
        'page': val,
        'page_size': this.pageSize
      };
      this.$api.getWordTheatre(params)
        .then(({data}) => {
          this.unselectedVideo.data = data.results;
          // 等数据加载了再更新顺序
          this.page = val;
        })
        .finally(() => {
          loading.close();
          window.scrollTo(0, 0);
        })
    }
  }
}
</script>

<style scoped>

</style>