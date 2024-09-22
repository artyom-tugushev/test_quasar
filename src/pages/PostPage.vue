<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div v-if="thisPost">
          <img
            class="back-button"
            src="../assets/back-button-white.svg"
            @click="router.push({ name: 'Blog' })"
          />
          <div
            class="background-image"
            :style="{ 'background-image': `url(${thisPost.imageUrl})` }"
          >
            <div class="scroll-content">
              <div class="title q-mt-auto">{{ thisPost.title }}</div>
            </div>
          </div>
          <p class="main-text" v-html="thisPost.description"></p>
          <div class="date text-caption gray">
            {{ `${dayjs(thisPost.publicationDate).format('MMM DD, YYYY')}` }}
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import data from '../data/articles.json';
import dayjs from 'dayjs';

dayjs();

const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const blogPosts = ref(data);
const thisPost = blogPosts.value.find((post) => post.id === postId);
</script>

<style lang="scss" scoped>
.back-button {
  position: absolute;
  z-index: 2;
  left: 16px;
  top: 48px;
  color: white;
}
.background-image {
  display: flex;
  width: 100%;
  height: 495px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25); /* Параметры: смещение X, смещение Y, радиус размытия, цвет */
}
.background-image::after {
  border-radius: 0 0 12px 12px;
  content: ' ';
  width: 100%;
  height: 495px;
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
  padding: 40px 48px;
  margin-top: auto;
}
.title {
  z-index: 2;
  text-align: left;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  color: white;
}
.main-text {
  padding: 21px;
}
.date {
  padding: 0 21px;
  margin-bottom: 40px;
}
</style>
