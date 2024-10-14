import { store } from "@/store";

export const useTestStore = defineStore(
  "test",
  () => {
    const testValue = ref<any>({
      testArr1: [],
      testObject1: {},
    });

    function setArr1(value: any) {
      testValue.value.testArr1 = value;
    }
    function getArr1() {
      return testValue.value.testArr1;
    }

    return {
      testValue,
      setArr1,
      getArr1,
    };
  },
  // 通过 createPersistedState 插件实现持久化存储
  {
    persist: {
      storage: window.sessionStorage, // 指定存储方式
      pick: ["testValue.testArr1"], // 需要持久化的数据
    },
  }
);

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useTestStoreHook() {
  return useTestStore(store);
}
