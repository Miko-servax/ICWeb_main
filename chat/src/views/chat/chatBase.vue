<script setup lang="ts">
import { Ref } from 'vue';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { NCascader, NPopover, NTooltip, useDialog, useMessage } from 'naive-ui';
import html2canvas from 'html2canvas';
import { useRoute } from 'vue-router';
import axios from 'axios';

import { Message } from './components';
import { useScroll } from './hooks/useScroll';
import { useCopyCode } from './hooks/useCopyCode';
import { useChat } from './hooks/useChat';
import { useUsingContext } from './hooks/useUsingContext';
import { useUsingNetwork } from './hooks/useUsingNetwork';
import HeaderComponent from './components/Header/index.vue';
import AiBotComponent from './components/AiBot/index.vue';
import AppTips from './components/AppTips/index.vue';
import { SvgIcon } from '@/components/common';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import {
  ArrowDownIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  StopIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
} from '@heroicons/vue/24/outline';
import {
  useAppStore,
  useAuthStore,
  useChatStore,
  useGlobalStoreWithOut,
} from '@/store';
import { fetchQueryOneCatAPI } from '@/api/appStore';
import { fetchChatAPIProcess } from '@/api';
import { t } from '@/locales';
import { router } from '@/router';
import { url } from 'inspector';
import ModelDialog from '@/layout/components/modelDialog.vue';
const useGlobalStore = useGlobalStoreWithOut();
const authStore = useAuthStore();
const route = useRoute();
let controller = new AbortController();

const dialog = useDialog();
const ms = useMessage();
const appStore = useAppStore();
const bottomContainer = ref();
const chatStore = useChatStore();
const isStreamIn = ref(false);
const typingStatusEnd = ref(true);
const appDetail: any = ref(null);
const chatPreVal = ref('');
const chatPreRef = ref(null);
const isShowChatPre = ref(false);
const showDeleteIcon = ref(false);
const isImageFile = ref(true);

const { addGroupChat, updateGroupChat, updateGroupChatSome } = useChat();
const tradeStatus = computed(() => route.query.trade_status as string);
const token = computed(() => route.query.token as string);
useCopyCode();
const isLogin = computed(() => authStore.isLogin);
const { isMobile } = useBasicLayout();
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll();
const { usingContext, toggleUsingContext } = useUsingContext();
const { usingNetwork } = useUsingNetwork();
const dataSources = computed(() => chatStore.chatList);
const fileInput = ref(null);
const fileName = ref('');
const isUploading = ref(false);

/* 当前所有的ai回复信息列表 方便拿到上下文 */
const conversationList = computed(() =>
  dataSources.value.filter((item) => !item.inversion && !item.error)
);

/* 当前上下文有id的最后一条 防止停止回答的时候 上一条的id是空 接不上上下文 */
const lastContext = computed(() => {
  const hasIdCoversationList = conversationList.value.filter(
    (item) => item.conversationOptions?.parentMessageId
  );
  return hasIdCoversationList[hasIdCoversationList.length - 1]
    ?.conversationOptions;
});

const prompt = ref<string>('');
const loading = ref<boolean>(false);
const inputRef = ref<Ref | null>(null);
const firstScroll = ref<boolean>(true);
const tipsRef = ref<any>(null);
const tipText = ref('');
const tipsHeight = ref<any>(null);
const isAtBottom = ref(false);

/* 当前选中的对话组 */
const activeGroupId = computed(() => chatStore.active);
/* 当前对话组的详细信息 */
const activeGroupInfo = computed(() =>
  chatStore.groupList.find((item: any) => item.uuid === chatStore.active)
);
/* 当前选用的模型的类型 1： openai  2: 百度  */
const activeModelKeyType = computed(() =>
  Number(chatStore?.activeModelKeyType)
);

const isFilesModel = computed(() => {
  return (
    chatStore?.activeModelName === 'gpt-4-all' ||
    chatStore?.activeModelName === 'gpt-4-vision-preview'
  );
});

/* 当前对话组是否是应用 */
const activeAppId = computed(() =>
  activeGroupInfo?.value ? activeGroupInfo.value.appId : 0
);
/* 粘贴板的文字 */
const clipboardText = computed(() => useGlobalStore.clipboardText);

const uploadUrl = ref(`${import.meta.env.VITE_GLOB_API_URL}/upload/file`);

const dataBase64 = ref('');
let curFile: File | null;

watch(clipboardText, (val) => {
  prompt.value = val;
  inputRef.value?.focus();
  inputRef.value.scrollTop = inputRef.value.scrollHeight;
});

