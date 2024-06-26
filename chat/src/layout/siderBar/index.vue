<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  ref,
  shallowRef,
  watch,
  onMounted,
  nextTick,
} from 'vue';
import { NAvatar, NIcon, NTooltip, useMessage, NScrollbar } from 'naive-ui';
import { PersonAddOutline, PersonRemoveOutline } from '@vicons/ionicons5';
import { useRoute, useRouter } from 'vue-router';
import Logo from './Logo.vue';
import { HoverButton, SvgIcon } from '@/components/common';
import defaultAvatar from '@/assets/avatar.png';
import macTablebar from '@/components/base/macTablebar.vue';
import { fetchQueryMenuAPI } from '@/api/config';

import { useAppStore, useAuthStore, useGlobalStoreWithOut } from '@/store';
import { useBasicLayout } from '@/hooks/useBasicLayout';
const Setting = defineAsyncComponent(
  () => import('@/components/common/Setting/index.vue')
);

const appStore = useAppStore();
const authStore = useAuthStore();
const useGlobalStore = useGlobalStoreWithOut();
const message = useMessage();
const track = ref(null);
appStore.setEnv();

const avatar = computed(() => authStore.userInfo.avatar);
const route = useRoute();
const router = useRouter();
const show = ref(false);
const isLogin = computed(() => authStore.isLogin);
const darkMode = computed(() => appStore.theme === 'dark');
const env = computed(() => appStore.env);
const logInIcon = shallowRef(PersonAddOutline);
const logOutIcon = shallowRef(PersonRemoveOutline);

async function queryMenu() {
  const res: any = await fetchQueryMenuAPI({ menuPlatform: 1 });
  if (!res.success) return;
  menuList.value = res.data;
  nextTick(() => {
    calcExceededTotalWidth();
  });
}

interface MenuItem {
  menuName: string;
  menuPath: string;
  menuIcon: string;
  menuTipText: string;
  menuIframeUrl: string;
  isJump: boolean;
  isNeedAuth: boolean;
}

const menuList = ref<MenuItem[]>([]);
const isNeedScroll = ref(false);

onMounted(() => {
  queryMenu();
});

const signInStatus = computed(
  () => Number(authStore.globalConfig?.signInStatus) === 1
);

function toggleLogin() {
  if (isLogin.value) authStore.logOut();
  else authStore.setLoginDialog(true);
}

function checkMode() {
  const mode = darkMode.value ? 'light' : 'dark';
  appStore.setTheme(mode);
}

function setting() {
  if (!isLogin.value) authStore.setLoginDialog(true);
  else show.value = true;
}
const { isMobile } = useBasicLayout();

const activeRoutePath = computed(() => {
  return route.path;
});

function toPath(name: string) {
  router.push({ name });
}

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    };
  }
  return {};
});

const getMobileLayoutClass = computed(() => {
  if (isMobile.value) return ['flex-rol', 'w-full', 'border-0'];
  return ['flex-col', 'w-sider', 'h-full', 'border-r'];
});

const getIconMobileLayoutClass = computed(() => {
  if (isMobile.value)
    return ['flex', 'flex-rol', 'items-center', 'pt-0', 'w-full'];
  return ['flex', 'flex-col', 'pt-1', 'items-center'];
});

const iframeSrc = computed(() => useGlobalStore.iframeUrl);

function handleClickMenu(menu: MenuItem) {
  const { menuPath, isJump, menuIframeUrl, isNeedAuth } = menu;
  if (isNeedAuth && !isLogin.value) {
    message.warning('请先登录后访问！');
    authStore.setLoginDialog(true);
    return;
  }
  useGlobalStore.updateIframeUrl('');
  if (menuPath) {
    return router.push({ path: menuPath });
  } else {
    if (isJump) {
      window.open(menuIframeUrl);
    } else {
      useGlobalStore.updateIframeUrl(menuIframeUrl);
      router.push({ path: '/extend' });
    }
  }
}

function handleSignIn() {
  if (!isLogin.value) {
    authStore.setLoginDialog(true);
    return;
  }
  useGlobalStore.updateSignInDialog(true);
}

function calcExceededTotalWidth() {
  if (!track.value) return;
  const { clientHeight = 0, scrollHeight = 0 } = track.value;
  isNeedScroll.value = scrollHeight > clientHeight;
}

