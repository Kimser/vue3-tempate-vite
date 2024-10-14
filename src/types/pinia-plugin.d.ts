import "pinia";

declare module "pinia" {
  export interface DefineStoreOptionsBase {
    persist?: {
      storage: Storage;
      key?: string;
      deep?: boolean;
      pick?: string[];
      restoreState?: (key: string, storage: Storage) => any;
      saveState?: (key: string, state: any, storage: Storage) => void;
    };
  }
}
declare module "pinia-plugin-persistedstate";
