<template>
  <div style="margin-top: 50px;">
    <div v-if="pageJump.toPage === 'wordTheatre'">
      <el-row align="middle" style="margin-bottom: 50px;" type="flex">
        <el-col :span="2">
          <div>单词</div>
        </el-col>
        <el-col :span="4">
          <el-input
              placeholder="请输入内容"
              style="margin-right: 30px;"
              v-model="searchWordTheatre.keyword"/>
        </el-col>
        <el-col :span="9" style="margin-left: 20px;">
          <div style="display: flex; justify-content: space-between;">
            <el-button
                :loading="searchWordTheatre.loading"
                @click="handleSearchWordTheatre"
                round
                style="width: 150px"
                type="primary">搜索
            </el-button>
            <el-button
                @click="handlePageToCreateVideo"
                round
                style="width: 150px"
                type="primary">新建视频
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 40px;">
        <el-col :span="15">
          <el-table
              :data="searchWordTheatre.data"
              header-align="center"
              style="width: 100%;">
            <el-table-column
                align="center"
                label="视频ID"
                width="180">
              <template slot-scope="scope">
                <div style="text-align: left;">{{ scope.row.uid }}</div>
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="单词"
                width="100">
              <template slot-scope="scope">
                <div style="text-align: left;">{{ scope.row.word.spelling }}</div>
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="视频"
                width="400">
              <template slot-scope="scope">
                <video :src="scope.row.video_url" controls height="180" width="320"/>
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="cdn地址">
              <template slot-scope="scope">
                <div style="text-align: left;">{{ scope.row.video_url }}</div>
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作"
                width="80">
              <template slot-scope="scope">
                <el-button @click="handleEditVideo(scope.row.segments)" type="text">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-pagination
          :current-page.sync="searchWordTheatre.page"
          :page-size="searchWordTheatre.pageSize"
          :total="searchWordTheatre.count"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, jumper"
          v-if="searchWordTheatre.count">
      </el-pagination>
    </div>
    <CreateVideo :pageJump="pageJump" v-else-if="pageJump.toPage === 'createVideo'"/>
    <EditVideo :pageJump="pageJump" :waitEditVideo="editVideo" v-else/>
  </div>
</template>
<script>
import CreateVideo from "@/pages/CreateVideo";
import EditVideo from "@/pages/EditVideo";

export default {
  name: 'MoveSearch',
  components: {EditVideo, CreateVideo},
  data() {
    return {
      searchWordTheatre: {
        loading: false,
        keyword: '',
        data: [],
        count: 0,
        page: 1,
        pageSize: 10,
      },
      pageJump: {
        toPage: 'wordTheatre',
        beforePage: 'wordTheatre'
      },
      editVideo: {
        data: []
      },
    };
  },
  methods: {
    handleSearchWordTheatre() {
      const params = {
        'search_keywords': this.searchKeyWord,
        'page': 1,
        'page_size': this.searchWordTheatre.pageSize
      };
      this.$api.getWordTheatre(params)
        .then(({data}) => {
          // eslint-disable-next-line no-console
          console.log(data);
          this.searchWordTheatre.data = data.results;
          this.searchWordTheatre.count = data.count;
        })
        .finally(() => {
          this.searchWordTheatre.loading = false;
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
        'page': val,
        'page_size': this.searchWordTheatre.pageSize
      };
      this.$api.getWordTheatre(params)
        .then(({data}) => {
          this.searchWordTheatre.data = data.results;
        })
        .finally(() => {
          loading.close();
          // 等数据加载了再更新顺序
          this.page = val;
          window.scrollTo(0, 0);
        })
    },
    handlePageToCreateVideo() {
      this.pageJump.toPage = 'createVideo';
      this.pageJump.beforePage = 'wordTheatre';
    },
    handleEditVideo(row) {
      this.editVideo.data = row;
      this.pageJump.toPage = 'editVideo';
      this.pageJump.beforePage = 'wordTheatre';
    }
  },
}
</script>
<style scoped>

</style>
