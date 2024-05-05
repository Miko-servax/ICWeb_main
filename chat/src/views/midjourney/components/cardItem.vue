<script lang="ts" setup>
import {
  NButton,
  NImage,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch,
  NTag,
  NTooltip,
  useDialog,
  useMessage,
  NScrollbar,
} from 'naive-ui';
import { onMounted, reactive, ref, toRefs, watch, computed } from 'vue';
import axios from 'axios';
import { fetchDownloadImg } from '@/api';
import type { ResData } from '@/api/types';
import failImg from '@/assets/fail.png';
import drawSvg from '@/assets/icons/draw.svg';
import zoomSvg from '@/assets/icons/zoom.svg';
import { useAppStore, useAuthStore } from '@/store';
import { fetchDrawTaskAPI, fetchTranslateAPI } from '@/api/mjDraw';
import { SvgIcon } from '@/components/common';
import Loading from '@/components/base/Loading.vue';

interface Emits {
  (e: 'usePrompt', val: any): void;
  (e: 'queryData'): void;
}

interface Props {
  drawItemInfo: any;
}

const emit = defineEmits<Emits>();
const appStore = useAppStore();
const authStore = useAuthStore();
const theme = computed(() => appStore.theme);
const loadingTextColor = computed(() =>
  theme.value === 'dark' ? '#fff' : '#000'
);
const props = defineProps<Props>();
const dialog = useDialog();
const ms = useMessage();
const downloadUrl = `${import.meta.env.VITE_GLOB_API_URL}/midjourney/download`;
const refreshLoading = ref(false);

const statusType: any = computed(() => {
  const { status } = props.drawItemInfo;
  if (status === 1) return '';
  if (status === 2) return 'info';
  if (status === 3) return 'primary';
  if (status === 4) return 'error';
  if (status === 5) return 'error';
});
const statusMsg = computed(() => {
  const { status } = props.drawItemInfo;
  if (status === 1) return '等待中';
  if (status === 2) return '绘制中';
  if (status === 3) return '成功';
  if (status === 4) return '失败';
  if (status === 5) return '超时';
});

function usePrompt() {
  emit('usePrompt');
}

/* 下载图片 */
async function handleDownloadImg(item: any) {
  const d = dialog.info({
    title: '下载图片',
    content: '下载当前图片',
    positiveText: '下载',
    negativeText: '取消',
    onPositiveClick: async () => {
      d.loading = true;
      return new Promise(async (resolve) => {
        const { fileInfo } = item;
        const { filename, cosUrl } = fileInfo;
        const response = await axios.post(
          downloadUrl,
          { url: cosUrl },
          { responseType: 'blob' }
        );
        const blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        const urlObject = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = filename;
        link.click();
        resolve(true);
      });
    },
  });
}

/* 删除图片 */
async function handleDeleteDraw(item: any) {
  dialog.warning({
    title: '删除记录',
    content: '删除当前绘制记录？',
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { id } = item;
      const res: ResData = await fetchDownloadImg({ id });
      if (!res.success) return ms.error(res.message);
      ms.success('绘制记录已删除！');
      emit('queryData');
    },
  });
}

/* 提交放大绘制任务 */
async function handleUpscale(item: any, orderId: number) {
  const { drawId } = item;
  await fetchDrawTaskAPI({ drawId: drawId, action: 'UPSCALE', orderId });
  ms.success('放大绘制任务已提交，请等待绘制结束！');
  if (authStore.token) {
    await refreshUserInfo();
  }
  emit('queryData');
}

/* 提交重新生成任务 */
async function handleReGenerate(item: any, orderId: number) {
  const { drawId } = item;
  await fetchDrawTaskAPI({ drawId: drawId, action: 'REGENERATE', orderId });
  ms.success('重新生成绘制任务已提交，请等待绘制结束！');
  if (authStore.token) {
    await refreshUserInfo();
  }
  emit('queryData');
}

