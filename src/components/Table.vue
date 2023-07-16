<template>
  <table class="mt-5 mb-10 border-separate border-2 border-gray-500">
    <tbody>
      <tr>
        <td
          v-for="(block, index) in blocksValue" :key="index"
          class="w-24 h-24 px-2 py-2 border border-gray-400 text-gray-800"
        >
          <LogoSVG :svgName="symbols[block].name" />
        </td>
        <td
          v-for="(_, index) in blocksCount - blocksValue.length" :key="'A' + index"
          class="w-24 h-24 py-2 pl-8 border border-gray-400 text-gray-800"
        >
          <div
            v-if="showSpinner && playerCredits"
            class="w-10 h-10 border-l-2 border-gray-900 rounded-full animate-spin">
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import LogoSVG from './LogoSVG.vue';
import { symbols, blocksCount } from '@/constants/symbols';

export default {
  name: "MyTable",
  data: () => {
    return {
      symbols,
      blocksCount,
    }
  },
  components: {
    LogoSVG,
  },
  props: {
    blocksValue: {
      type: Array,
      default: () => [],
    },
    playerCredits: {
      type: Number,
      default: () => 0,
    },
    showSpinner: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