watch(
  activeAppId,
  (val) => {
    if (val) queryAppDetail(val);
    else appDetail.value = null;
  },
  { immediate: true }
);

watch(
  activeGroupId,
  (val) => {
    if (val) firstScroll.value = true;
    if (inputRef.value && !isMobile.value) inputRef.value?.focus();
  },
  { immediate: true }
);

watch(
  dataSources,
  (val) => {
    if (val.length === 0) return;
    if (firstScroll.value) {
      firstScroll.value = false;
      scrollToBottom();
    }
  },
  { immediate: true }
);

watch(
  scrollRef,
  () => {
    checkIfBottomVisible();
  },
  { flush: 'post' }
);

function checkIfBottomVisible() {
  const rect = bottomContainer.value.getBoundingClientRect();
  isAtBottom.value = rect.top < window.innerHeight;
}

function openChatPre() {
  isShowChatPre.value = true;
}

function updateChatPreData(val: string) {
  tipText.value = val;
  tipsHeight.value = 'auto';
  isShowChatPre.value = false;
  nextTick(() => getTipsRefHeight());
}

/* 查询当前app详情提示用户使用 */
async function queryAppDetail(id: number) {
  const res: any = await fetchQueryOneCatAPI({ id });
  appDetail.value = res.data;
}

/* 点击快速对话话题直接对话 */
function handlePrompt(val: string) {
  prompt.value = val;
  handleSubmit();
}

function handleScrollBtm() {
  bottomContainer.value.scrollIntoView({ behavior: 'smooth' });
}

/* 发送消息 */
async function handleSubmit(index?: number) {
  if (
    chatStore.groupList.length === 0 ||
    loading.value ||
    !typingStatusEnd.value
  )
    return;
  let message = '';
  /* 如果有index就是重新生成 */
  if (index && typeof index === 'number') {
    const { requestOptions } = dataSources.value[index];
    message = requestOptions?.prompt ?? '';
  }
  onConversation(message);
}

function handleFileSelect(event: any) {
  const file = event?.target?.files[0];
  if (!file) return;
  let trimmedFileName = file.name;
  const maxLength = 10; // 最大长度限制
  const extension = trimmedFileName.split('.').pop(); // 获取文件扩展名

  if (trimmedFileName.length > maxLength) {
    // 截取文件名并添加省略号，同时保留扩展名
    trimmedFileName =
      trimmedFileName.substring(0, maxLength - extension.length - 1) +
      '….' +
      extension;
  }

  fileName.value = trimmedFileName; // 更新文件名

  // 检查文件类型
  if (file.type.startsWith('image/')) {
    // 处理图像文件
    isImageFile.value = true;
    handleSetFile(file);
  } else {
    // 处理 PDF 文件
    isImageFile.value = false;
    handleSetFile(file);
  }
}

function triggerFileUpload() {
  fileInput.value.click();
}

async function handleSetFile(file: File) {
  curFile = file;
  const reader = new FileReader();
  reader.onload = (event: any) => {
    dataBase64.value = event.target?.result as string;
  };
  reader.readAsDataURL(file);
}

