<script lang="ts" setup>
import { computed } from 'vue';
import { NAvatar } from 'naive-ui';
import { useAuthStore, useChatStore } from '@/store';

import { isString } from '@/utils/is';
import defaultAvatar from '@/assets/avatar.png';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { UserIcon, CpuChipIcon } from '@heroicons/vue/24/outline';

const p = defineProps<Props>();

const chatStore = useChatStore();

const { isMobile } = useBasicLayout();
interface Props {
  image?: boolean;
}
const authStore = useAuthStore();

const userAvatar = computed(() => {
  const userAvatar = authStore.userInfo.avatar;
  return userAvatar;
});

const robotAvatar = computed(() => {
  const avatar =
    activeGroupInfo.value?.appLogo || authStore.globalConfig.robotAvatar;
  return avatar;
});

const activeGroupInfo = computed(() =>
  chatStore.groupList.find((item: any) => item.uuid === chatStore.active)
);
</script>

<template>
  <!-- 用户头像逻辑 -->
  <template v-if="image">
    <!-- 如果 avatar 是有效字符串，则显示 img 元素，否则显示默认 SVG 用户头像 -->
    <img
      v-if="isString(userAvatar) && userAvatar.length > 0"
      class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 border-solid shadow-sm"
      :src="userAvatar"
      alt="User Avatar"
    />
    <span
      v-else
      class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 border-solid shadow-sm bg-primary-600"
    >
      <UserIcon class="text-xs font-small leading-none text-white p-1" />
    </span>
  </template>

  <!-- 机器人头像逻辑 -->
  <template v-else>
    <!-- 如果 robotAvatar 是有效字符串，则显示 img 元素，否则显示带有 "AI" 文字的标签 -->
    <img
      v-if="isString(robotAvatar) && robotAvatar.length > 0"
      class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 border-solid shadow-sm"
      :src="robotAvatar"
      alt="Robot Avatar"
    />
    <span
      v-else
      class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 border-solid shadow-sm bg-green-600"
    >
      <CpuChipIcon class="text-xs font-small leading-none text-white p-1" />
    </span>
  </template>
</template>
