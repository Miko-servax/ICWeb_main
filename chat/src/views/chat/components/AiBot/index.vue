<script setup lang="ts">
import { SvgIcon } from '@/components/common';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { fetchGetChatBoxList } from '@/api/index';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store';
import { ChatboxItem, defaultChatBox } from './helper';
import { useRouter } from 'vue-router';

interface Emit {
  (ev: 'prompt', item: string): void;
}

const router = useRouter();
const emit = defineEmits<Emit>();
const authStore = useAuthStore();

const boxData = ref<ChatboxItem[]>([]);

/* 查询九宫格内容 */
async function queryChatBox() {
  const res: any = await fetchGetChatBoxList();
  if (res?.data && res?.data.length) {
    boxData.value = res?.data;
  } else {
    boxData.value = defaultChatBox;
  }
}

onMounted(() => {
  queryChatBox();
});

const siteRobotName = authStore.globalConfig?.siteRobotName || 'Ai Robot';

function handleClick(box) {
  const { appId, prompt, url } = box;
  if (url) {
    window.open(url);
    return;
  }
  if (appId && appId > 0) {
    router.push({ path: '/chat', query: { appId } });
  } else {
    emit('prompt', prompt);
  }
}

const { isMobile } = useBasicLayout();
</script>

<template>
  <div :class="[isMobile ? 'mt-2' : 'mt-28']" class="rounded-md px-4 py-4">
    <h1
      class="mb-6 rounded px-4 py-2 text-center text-3xl font-bold text-primary-500"
    >
      {{ siteRobotName }}
    </h1>
    <div class="w-full md:min-w-[450px]">
      <div
        class="grid grid-cols-3 gap-x-2 gap-y-3"
        :style="{
          gridTemplateColumns: `repeat(${boxData.length}, minmax(0, 1fr))`,
        }"
      >
        <div class="space-y-4" v-for="item in boxData" :key="item.id">
          <h2 class="text-md text-center">
            <SvgIcon :icon="item.icon" class="mb-2 inline-block text-lg" />
            <p class="line-clamp-1 break-all overflow-hidden">
              {{ item.name }}
            </p>
          </h2>
          <div class="space-y-e" v-for="box in item.childList" :key="box.id">
            <div
              @click="handleClick(box)"
              class="py-3 flex justify-center items-center rounded cursor-pointer select-none bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              :class="[isMobile ? 'px-2' : 'px-5']"
            >
              <img
                v-if="box.coverImg"
                class="w-4 mr-1"
                :src="box.coverImg"
                alt=""
              />
              <div class="line-clamp-1 break-all overflow-hidden">
                {{ box.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-4 text-center text-sm text-neutral-400"
        v-if="boxData?.length"
      >
        选择应用或话题快速对话
      </div>
    </div>
  </div>
</template>
