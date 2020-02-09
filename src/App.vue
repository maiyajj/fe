<template>
  <div>
    <el-container>
      <el-main>
        <span :class="[activeName === 'first'? 'active-navi-tabs' : 'navi-tabs']"
              @click="handleClick('first')">影视素材检索</span>
        <span :class="[activeName === 'second'? 'active-navi-tabs' : 'navi-tabs']"
              @click="handleClick('second')">单词剧场视频</span>
        <MoveSearch v-if="activeName === 'first'"/>
        <WordTheatre v-else/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MoveSearch from "@/components/MovieSearch";
import WordTheatre from "@/components/WordTheatre";

export default {
  name: 'app',
  components: {MoveSearch, WordTheatre},
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(name) {
      this.activeName = name;
    },
  }
}
</script>

<style scoped>
  .navi-tabs {
    font-size: 30px;
    margin-bottom: 50px;
    margin-right: 50px;
    cursor: pointer;
    color: #a1a1a1;
  }

  .active-navi-tabs {
    font-size: 30px;
    margin-bottom: 50px;
    margin-right: 50px;
    cursor: pointer;
    color: black;
  }
</style>