/* 提交变体任务 */
async function handleVariation(item: any, orderId: number) {
  const { drawId } = item;
  await fetchDrawTaskAPI({ drawId: drawId, action: 'VARIATION', orderId });
  ms.success('变换绘制任务成功已提交，请等待绘制结束！');
  if (authStore.token) {
    await refreshUserInfo();
  }
  emit('queryData');
}

async function refreshUserInfo() {
  refreshLoading.value = true;
  try {
    await authStore.getUserInfo();
    refreshLoading.value = false;
  } catch (error) {
    refreshLoading.value = false;
  }
}

const calcTips = computed(() => {
  const { progress, status } = props.drawItemInfo;
  if (status === 1) return '排队中...';
  if (status === 2 && !progress) return '正在绘制...';
  if (status === 2 && progress === 100) return '图片存储中...';
});

/* 提交对单张图片调整任务 */
async function handleVary(item: any, orderId: number) {
  const { drawId } = item;
  await fetchDrawTaskAPI({ drawId: drawId, action: 'VARIATION', orderId });
  ms.success('提交图片调整绘制任务成功、请等待绘制结束！');
  if (authStore.token) {
    await refreshUserInfo();
  }
  emit('queryData');
}

/* 提交对单张图片缩放任务 */
async function handleZoom(item: any, orderId: number) {
  const { drawId } = item;
  await fetchDrawTaskAPI({ drawId: drawId, action: 'UPSCALE', orderId });
  ms.success('图片调整绘制任务已提交，请等待绘制结束！');
  if (authStore.token) {
    await refreshUserInfo();
  }
  emit('queryData');
}

function handleRegion(file) {}
</script>

