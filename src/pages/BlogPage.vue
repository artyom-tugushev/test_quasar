<template>
  <q-layout>
    <q-page-container>
      <div class="flex q-px-md q-my-xl">
        <img src="../assets/back-button.svg" />
        <div class="q-ml-auto q-mr-xl text-subtitle1">Notifications</div>
        <div @click="markAllRead()" class="text-subtitle1">Mark all read</div>
      </div>
      <div class="text-h6 q-px-lg q-mb-md">Featured</div>
      <q-scroll-area class="q-mb-md" style="height: 300px; width: 100%">
        <div class="row no-wrap">
          <div
            v-for="post in data"
            :key="post.id"
            class="post-scroll flex"
            :style="{ 'background-image': `url(${post.imageUrl})` }"
            @click="goToPost(post.id)"
          >
            <div class="scroll-content">
              <div class="title q-mt-auto">{{ post.title }}</div>
            </div>
          </div>
        </div>
      </q-scroll-area>

      <div class="q-my-xl">
        <div class="text-h6 q-px-lg">Latest News</div>
        <div
          v-for="post in blogPosts"
          :key="post.id"
          class="post-preview q-ma-md"
          :class="[{ 'bg-grey-4': post.seen }, { 'text-grey-8': post.seen }]"
          @click="goToPost(post.id)"
        >
          <div class="q-pa-md flex no-wrap">
            <img class="post-preview-image" :src="post.imageUrl" />
            <div class="column space-between q-ml-md">
              <div class="post-preview-title">
                {{ post.title }}
              </div>
              <div class="q-mt-auto text-caption gray">
                {{ `${dayjs().diff(post.publicationDate, 'day')} days ago` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import data from '../data/articles.json';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const router = useRouter();
const blogPosts = ref(data);
const markAllRead = () => {
  blogPosts.value.forEach((element) => {
    element.seen = true;
  });
};
const goToPost = (id: string) => {
  const post = blogPosts.value.find((p) => p.id === id);
  if (post) {
    post.seen = true;
  }
  router.push({ name: 'Post', params: { id } });
};
</script>

<style lang="scss" scoped>
.post-scroll {
  position: relative;
  background-size: cover;
  background-position: center;
  display: flex;
  width: 358px;
  height: 300px;
  text-align: center;
  line-height: 100px;
  margin-right: 10px;
  border-radius: 12px;
  z-index: 1;
}
.post-scroll:first-of-type {
  margin-left: 18px;
}
.post-scroll::after {
  border-radius: 12px;
  content: ' ';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}
.scroll-content {
  position: relative;
  z-index: 2;
  bottom: 0;
  padding: 40px 20px;
  margin-top: auto;
}
.title {
  text-align: left;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  color: white;
}
.post-preview {
  border-radius: 9px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15); /* Параметры: смещение X, смещение Y, радиус размытия, цвет */
}
.post-preview-image {
  width: 90px;
  height: 60px;
  border-radius: 12px;
}
.post-preview-title {
  margin-top: 4px;
  max-width: 200px;
  font-size: 16px;
  line-height: 18px !important;
}
</style>