/* 上传文件 */
async function uploadFile() {
  isUploading.value = true;
  try {
    const form = new FormData();
    curFile && form.append('file', curFile);
    const res = await axios.post(uploadUrl.value, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res?.data?.data;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  } finally {
    isUploading.value = false;
    dataBase64.value = '';
    curFile = null;
  }
}

/* 按钮发送消息 */
async function onConversation(msg?: string) {
  let fileUrl = '';
  if (dataBase64.value || curFile) {
    fileUrl = await uploadFile();
  }

  let message = msg || prompt.value;

  if (tipText.value && !message.includes(tipText.value))
    message = `${tipText.value}\n${message}`;

  if (loading.value) return;

  if (!message || message.trim() === '') return;

  controller = new AbortController();

  /* 虚拟增加一条用户记录 */
  addGroupChat({
    dateTime: new Date().toLocaleString(),
    text: message,
    inversion: true,
    fileInfo: fileUrl,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: null },
  });

  scrollToBottom();

  loading.value = true;
  prompt.value = '';

  let options: any = {
    groupId: +activeGroupId.value,
    usingNetwork: usingNetwork.value,
  };

  if (lastContext.value && usingContext.value && !usingNetwork.value)
    options = { ...lastContext.value, ...options };

  let thinkingText = 'AI思考中';
  if (chatStore?.activeModelName === 'dall-e-3') {
    thinkingText = 'AI绘制中，请稍候';
  }

  /* 虚拟增加一条ai记录 */
  addGroupChat({
    dateTime: new Date().toLocaleString(),
    text: thinkingText,
    loading: true,
    inversion: false,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: { ...options } },
  });

  scrollToBottom();
  const timer: any = null;
  let cacheResText = '';
  let data: any = null;
  isStreamIn.value = true;
  let userBanance: any = {};

  useGlobalStore.updateIsChatIn(true);
  /* 匀速输出 */
  try {
    const fetchChatAPIOnce = async () => {
      let i = 0;
      let shouldContinue = true;
      let currentText = '';
      async function update() {
        if (shouldContinue) {
          if (cacheResText && cacheResText[i]) {
            typingStatusEnd.value = false;
            /* 如果缓存字数太多则一次全加了 */
            if (cacheResText.length - i > 150) {
              currentText += cacheResText.substring(i, i + 10);
              i += 10;
            } else if (cacheResText.length - i > 200) {
              currentText += cacheResText.substring(i);
              i += cacheResText.length - i;
            } else {
              currentText += cacheResText[i];
              i++;
            }
            updateGroupChat(dataSources.value.length - 1, {
              dateTime: new Date().toLocaleString(),
              text: currentText,
              inversion: false,
              usage: data?.detail?.usage,
              error: false,
              loading: true,
              fileInfo: data?.fileInfo,
              conversationOptions: {
                conversationId: data?.conversationId,
                parentMessageId: data?.id,
              },
              requestOptions: { prompt: message, options: { ...options } },
            });
            scrollToBottomIfAtBottom();
          }
          const curLen = currentText ? currentText.length : 0;
          const cacheResLen = cacheResText ? cacheResText.length : 0;
          if (!isStreamIn.value && curLen === cacheResLen) {
            typingStatusEnd.value = true;
            updateGroupChatSome(dataSources.value.length - 1, {
              loading: false,
              conversationOptions: {
                conversationId: data?.conversationId,
                parentMessageId: data?.id,
              },
              requestOptions: { prompt: message, options: { ...options } },
            });
            useGlobalStore.updateIsChatIn(false);
            if (Object.keys(userBanance).length)
              authStore.updateUserBanance(userBanance);

            if (
              dataSources.value.length === 2 &&
              !activeGroupInfo?.value?.appId
            ) {
              const title =
                dataSources.value[1].text.length > 12
                  ? dataSources.value[1].text.slice(0, 12)
                  : dataSources.value[1].text;
              chatStore
                .updateGroupInfo({ groupId: +activeGroupId.value, title })
                .then(() => {
                  chatStore.queryMyGroup();
                });
            }
            shouldContinue = false; // 结束动画循环
          }

          /* 有多余的再请求下一帧 */
          if (cacheResText.length && cacheResText.length > currentText.length) {
            requestAnimationFrame(update);
          } else {
            setTimeout(() => {
              requestAnimationFrame(update);
            }, 1000);
          }
        }
      }
      requestAnimationFrame(update); // 启动动画循环
      await fetchChatAPIProcess<Chat.ConversationResponse>({
        prompt: message,
        fileInfo: fileUrl,
        appId: activeGroupInfo.value ? activeGroupInfo.value.appId : 0,
        options,
        signal: controller.signal,
        onDownloadProgress: ({ event }) => {
          const xhr = event.target;
          const { responseText } = xhr;

          /* 这种解析只对openai有效 其他的会漏掉前面的字 */
          if ([1].includes(activeModelKeyType.value)) {
            const lastIndex = responseText.lastIndexOf(
              '\n',
              responseText.length - 2
            );
            let chunk = responseText;
            if (lastIndex !== -1) chunk = responseText.substring(lastIndex);

            try {
              data = JSON.parse(chunk);
            } catch (error) {
              /* 二次解析 */
              // const parseData = parseTextToJSON(responseText)
              // TODO 如果出现类似超时错误 会连接上次的内容一起发出来导致无法解析  后端需要处理 下
              console.log('parse data erro from openai: ');
              if (chunk.includes('OpenAI timed out waiting for response'))
                ms.warning('会话超时了、告知管理员吧~~~');
            }
          }

          try {
            /* 如果出现输出内容不一致就需要处理了 */
            if (activeModelKeyType.value === 1) {
              cacheResText = data.text;
              if (data?.userBanance) userBanance = data?.userBanance;
            }
          } catch (error: any) {
            // 检查错误是否为 AbortError
            if (
              error.name === 'AbortError' ||
              error?.message.includes('canceled')
            ) {
              console.log('请求已被取消');
              // 在这里执行任何需要的 UI 更新或状态清理
              return; // 提前返回，避免执行更多逻辑
            }
            // 处理其他类型的错误
          }
        },
      });
    };
    await fetchChatAPIOnce();
  } catch (error: any) {
    useGlobalStore.updateIsChatIn(false);
    clearInterval(timer);
    isStreamIn.value = false;
    if (
      error.code === 402 ||
      error?.message.includes('余额不足') ||
      error?.message.includes('免费额度已经使用完毕')
    ) {
      if (isLogin.value) useGlobalStore.updateGoodsDialog(true);
      else authStore.setLoginDialog(true);
    }

    let errorMessage = error?.message ?? t('common.wrong');
    if (errorMessage === 'Request failed with status code 401')
      errorMessage = '非法操作、请先登录后再进行问答使用！';

    if (error?.message.includes('canceled')) {
      updateGroupChatSome(dataSources.value.length - 1, { loading: false });
      scrollToBottomIfAtBottom();
      setTimeout(() => {
        authStore.getUserBalance();
      }, 200);
      return;
    }

    const currentChat = dataSources.value[dataSources.value.length - 1];

    if (currentChat?.text && currentChat.text !== '') {
      updateGroupChatSome(dataSources.value.length - 1, {
        text: `${
          currentChat.text === 'AI思考中' ||
          currentChat.text === 'AI绘制中，请稍候'
            ? ''
            : currentChat.text
        }\n[${errorMessage}]`,
        error: false,
        loading: false,
      });
      return;
    }
    updateGroupChat(dataSources.value.length - 1, {
      dateTime: new Date().toLocaleString(),
      text: errorMessage,
      inversion: false,
      error: true,
      loading: false,
      fileInfo: data?.fileInfo,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    });
    scrollToBottomIfAtBottom();
  } finally {
    loading.value = false;
    isStreamIn.value = false;
    typingStatusEnd.value = true;
    scrollToBottom();
  }
}

