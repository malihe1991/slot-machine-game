<template>
  <div>
    <div class="flex">
      <button
        @click="handleMachineLever"
        :disabled="MachineLeverIsDisabled"
        class="my-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Machine Lever
      </button>
      <div
        ref="cashOutWrapper"
        @mouseenter="handleCashOutHover"
        :class="`p-2 transition ${moveLeft ? '-translate-x-0' : 'translate-x-80'}`"
      >
        <button
          @click="handleCashOutClick"
          :disabled="isProcessing || cashOutIsDisabled"
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          CASH OUT
        </button>
      </div>
    </div>
    <h3 class="mt-5 pt-2 font-semibold">
      YOUR CREDITS:
      <span class="text-red-600">{{ playerCredits }}</span>
    </h3>
    <Table
      :blocksValue="blocksValue"
      :playerCredits="playerCredits"
      :showSpinner="showSpinner"
    />
    <h3
      v-if="blocksValue.length === blocksCount"
      :class="`${hasWon ? 'text-green-600' : 'text-red-600'} pt-2 font-semibold text-size-20`"
    >
      {{ hasWon ? 'YOU WIN :))' : 'YOU LOSE :(' }}
    </h3>
  </div>
</template>

<script>
import { symbols, blocksCount, machineLeverCost } from '@/constants/symbols';
import Table from '@/components/Table.vue';

export default {
  name: "PlayGround",
  data() {
    return {
      symbols,
      blocksCount,
      blocksValue: [],
      playerCredits: 10,
      showSpinner: false,
      interval: null,
      moveLeft: true,
      moveRight: false,
      cashOutIsDisabled: false,
    }
  },
  components: {
    Table
  },
  computed: {
    isProcessing() {
      return this.blocksValue.length > 0 && this.blocksValue.length < blocksCount;
    },
    MachineLeverIsDisabled() {
      return this.isProcessing || !this.playerCredits;
    },
    hasWon() {
      return this.isWinner(this.blocksValue);
    }
  },
  methods: {
    handleMachineLever() {
      if (this.playerCredits < machineLeverCost) return;

      clearInterval(this.interval);
      this.resetBlocks();
      this.showSpinner = true;

      const randomBlocks = this.getRandomBlocks();
      const chancePercentage =
        (this.playerCredits >= 40 && this.playerCredits <= 60)
          ? 30
          : this.playerCredits > 60
          ? 60 : 0;
      
      if (this.hasChance(chancePercentage)) {
        if (this.isWinner(randomBlocks)) this.showBlocks(randomBlocks);
        else this.showBlocks(this.getRandomBlocks());
      } else this.showBlocks(randomBlocks);
    },
    resetBlocks() {
      this.blocksValue = [];
    },
    getRandomBlocks() {
      return Array.from({ length: blocksCount }, () => {
        return Math.floor(Math.random() * symbols.length);
      })
    },
    hasChance(chance) {
      if (!chance) return false;
      return (Math.floor(Math.random() * 100) + 1) <= chance;
    },
    isWinner(blocks) {
      return blocks.length && blocks.every((block) => block === blocks[0]);
    },
    showBlocks(list) {
      let index = 0;
      this.interval = setInterval(() => {
        this.blocksValue.push(list[index]);
        if (this.blocksValue.length === blocksCount) this.checkFinalResult();
        index++;
      }, 1000);
    },
    checkFinalResult() {
      if (this.isWinner(this.blocksValue)) this.saveCredits();
      else --this.playerCredits;
      clearInterval(this.interval);
    },
    saveCredits() {
      this.playerCredits += this.blocksValue.reduce((acc, block) => acc += symbols[block]?.value , 0)
    },
    handleCashOutClick() {
      this.blocksValue = [];
      this.playerCredits = 0;
      this.showSpinner = false;
    },
    handleCashOutHover() {
      const moveRight = this.moveRight;
      const has50Chance = this.hasChance(50);
      this.moveRight = has50Chance ? this.moveLeft : this.moveRight;
      this.moveLeft = has50Chance ? moveRight : this.moveLeft;
      this.cashOutIsDisabled = this.hasChance(40);
    }
  }
}
</script>