function isActive(item: MenuItem) {
  const { menuIframeUrl, menuPath } = item;
  if (menuIframeUrl) {
    return menuIframeUrl === iframeSrc.value;
  }
  if (menuPath) {
    return menuPath === activeRoutePath.value;
  }
}

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
  <div
    class="flex min-w-sm bg-gray-50 pb-2 dark:bg-gray-900 border-gray-100 dark:border-gray-800"
    :class="getMobileLayoutClass"
    :style="mobileSafeArea"
  >
    <macTablebar v-if="env === 'electron'" />
    <div class="px-2 w-full ele-drag">
      <Logo />
    </div>
    <main
      ref="track"
      :class="[
        'flex-1 flex-grow-1 mb-5 overflow-auto',
        getIconMobileLayoutClass,
      ]"
    >
      <NScrollbar :size="1">
        <div class="flex h-full flex-col items-center space-y-3">
          <div
            v-for="item in menuList"
            :key="item.menuName"
            class="flex justify-center flex-col items-center"
            :class="isMobile ? 'mt-0' : 'mt-3'"
            @click="handleClickMenu(item)"
          >
            <div
              class="relative flex items-center justify-center h-10 w-10 rounded-md cursor-pointer duration-300"
              :class="[
                // 根据活动状态切换样式
                isActive(item)
                  ? [
                      'bg-white',
                      'text-primary-600',
                      'dark:bg-gray-800',
                      'dark:text-white',
                    ]
                  : ['bg-gray-50', 'dark:bg-gray-900', 'dark:text-gray-400'],
                // 通用悬停效果
                'hover:bg-white',
                'hover:text-primary-600',
                'dark:hover:bg-gray-800',
                'dark:hover:text-white',
              ]"
            >
              <SvgIcon :icon="item.menuIcon" class="text-2xl" />
            </div>

            <!-- <div
              class="h-10 w-10 border cursor-pointer bg-white dark:bg-[#34373c] rounded-lg duration-300 flex justify-center items-center"
              :class="[
                isActive(item)
                  ? 'border border-[#73a2ff] dark:border-[#73a2ff]'
                  : 'border-transparent',
              ]"
            >
              <SvgIcon
                :icon="item.menuIcon"
                class="text-2xl transition-all"
                :class="[
                  isActive(item) ? 'text-[#3076fd] dark:text-[#3076fd] ' : '',
                ]"
              />
            </div> -->
            <!-- <span
              class="text-[10px] mt-1 margin-auto whitespace-nowrap overflow-hidden"
              :class="[
                isActive(item)
                  ? 'text-[#3076fd] dark:text-[#3076fd] '
                  : 'text-[#999999]',
              ]"
              >{{ item.menuTipText }}</span
            > -->
          </div>
        </div>
      </NScrollbar>
    </main>

    <div class="flex flex-col justify-between items-center">
      <NTooltip
        v-if="!isMobile && signInStatus"
        trigger="hover"
        placement="right"
      >
        <template #trigger>
          <SvgIcon
            class="text-xl cursor-pointer mb-5"
            icon="mynaui:gift"
            @click="handleSignIn"
          />
        </template>
        签到奖励
      </NTooltip>

      <NTooltip v-if="!isMobile" trigger="hover" placement="right">
        <template #trigger>
          <SvgIcon
            class="text-xl cursor-pointer mb-5"
            :icon="
              darkMode
                ? 'line-md:sunny-outline-to-moon-transition'
                : 'line-md:moon-to-sunny-outline-transition'
            "
            @click="checkMode"
          />
        </template>
        主题切换
      </NTooltip>

      <NTooltip v-if="isLogin" trigger="hover" placement="right">
        <template #trigger>
          <NAvatar
            :size="42"
            :src="avatar"
            round
            bordered
            :fallback-src="defaultAvatar"
            class="cursor-pointer"
            @click="toPath('UserCenter')"
          />
        </template>
        个人中心
      </NTooltip>

      <HoverButton
        v-if="!isLogin"
        tooltip="登录账户"
        :placement="isMobile ? 'bottom' : 'right'"
        :class="isMobile ? 'mb-0' : 'mb-5'"
        @click="toggleLogin"
      >
        <NIcon size="20" color="#555">
          <component :is="logInIcon" />
        </NIcon>
      </HoverButton>
    </div>
  </div>
  <Setting v-if="show" v-model:visible="show" />
</template>

<style>
.sidebar {
  overflow: hidden;
  width: calc(100% - 5px);
}
.sidebar:hover {
  width: 100%;
  overflow: overlay;
}

.overlay {
  overflow: hidden;
}
.overlay:hover {
  width: 100%;
  overflow: overlay;
}

.active_bar {
  border-width: 1px;
}
</style>
