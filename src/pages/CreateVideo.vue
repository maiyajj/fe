<template>
  <div>
    <div v-if="dataPageJump.toPage === 'createVideo'">
      <el-row align="middle" style="margin-bottom: 10px;" type="flex">
        <el-col :span="2">
          <div>关键词</div>
        </el-col>
        <el-col :span="9">
          <el-input
              placeholder="请输入内容"
              style="margin-right: 30px;"
              v-model="searchMovie.keyword"/>
        </el-col>
        <el-col :span="13" style="margin-left: 20px;">
          <el-button
              :loading="searchMovie.loading"
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
              v-model="searchMovie.keyName"/>
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
            <video :src="sub.video_url" controls height="180" width="320"/>
          </el-col>
          <el-col :span="9" style="margin-left: 40px;">
            <div style="white-space: pre-wrap; line-height: 25px;">{{ sub.subtile }}</div>
            <div style="white-space: pre-wrap; margin-top: 15px;">来源：{{ sub.episode_name }}</div>
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
            <video :src="sub.video_url" controls height="180" width="320"/>
          </el-col>
          <el-col :span="9" style="margin-left: 40px;">
            <div style="white-space: pre-wrap; line-height: 25px;">{{ sub.subtile }}</div>
            <div style="white-space: pre-wrap; margin-top: 15px;">来源：{{ sub.episode_name }}</div>
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
    <EditVideo :pageJump="pageJump" :waitEditVideo="selectedVideo" v-else-if="dataPageJump.toPage === 'editVideo'"/>
  </div>
</template>

<script>
import EditVideo from "@/pages/EditVideo";

