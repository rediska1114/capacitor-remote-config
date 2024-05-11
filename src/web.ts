import { WebPlugin } from '@capacitor/core';

import type { RemoteConfigPlugin } from './definitions';

export class RemoteConfigWeb extends WebPlugin implements RemoteConfigPlugin {
  async initialize() {}
  async fetch() {}
  async activate() {}
  async fetchAndActivate() {}
  async getBoolean({ key }: { key: string }) {
    return { key, value: false, source: 0 };
  }
  async getNumber({ key }: { key: string }) {
    return { key, value: 0, source: 0 };
  }
  async getString({ key }: { key: string }) {
    return { key, value: '', source: 0 };
  }
  async getJSON<T = object>({ key }: { key: string }) {
    return { key, value: {} as T, source: 0 };
  }
}
