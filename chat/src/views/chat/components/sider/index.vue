<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed, ref, watch } from 'vue';
import type { NumberAnimationInst } from 'naive-ui';
import { NButton, NLayoutSider, useDialog, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import List from './List.vue';
import { SvgIcon } from '@/components/common';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

import {
  useAppStore,
  useAuthStore,
  useChatStore,
  useGlobalStoreWithOut,
} from '@/store';
import { useBasicLayout } from '@/hooks/useBasicLayout';
const useGlobalStore = useGlobalStoreWithOut();

const router = useRouter();
const appStore = useAppStore();
const chatStore = useChatStore();
const authStore = useAuthStore();
// const ms = useMessage();
const model3AnimationInstRef = ref<NumberAnimationInst | null>(null);
const model4AnimationInstRef = ref<NumberAnimationInst | null>(null);
const userBalance = computed(() => authStore.userBalance);
const dialog = useDialog();

const globaelConfig = computed(() => authStore.globalConfig);
const isSetBeian = computed(
  () => globaelConfig.value?.companyName && globaelConfig.value?.filingNumber
);

/* 当前选用的模型的扣费类型 1: 普通 2： 高级  */
const activeModelKeyDeductType = computed(
  () => chatStore?.activeModelKeyDeductType
);
// const activeModelKeyPrice = computed(() => chatStore?.activeModelKeyPrice);

const oldUse3Token = ref(0);
const newUse3Token = ref(0);
const oldUse4Token = ref(0);
const newUse4Token = ref(0);

const isSearch = ref(false);
const searchRef = ref(null);
watch(
  () => authStore.userBalance.useModel3Token,
  (newVal, oldVal) => {
    oldUse3Token.value = oldVal || 0;
    newUse3Token.value = newVal || 0;
    model3AnimationInstRef.value?.play();
  },
  {
    immediate: true,
    flush: 'post',
  }
);
watch(
  () => authStore.userBalance.useModel4Token,
  (newVal, oldVal) => {
    oldUse4Token.value = oldVal || 0;
    newUse4Token.value = newVal || 0;
    model4AnimationInstRef.value?.play();
  },
  {
    immediate: true,
    flush: 'post',
  }
);

const { isMobile } = useBasicLayout();
const addLoading = ref(false);

const collapsed = computed(() => appStore.siderCollapsed);
const groupKeyWord = ref('');

function handleInputGroupSearch(event: { target: { value: any } }) {
  const val = event.target.value;
  groupKeyWord.value = val;
  chatStore.setGroupKeyWord(val);
}

function handleBlurInput() {
  isSearch.value = false;
}

function handleOpenRole() {
  router.push('/role');
}

/* 新增一个对话 */
async function handleAdd() {
  try {
    addLoading.value = true;
    await chatStore.addNewChatGroup();
    await chatStore.queryMyGroup();
    addLoading.value = false;

    if (isMobile.value) appStore.setSiderCollapsed(true);
  } catch (error) {
    addLoading.value = false;
  }
}

/* 删除全部非置顶聊天 */
async function handleDelGroup() {
  dialog.warning({
    title: '清空对话',
    content: '清空所有非收藏的对话？',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: async () => {
      await chatStore.delAllGroup();
    },
  });
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value);
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    };
  }
  return {};
});

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    };
  }
  return {};
});

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val);
  },
  {
    immediate: true,
    flush: 'post',
  }
);
</script>

<template>
  <div>
    <NLayoutSider
      :collapsed="collapsed"
      :collapsed-width="0"
      :width="260"
      :show-trigger="isMobile ? false : 'arrow-circle'"
      collapse-mode="transform"
      position="absolute"
      bordered
      :style="getMobileClass"
      @update-collapsed="handleUpdateCollapsed"
    >
      <div
        class="flex flex-col h-full bg-white dark:bg-gray-900"
        :style="mobileSafeArea"
      >
        <main class="flex flex-col h-full flex-1">
          <div
            class="flex items-center space-x-2 bg-white dark:bg-gray-900 h-14 px-3 border-b border-t-gray-100 dark:border-b dark:border-b-gray-800 text-lg"
          >
            <!-- 搜索框 -->
            <div class="flex-1 relative">
              <div class="flex-1 relative">
                <!-- 搜索图标按钮 -->
                <MagnifyingGlassIcon
                  class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <!-- 搜索输入框 -->
                <input
                  ref="searchRef"
                  v-model="groupKeyWord"
                  type="text"
                  placeholder="搜索历史对话"
                  class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-700 placeholder:text-gray-400 sm:text-sm dark:bg-gray-900 dark:text-gray-400"
                  @blur="handleBlurInput"
                  @input="handleInputGroupSearch"
                />
              </div>
            </div>
            <!-- 新建对话按钮 -->
            <button
              type="button"
              class="rounded-md p-2 text-sm focus-visible:outline bg-white text-gray-400 dark:bg-gray-800"
              @click="handleAdd"
            >
              <PlusIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div class="flex-1 min-h-0 overflow-hidden">
            <List />
          </div>
          <div
            class="p-4 pb-1 pt-1 border-t border-t-gray-100 dark:border-t-gray-800 flex flex-col"
          >
            <div class="flex justify-between my-3">
              <button
                type="button"
                class="inline-flex justify-center items-center rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                @click="handleOpenRole"
              >
                <SvgIcon
                  icon="ri:emoji-sticker-line"
                  class="ml-0 mr-3 text-sm"
                />
                <span>应用中心</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center items-center rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                @click="handleDelGroup"
              >
                <SvgIcon icon="mdi:notice-board" class="ml-0 mr-3 text-sm" />
                <span>清空对话</span>
              </button>
            </div>
            <div
              v-if="activeModelKeyDeductType === 1"
              @click="useGlobalStore.updateGoodsDialog(true)"
            >
              <button
                type="button"
                class="inline-flex justify-center items-center rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 w-full"
              >
                <span
                  >剩余：
                  {{ `${userBalance.sumModel3Count || 0} 普通积分` }}</span
                >
              </button>
            </div>

            <div
              v-if="activeModelKeyDeductType === 2"
              @click="useGlobalStore.updateGoodsDialog(true)"
            >
              <button
                type="button"
                class="inline-flex justify-center items-center rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 w-full"
              >
                <span
                  >剩余：
                  {{ `${userBalance.sumModel4Count || 0} 高级积分` }}</span
                >
              </button>
            </div>
          </div>
          <div
            v-if="isSetBeian"
            class="w-full flex justify-center items-center py-2 text-xs text-gray-500"
          >
            版权所有 © {{ globaelConfig?.companyName }}
            <a
              class="ml-2 transition-all text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
              href="https://beian.miit.gov.cn"
              target="_blank"
              >{{ globaelConfig?.filingNumber }}</a
            >
          </div>
        </main>
      </div>
    </NLayoutSider>
    <template v-if="isMobile">
      <div
        v-show="!collapsed"
        class="fixed inset-0 z-40 bg-black/40"
        @click="handleUpdateCollapsed"
      />
    </template>
  </div>
</template>
