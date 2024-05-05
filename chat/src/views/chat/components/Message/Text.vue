<script lang="ts" setup>
import { computed, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import { NButton, NIcon, NImage } from 'naive-ui';
import { Copy, Delete, Refresh } from '@icon-park/vue-next';
import { SvgIcon } from '@/components/common';
import { ClipboardIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

import { useBasicLayout } from '@/hooks/useBasicLayout';
import { t } from '@/locales';
interface Props {
  inversion?: boolean;
  error?: boolean;
  text?: string;
  loading?: boolean;
  asRawText?: boolean;
  fileInfo?: string;
  model?: string;
}

interface Emit {
  (ev: 'regenerate'): void;
  (ev: 'delete'): void;
  (ev: 'copy'): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emit>();

const { isMobile } = useBasicLayout();

const textRef = ref<HTMLElement>();

const mdi = new MarkdownIt({
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? '';
      return highlightBlock(
        hljs.highlight(code, { language: lang }).value,
        lang
      );
    }
    return highlightBlock(hljs.highlightAuto(code).value, '');
  },
});

const fileInfo = computed(() => props.fileInfo);

const isImageUrl = computed(() => {
  if (!fileInfo.value) return false;
  return /\.(jpg|jpeg|png|gif)$/i.test(fileInfo.value);
});

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } });
mdi.use(mdKatex, {
  blockClass: 'katexmath-block rounded-md p-[10px]',
  errorColor: ' #cc0000',
});

const wrapClass = computed(() => {
  return [
    'text-wrap',
    'rounded-lg',
    'min-w-12',
    isMobile.value ? 'p-2' : 'p-2',
    props.inversion ? 'bg-primary-500' : 'bg-gray-100',
    props.inversion ? 'max-w-full' : 'max-w-full',
    props.inversion ? 'text-white' : 'text-gray-800',
    props.inversion ? 'dark:bg-primary-800' : 'dark:bg-gray-800',
    props.inversion ? 'message-request' : 'message-reply',
    { 'text-red-500': props.error },
  ];
});

const text = computed(() => {
  const value = props.text ?? '';
  if (!props.asRawText) return mdi.render(value);
  return value;
});

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t(
    'chat.copyCode'
  )}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}
function handleRegenerate() {
  emit('regenerate');
}

function handleCopy() {
  emit('copy');
}

function handleDelete() {
  emit('delete');
}

defineExpose({ textRef });
</script>

<template>
  <div class="flex flex-col group max-w-full">
    <div :class="wrapClass">
      <div v-if="fileInfo && isImageUrl">
        <NImage
          :src="fileInfo"
          :preview-src="fileInfo"
          alt="文件"
          class="h-md rounded-md m-1"
          :style="{ 'max-width': isMobile ? '100%' : '20vw' }"
        />
      </div>
      <div
        v-if="fileInfo && !isImageUrl"
        class="flex items-center justify-center border border-gray-300 rounded-lg h-8 hover:bg-primary-400 dark:hover:bg-primary-900 mb-1 max-w-[100px]"
      >
        <span>文件分析</span>
      </div>

      <div ref="textRef" class="leading-relaxed break-words">
        <div v-if="!inversion" class="flex flex-col items-start">
          <div class="w-full">
            <div
              v-if="!asRawText"
              class="w-full markdown-body"
              :class="[{ 'w-full markdown-body-generate': loading }]"
              v-html="text"
            />
            <div v-else class="w-full whitespace-pre-wrap" v-text="text" />
            <!-- <span v-if="loading" class="dark:text-white w-[4px] h-[20px] block animate-blink" /> -->
          </div>
        </div>
        <div v-else>
          <div class="whitespace-pre-wrap" v-text="text" />
          <div v-if="false" class="mt-1"></div>
        </div>
      </div>
    </div>
    <div
      class="flex opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-gray-700"
    >
      <div v-if="!inversion">
        <div class="mt-1 flex">
          <Button
            class="flex ml-0 items-center text-gray-400 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-400 mx-1"
            text
            type="primary"
            @click="handleCopy"
          >
            <ClipboardIcon class="flex h-3 w-3 mx-1" />
            <span class="flex text-xs">复制</span>
          </Button>

          <Button
            class="flex ml-0 items-center text-gray-400 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-400 mx-1"
            text
            type="primary"
            @click="handleRegenerate"
          >
            <ArrowPathIcon class="flex h-3 w-3 mx-1" />
            <span class="flex text-xs">重新生成</span>
          </Button>
        </div>
      </div>

      <div v-else>
        <div class="pt-1">
          <Button
            class="flex ml-0 items-center text-gray-400 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-400"
            text
            type="primary"
            @click="handleCopy"
          >
            <ClipboardIcon class="flex h-3 w-3 mx-1" />
            <span class="flex text-xs">复制</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import url(./style.less);
</style>