export default {
  name: "CreateVideo",
  components: {EditVideo},
  props: {
    pageJump: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      searchMovie: {
        loading: false,
        keyword: '',
        keyName: '',
      },
      selectedVideo: {
        data: [],
        count: 0
      },
      unselectedVideo: {
        data: [
            {"uid": "a80d532dfd0846378cfcd3c87db4261c", "created_at": "2020-01-24T13:45:07.190269", "episode": 1473,
             "subtile": "那会是很可惜的  主席先生\nif we allowed a few rotten apples to give a bad nameto the whole barrel.",
             "subtile_sn": 1402, "begin_at": "02:22:16,250", "end_at": "02:22:18,750",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/教父2-1402.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/教父2-1402.mp3",
             "episode_name": "教父2-1402", },
            {"uid": "d02b095a8a5d45c095b34249c8d29961", "created_at": "2020-01-24T13:38:52.839484", "episode": 1437,
             "subtile": "P8爪钩？\nThe P-8 grapple hook?", "subtile_sn": 861, "begin_at": "01:12:54,130",
             "end_at": "01:12:55,430",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/憨豆特工2-861.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/憨豆特工2-861.mp3",
             "episode_name": "憨豆特工2-861"},
            {"uid": "0aa18c25b6d847eba677109b88a0d328", "created_at": "2020-01-24T13:10:12.910277", "episode": 1100,
             "subtile": "我在吃焦糖苹果味的棒棒糖呢\nI am eating a caramel apple.", "subtile_sn": 765,
             "begin_at": "00:47:03,720", "end_at": "00:47:05,180",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/疯狂愚蠢的爱-765.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/app/oss/split/app/oss/download/movie/疯狂愚蠢的爱-765.mp3",
             "episode_name": "疯狂愚蠢的爱-765"},
            {"uid": "11f57954fc324101b1590c44abf80b38", "created_at": "2020-01-22T12:44:09.967963", "episode": 2704,
             "subtile": "是苹果上\nWell, at an apple.", "subtile_sn": 500, "begin_at": "00:49:35,181",
             "end_at": "00:49:36,474",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/饥饿游戏-500.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/饥饿游戏-500.mp3",
             "episode_name": "饥饿游戏-500"},
            {"uid": "7e791e58d0404f409d63328398e659f0", "created_at": "2020-01-22T12:43:56.003678", "episode": 2704,
             "subtile": "当你射中苹果时他们什么反应？\nWhat did they do when you shot the apple?", "subtile_sn": 458,
             "begin_at": "00:47:28,554", "end_at": "00:47:32,642",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/饥饿游戏-458.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/饥饿游戏-458.mp3",
             "episode_name": "饥饿游戏-458"},
            {"uid": "8310aeedfeba447686fdeddffb9174fb", "created_at": "2020-01-22T12:19:27.370124", "episode": 2688,
             "subtile": "我必须和着苹果酱吃\nI have to crush it up in my applesauce", "subtile_sn": 1006,
             "begin_at": "00:51:15,940", "end_at": "00:51:18,110",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/我的间谍前男友-1006.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/我的间谍前男友-1006.mp3",
             "episode_name": "我的间谍前男友-1006"},
            {"uid": "49ec0d705d1c4fb58531d51d7aaeba19", "created_at": "2020-01-22T12:06:20.908850", "episode": 2680,
             "subtile": "我的侍女正拿着一个叫菠萝的东西过来\nand my maid is on her way up with something called a pineapple.",
             "subtile_sn": 1262, "begin_at": "01:35:59,180", "end_at": "01:36:01,980",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/宠儿-1262.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/宠儿-1262.mp3",
             "episode_name": "宠儿-1262"},
            {"uid": "a797c3a3ed8b438e9c7378fc5f0e16b9", "created_at": "2020-01-22T11:41:10.362485", "episode": 2671,
             "subtile": "他们一定制造了数百万听\n松露，李子和苹果罐头。\nthey must have made millions of tins of P&A, plum and apple.",
             "subtile_sn": 274, "begin_at": "00:14:32,900", "end_at": "00:14:37,190",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/他们已不再变老-274.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/他们已不再变老-274.mp3",
             "episode_name": "他们已不再变老-274"},
            {"uid": "692b00cd3b02445aba0573c409661992", "created_at": "2020-01-22T11:41:08.892835", "episode": 2671,
             "subtile": "递给他一听李子和苹果果酱。\nhanding him a tin of plum and apple jam.", "subtile_sn": 270,
             "begin_at": "00:14:23,020", "end_at": "00:14:25,350",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/他们已不再变老-270.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/他们已不再变老-270.mp3",
             "episode_name": "他们已不再变老-270"},
            {"uid": "4eb5510dc8c8444098284545be9c4673", "created_at": "2020-01-22T11:41:07.873997", "episode": 2671,
             "subtile": "里面只有李子和苹果，你知道吗?\nbut plum and apple, you know?", "subtile_sn": 267,
             "begin_at": "00:14:12,880", "end_at": "00:14:14,970",
             "video_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/他们已不再变老-267.mp4",
             "audio_url": "https://fangzhou-video.oss-cn-beijing.aliyuncs.com/oss:/apps/oss/split/apps/oss/download/movie/他们已不再变老-267.mp3",
             "episode_name": "他们已不再变老-267"}],
        count: 0,
        page: 0,
        pageSize: 3,
      },
      dataPageJump: {
        toPage: '',
        beforePage: '',
      }
    }
  },
  methods: {
    handleSelectedVideo(index) {
      // eslint-disable-next-line no-console
      console.log(['handleSelectedVideo', this.selectedVideo]);
      this.selectedVideo.count = this.selectedVideo.data.push(this.unselectedVideo.data[index]);
      this.unselectedVideo.data.splice(index, 1);
      this.unselectedVideo.count--;
    },
    handleUnselectedVideo(index) {
      // eslint-disable-next-line no-console
      console.log(['handleUnselectedVideo', this.unselectedVideo]);
      this.unselectedVideo.count = this.unselectedVideo.data.push(this.selectedVideo.data[index]);
      this.selectedVideo.data.splice(index, 1);
      this.selectedVideo.count--;
    },
    handleNextStep() {
      this.dataPageJump.toPage = 'editVideo';
      this.dataPageJump.beforePage = 'createVideo';
      // eslint-disable-next-line no-console
      console.log(this.dataPageJump.toPage)
    },
    handleLastStep() {
      this.dataPageJump.toPage = 'wordTheatre';
      this.dataPageJump.beforePage = 'createVideo';
    },
    handleSearch() {
      // 数据初始化
      this.searchMovie.loading = true;
      this.selectedVideo.data = [];
      this.selectedVideo.count = 0;
      let params = {
        'search_keywords': this.searchMovie.keyword,
        'source_name': this.searchMovie.keyName,
        'page': 1,
        'page_size': this.pageSize
      };
      this.$api.getVideo(params)
        .then(({data}) => {
          // eslint-disable-next-line no-console
          console.log(data);
          this.unselectedVideo.data = data.results;
          this.unselectedVideo.count = data.count;
        })
        .finally(() => {
          this.searchMovie.loading = false;
        })
    },
    handleCurrentChange(val) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const params = {
        'search_keywords': this.searchKeyWord,
        'source_name': this.searchKeyName,
        'page': val,
        'page_size': this.pageSize
      };
      this.$api.getVideo(params)
        .then(({data}) => {
          this.unselectedVideo.data = data.results;
        })
        .finally(() => {
          loading.close();
          // 等数据加载了再更新顺序
          this.unselectedVideo.page = val;
          window.scrollTo(0, 0);
        })
    }
  },
  mounted() {
    this.dataPageJump.toPage = this.pageJump.toPage
    this.dataPageJump.beforePage = this.pageJump.beforePage
  },
  destroy() {
    // eslint-disable-next-line no-console
    console.log(this.selectedVideo);
    // eslint-disable-next-line no-console
    console.log(this.dataPageJump);
  }
}
</script>

<style scoped>

</style>