<template>
  <div
    class="relative overflow-hidden rounded-md border p-4 transition-all hover:shadow dark:border-neutral-700"
  >
    <div class="flex items-center justify-between">
      <span>
        <NTag size="small" :type="statusType">
          {{ statusMsg }}
        </NTag>
      </span>

      <NSpace>
        <NTooltip
          v-if="drawItemInfo.action === 'IMAGINE'"
          placement="top"
          trigger="hover"
        >
          <template #trigger>
            <NButton size="tiny" ghost @click="usePrompt">
              <template #icon>
                <SvgIcon icon="ri:brush-line" class="text-base" />
              </template>
              使用
            </NButton>
          </template>
          <div style="width: 240px">
            <p>{{ drawItemInfo.fullPrompt }}</p>
          </div>
        </NTooltip>

        <NButton size="tiny" ghost @click="handleDownloadImg(drawItemInfo)">
          <template #icon>
            <SvgIcon icon="mingcute:file-download-line" class="text-base" />
          </template>
          下载
        </NButton>
        <NButton size="tiny" ghost @click="handleDeleteDraw(drawItemInfo)">
          <template #icon>
            <SvgIcon icon="ri:delete-bin-line" class="text-base" />
          </template>
          删除
        </NButton>
      </NSpace>
    </div>
    <!-- content -->
    <div class="my-4 h-[280px]">
      <div
        v-if="drawItemInfo.status === 3"
        class="flex h-full w-full items-center justify-center overflow-hidden rounded-md"
      >
        <NImage
          style="object-fit: contain"
          :src="drawItemInfo.drawUrl"
          :preview-src="drawItemInfo.drawUrl"
          object-fit="contain"
        />
      </div>
      <div
        v-if="[4, 5, 6].includes(drawItemInfo.status)"
        class="flex flex-col h-full w-full items-center justify-center overflow-hidden rounded-md"
      >
        <img class="w-[75px]" :src="failImg" />
        <span class="mt-3 text-base">绘制失败</span>
        <span class="mt-1">积分已退还！</span>
      </div>
      <div
        v-if="[1, 2].includes(drawItemInfo.status)"
        class="my-4 h-[280px] relative"
      >
        <Loading
          :text-color="loadingTextColor"
          :progress="drawItemInfo.progress"
          :tips="calcTips"
        />
      </div>
    </div>
    <!-- footer -->
    <div class="-mx-4 -mb-4 bg-[#fafafc] px-4 py-2 dark:bg-[#262629]">
      <div
        v-if="
          (drawItemInfo.action === 'IMAGINE' ||
            drawItemInfo.action === 'VARIATION' ||
            drawItemInfo.action === 'ZOOM' ||
            drawItemInfo.action === 'OUTPAINT' ||
            drawItemInfo.action === 'REROLL') &&
          drawItemInfo.status === 3
        "
        class="w-full"
      >
        <div class="mb-2 flex items-center justify-between">
          <span>放大：</span>
          <span class="text-base text-neutral-400">
            <NTooltip placement="top" trigger="hover">
              <template #trigger>
                <SvgIcon icon="ri:error-warning-line" class="text-base" />
              </template>
              <div style="width: 240px">
                <p>放大第几张图片</p>
              </div>
            </NTooltip>
          </span>
          <div class="flex-1">
            <div class="flex items-center justify-around">
              <NButton size="tiny" @click="handleUpscale(drawItemInfo, 1)">
                U1
              </NButton>
              <NButton size="tiny" @click="handleUpscale(drawItemInfo, 2)">
                U2
              </NButton>
              <NButton size="tiny" @click="handleUpscale(drawItemInfo, 3)">
                U3
              </NButton>
              <NButton size="tiny" @click="handleUpscale(drawItemInfo, 4)">
                U4
              </NButton>
              <NTooltip placement="top" trigger="hover">
                <template #trigger>
                  <NButton
                    size="tiny"
                    @click="handleReGenerate(drawItemInfo, 5)"
                  >
                    <SvgIcon icon="solar:refresh-outline" class="text-base" />
                  </NButton>
                </template>
                <p>重新生成</p>
              </NTooltip>
            </div>
          </div>
        </div>
      </div>

      <!-- 套图 新生成 变体图 重新生成 三种类型 -->
      <div
        v-if="
          (drawItemInfo.action === 'IMAGINE' ||
            drawItemInfo.action === 'VARIATION' ||
            drawItemInfo.action === 'ZOOM' ||
            drawItemInfo.action === 'OUTPAINT' ||
            drawItemInfo.action === 'REROLL') &&
          drawItemInfo.status === 3
        "
        class="w-full"
      >
        <div class="mb-2 flex items-center justify-between">
          <span>变换：</span>
          <span class="text-base text-neutral-400">
            <NTooltip placement="top" trigger="hover">
              <template #trigger>
                <SvgIcon icon="ri:error-warning-line" class="text-base" />
              </template>
              <div style="width: 240px">
                <p>以当前图片为基础重新绘制</p>
              </div>
            </NTooltip>
          </span>
          <div class="flex-1">
            <div class="flex items-center justify-around">
              <NButton size="tiny" @click="handleVariation(drawItemInfo, 1)">
                V1
              </NButton>
              <NButton size="tiny" @click="handleVariation(drawItemInfo, 2)">
                V2
              </NButton>
              <NButton size="tiny" @click="handleVariation(drawItemInfo, 3)">
                V3
              </NButton>
              <NButton size="tiny" @click="handleVariation(drawItemInfo, 4)">
                V4
              </NButton>
              <NButton size="tiny" style="opacity: 0"> V5 </NButton>
            </div>
          </div>
        </div>
      </div>

      <!-- 对老图片增强 单张图或生成中的图 -->
      <div
        v-if="drawItemInfo.progress !== 100 && drawItemInfo.status !== 3"
        class="w-full mb-2 flex items-center justify-between"
      >
        <!-- 图片放大或变体 并且图片还未生成成功的时候没有message_id -->
        <div v-if="drawItemInfo.orderId !== 5">
          <span v-if="drawItemInfo.action === 'UPSCALE'">
            状态：{{ `放大第${drawItemInfo.orderId || 'x'}张图片` }}
          </span>
          <span v-if="drawItemInfo.action === 'VARIATION'">
            状态：{{ `变换第${drawItemInfo.orderId || 'x'}张图片` }}
          </span>
        </div>
        <!-- 已经生成成功的单张图 可以zoom和vary -->

        <!-- 重新绘制套图【只在生成中显示 生成完毕即会进入group套图】 -->
        <span v-if="drawItemInfo.orderId === 5"> 状态：重新生成... </span>
      </div>

      <!-- 新图绘制中 -->
      <div
        v-if="
          drawItemInfo.action === 'IMAGINE' &&
          !drawItemInfo.orderId &&
          drawItemInfo.status === 'UPSCALE'
        "
        class="w-full mb-2 flex items-center justify-between"
      >
        状态：绘制中...
      </div>

      <!-- 绘制失败了 -->
      <div
        v-if="!drawItemInfo.orderId && [4, 5, 6].includes(drawItemInfo.status)"
        class="w-full mb-2 flex items-center justify-between"
      >
        提醒： 换个提示词重新试试吧！
      </div>
      <!-- 加载失败 -->
      <div
        v-if="!drawItemInfo.action && !drawItemInfo.extend"
        class="w-full mb-2 flex items-center justify-between"
      >
        状态： {{ drawItemInfo.message_id || '加载中...' }}
      </div>

      <!-- 2 -->
      <div
        v-if="
          (drawItemInfo.action === 'UPSCALE' ||
            drawItemInfo.action === 'ACTION') &&
          drawItemInfo.status === 3
        "
      >
        <div class="mb-2 flex flex-1 items-center justify-between">
          <span>调整：</span>
          <span class="text-base text-neutral-400">
            <NTooltip placement="top" trigger="hover">
              <template #trigger>
                <SvgIcon icon="ri:error-warning-line" class="text-base" />
              </template>
              <div style="width: 270px">
                <p>对当前图片进行调整</p>
              </div>
            </NTooltip>
          </span>
          <div class="flex-1">
            <div class="flex items-center pl-2">
              <NSpace>
                <NTooltip placement="top" trigger="hover">
                  <template #trigger>
                    <NButton size="tiny" @click="handleZoom(drawItemInfo, 1)">
                      <template #icon>
                        <img :src="zoomSvg" class="w-4" alt="" />
                      </template>
                      U(Subtle)
                    </NButton>
                  </template>
                  <p>细微提升</p>
                </NTooltip>

                <NTooltip placement="top" trigger="hover">
                  <template #trigger>
                    <NButton size="tiny" @click="handleZoom(drawItemInfo, 2)">
                      <template #icon>
                        <img :src="zoomSvg" class="w-4" alt="" />
                      </template>
                      U(Creative)
                    </NButton>
                  </template>
                  <p>创意调整</p>
                </NTooltip>
              </NSpace>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          (drawItemInfo.action === 'UPSCALE' ||
            drawItemInfo.action === 'ACTION') &&
          drawItemInfo.status === 3
        "
        class="flex w-full"
      >
        <div class="mb-2 flex flex-1 items-center justify-between">
          <span>变换：</span>
          <span class="text-base text-neutral-400">
            <NTooltip placement="top" trigger="hover">
              <template #trigger>
                <SvgIcon icon="ri:error-warning-line" class="text-base" />
              </template>
              <div style="width: 275px">
                <p>以当前图片为基础重新绘制</p>
              </div>
            </NTooltip>
          </span>
          <div class="flex-1">
            <div class="flex items-center pl-2">
              <NSpace>
                <NTooltip placement="top" trigger="hover">
                  <template #trigger>
                    <NButton size="tiny" @click="handleVary(drawItemInfo, 1)">
                      <template #icon>
                        <img :src="drawSvg" class="w-4" alt="" />
                      </template>
                      V(Strong)
                    </NButton>
                  </template>
                  <p>大幅增强</p>
                </NTooltip>

                <NTooltip placement="top" trigger="hover">
                  <template #trigger>
                    <NButton size="tiny" @click="handleVary(drawItemInfo, 2)">
                      <template #icon>
                        <img :src="drawSvg" class="w-4" alt="" />
                      </template>
                      V(Subtle)
                    </NButton>
                  </template>
                  <p>细微变换</p>
                </NTooltip>
              </NSpace>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="w-full flex">
        <span class="text-[#64748b]">时间：{{ drawItemInfo.createdAt }}</span>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