/* 处理三方对接跳转 */
async function otherLoginByToken(token: string) {
  authStore.setToken(token);
  router.replace({ name: 'Chat', query: {} });
  ms.success('账户登录成功、开始体验吧！');
  authStore.getUserInfo();
}

/* 支付回调处理 */
function handleRefresh() {
  if (tradeStatus.value.toLowerCase().includes('success')) {
    ms.success('感谢你的购买、祝您使用愉快~', { duration: 5000 });
    authStore.getUserInfo();
    router.replace({ name: 'Chat', query: {} });
  } else {
    ms.error('您还没有购买成功哦~');
  }
}

/* 导出 */
function handleExport() {
  if (loading.value) return;

  const d = dialog.warning({
    title: t('chat.exportImage'),
    content: t('chat.exportImageConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: async () => {
      try {
        d.loading = true;
        const ele = document.getElementById('image-wrapper');
        const canvas = await html2canvas(ele as HTMLDivElement, {
          useCORS: true,
        });
        const imgUrl = canvas.toDataURL('image/png');
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = imgUrl;
        tempLink.setAttribute('download', 'chat-shot.png');
        if (typeof tempLink.download === 'undefined')
          tempLink.setAttribute('target', '_blank');

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(imgUrl);
        d.loading = false;
        ms.success(t('chat.exportSuccess'));
        Promise.resolve();
      } catch (error: any) {
        ms.error(t('chat.exportFailed'));
      } finally {
        d.loading = false;
      }
    },
  });
}

/* 删除 */
function handleDelete({ chatId }: Chat.Chat) {
  if (loading.value) return;

  dialog.warning({
    title: t('chat.deleteMessage'),
    content: t('chat.deleteMessageConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.deleteChatById(chatId);
    },
  });
}

function handleClear() {
  if (loading.value) return;

  dialog.warning({
    title: t('chat.clearChat'),
    content: t('chat.clearChatConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: async () => {
      await chatStore.clearChatByGroupId();
      ms.success('删除当前页面对话完成');
    },
  });
}

function handleEnter(event: KeyboardEvent) {
  if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  } else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
}

function handleStop() {
  controller.abort();
  loading.value = false;
  isStreamIn.value = false;
  typingStatusEnd.value = true;
}

const placeholder = computed(() => {
  if (isMobile.value) return t('chat.placeholderMobile');
  return t('chat.placeholder');
});

