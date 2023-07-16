import { shallowMount } from '@vue/test-utils';
import Playground from '@/components/Playground.vue';

describe('playground', () => {
  const wrapper = shallowMount(Playground);

  it('Reset BlocksValue', () => {
    wrapper.vm.blocksValue = [1, 2, 3];
    wrapper.vm.resetBlocks();
    expect(wrapper.vm.blocksValue).toEqual([]);
  });

  it('Get Random Blocks', () => {
    const randomList = wrapper.vm.getRandomBlocks();

    expect(randomList.length).toBe(3);
    
    randomList.map((item) => {
      expect(typeof item === 'number').toBeTruthy();
    });

    randomList.map((item) => {
      expect(item >= 0 && item <= 3).toBeTruthy();
    });
  });

  it('Check chance', () => {
    const result = wrapper.vm.hasChance();
    expect(typeof result === 'boolean').toBeTruthy();
  });

  it('Handle cash out actions', () => {
    const hasCashOutHover = jest.fn(() => {
      const moveRight = wrapper.vm.moveRight;
      const has50Chance = true;
      wrapper.vm.moveRight = has50Chance ? wrapper.vm.moveLeft : wrapper.vm.moveRight;
      wrapper.vm.moveLeft = has50Chance ? moveRight : wrapper.vm.moveLeft;
      wrapper.vm.cashOutIsDisabled = true;
    });
    hasCashOutHover();
    expect(wrapper.vm.moveRight && wrapper.vm.moveLeft).toBeFalsy();
    expect(!wrapper.vm.moveRight && !wrapper.vm.moveLeft).toBeFalsy();
  });
});