const buttonDisabled = computed(() => {
  return (
    loading.value ||
    !prompt.value ||
    prompt.value.trim() === '' ||
    !typingStatusEnd.value
  );
});

function getTipsRefHeight() {
  if (tipsRef.value)
    tipsHeight.value = `${tipsRef.value.getBoundingClientRect()?.height}px`;
}

onMounted(async () => {
  chatStore.queryChatPre();
  if (token.value) otherLoginByToken(token.value);
  if (tradeStatus.value) handleRefresh();

  await nextTick(async () => {
    await chatStore.queryActiveChatLogList();
    scrollToBottom();
    if (inputRef.value && !isMobile.value) inputRef.value?.focus();
  });

  // 添加滚动事件监听器
  const scrollElement = scrollRef.value; // 获取滚动元素的引用
  if (scrollElement) {
    scrollElement.addEventListener('scroll', () => {
      checkIfBottomVisible();
    });
  }
});

const darkMode = computed(() => appStore.theme === 'dark');

onUnmounted(() => {
  if (loading.value) controller.abort();
  window.removeEventListener('scroll', checkIfBottomVisible);
});
</script>

<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-900 pb-2">
    <HeaderComponent
      :using-context="usingContext"
      :dark-mode="darkMode"
      @export="handleExport"
      @toggle-using-context="toggleUsingContext"
      @clear="handleClear"
      @scroll-btn="handleScrollBtm"
    />
    <main class="flex-1 overflow-hidden">
      <div
        id="scrollRef"
        ref="scrollRef"
        class="relative h-full overflow-hidden overflow-y-auto scroll-smooth"
      >
        <div
          id="image-wrapper"
          class="w-full m-auto dark:bg-gray-900 h-full"
          :class="[isMobile ? 'p-2' : 'p-12 w-full']"
        >
          <template v-if="!dataSources.length && !activeAppId">
            <div
              class="flex justify-center items-center text-center"
              :class="[isMobile ? 'h-full' : 'h-4/5 ']"
            >
              <AiBotComponent @prompt="handlePrompt" />
            </div>
          </template>
          <template v-if="!dataSources.length && activeAppId">
            <div class="flex justify-center items-center">
              <AppTips :app-info="appDetail" @prompt="handlePrompt" />
            </div>
          </template>
          <template v-if="dataSources.length">
            <div>
              <Message
                v-for="(item, index) of dataSources"
                :key="item.chatId"
                :date-time="item.dateTime"
                :text="item.text"
                :fileInfo="item.fileInfo"
                :model="item.model"
                :inversion="item.inversion"
                :error="item.error"
                :loading="item.loading"
                @regenerate="handleSubmit(index)"
                @delete="handleDelete(item)"
              />
              <div class="sticky bottom-0 left-0 flex justify-center mb-1 p-1">
                <Button
                  v-if="!isAtBottom"
                  class="bg-white rounded-full p-1 ring-1 text-gray-700 ring-gray-200 dark:ring-gray-600 dark:bg-gray-800 dark:text-gray-500"
                  @click="handleScrollBtm"
                >
                  <ArrowDownIcon class="h-5 w-5 font-bold" />
                </Button>
              </div>
            </div>
          </template>
          <div ref="bottomContainer" class="bottom" />
        </div>
      </div>
    </main>
    <footer>
      <!-- <div :class="[isMobile ? 'px-2' : 'px-4']" class="flex space-x-2">
        <NPopover
          v-if="chatStore.chatPreList?.length"
          placement="top-start"
          style="width: 200px"
          raw
          :show-arrow="false"
        >
          <template #trigger>
            <NTooltip
              trigger="hover"
              placement="bottom-end"
              :disabled="isMobile"
            >
              <template #trigger>
                <button
                  class="flex h-8 w-8 items-center justify-center rounded border transition hover:bg-[#eef0f3] dark:border-neutral-700 dark:hover:bg-[#33373c]"
                  @click="openChatPre"
                >
                  <span
                    ><SvgIcon
                      class="text-lg"
                      style="width: 1em; height: 1em"
                      icon="ic:outline-tips-and-updates"
                  /></span>
                </button>
              </template>
              学术快问
            </NTooltip>
          </template>
          <div class="w-0 h-0 opacity-0">
            <NCascader
              id="chatPreRef"
              ref="chatPreRef"
              v-model="chatPreVal"
              :show="isShowChatPre"
              placement="top"
              class="w-0 h-0 opacity-0 overflow-hidden"
              placeholder="请选用当前聊天组所需的模型！"
              expand-trigger="click"
              :options="chatStore.chatPreList"
              check-strategy="child"
              :on-update:value="updateChatPreData"
            />
          </div>
        </NPopover>
      </div> -->

      <div
        class="flex justify-center flex-col m-auto block rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-primary-600 py-2 text-gray-900 placeholder:text-gray-400 border-0 bg-transparent sm:text-sm sm:leading-6 resize-none dark:focus:ring-primary-800 dark:ring-inset dark:ring-primary-800 dark:bg-gray-800"
        :class="[
          isMobile ? 'px-1  pb-1 mx-2' : 'px-2  pb-2 pt-1 mx-10 max-w-full',
        ]"
      >
        <!-- 文本输入区域 -->
        <textarea
          ref="inputRef"
          v-model="prompt"
          :placeholder="placeholder"
          :rows="isMobile ? 2 : 2"
          class="flex block w-full border-0 text-gray-700 placeholder:text-gray-400 bg-transparent sm:text-sm sm:leading-6 resize-none dark:text-gray-400 px-1"
          @keypress="handleEnter"
        ></textarea>
        <!-- 文件上传隐藏输入 -->
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileSelect"
          accept="image/*, application/pdf, text/plain, text/html, text/css, text/csv, application/xml, application/vnd.ms-excel, application/x-sh, application/javascript, application/xslt+xml, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
        <!-- 按钮容器 -->
        <div class="flex justify-between items-center">
          <!-- 文件上传按钮 -->
          <div class="flex justify-between items-center justify-start">
            <button
              v-if="isFilesModel"
              type="button"
              class="rounded-md text-sm font-semibold text-white dark:hover:text-gray-200 shadow-sm bg-primary-400 p-2 text-sm font-semibold shadow-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 hover:bg-primary-500 dark:bg-primary-900 hover:dark:border-primary-500 dark:hover:bg-primary-800 dark:text-gray-400"
              @click="triggerFileUpload"
            >
              <ArrowUpTrayIcon v-if="!isUploading" class="h-4 w-4" />
              <ArrowPathIcon v-else class="h-4 w-4 animate-spin-slow" />
            </button>
            <!-- 预览容器 -->
            <div
              v-if="dataBase64"
              class="relative flex items-start justify-start"
            >
              <div
                class="group"
                @mouseover="showDeleteIcon = true"
                @mouseleave="showDeleteIcon = false"
              >
                <!-- 根据 isImageFile 的值显示不同内容 -->
                <template v-if="isImageFile">
                  <!-- 图片预览 -->
                  <img
                    :src="dataBase64"
                    class="ml-2 max-w-full max-h-10 border border-gray-300 rounded-lg"
                    alt="预览图片"
                  />
                </template>
                <template v-else>
                  <!-- 非图片文件预览（例如文件图标） -->
                  <div
                    class="flex items-center justify-center border border-gray-300 rounded-lg p-2 ml-2 h-8 hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-400"
                  >
                    <span>{{ fileName }}</span>
                    <!-- 替换为适当的文件图标 -->
                  </div>
                </template>
                <!-- 清除图标 -->
                <div
                  v-show="showDeleteIcon"
                  class="absolute right-0 transform cursor-pointer"
                  @click="dataBase64 = ''"
                >
                  <XMarkIcon
                    class="text-gray-500 hover:text-gray-700 rounded-full h-5 w-5"
                  />
                </div>
              </div>
            </div>
          </div>

          <span></span>
          <!-- 当不在加载状态时显示这个按钮，用于提交 -->
          <button
            v-if="!isStreamIn"
            type="button"
            class="rounded-md text-sm font-semibold text-white dark:hover:text-gray-200 shadow-sm p-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 hover:bg-primary-500 dark:bg-primary-900 hover:dark:border-primary-500 dark:hover:bg-primary-800 dark:text-gray-400"
            :class="{ 'bg-primary-600': prompt, 'bg-primary-200': !prompt }"
            :disabled="buttonDisabled"
            @click="handleSubmit()"
          >
            <PaperAirplaneIcon class="h-4 w-4" />
          </button>

          <!-- 当在加载状态时显示这个按钮，用于停止 -->
          <button
            v-else
            type="button"
            class="rounded-md bg-primary-600 text-sm font-semibold text-white dark:hover:text-gray-200 shadow-sm p-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 hover:bg-primary-500 dark:bg-primary-900 hover:dark:border-primary-500 dark:hover:bg-primary-800 dark:text-gray-400"
            @click="handleStop()"
          >
            <StopIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>
