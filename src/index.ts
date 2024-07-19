import { registerPlugin } from '@capacitor/core';
import type { RemoteConfigPlugin } from './definitions';

const CapacitorRemoteConfig = registerPlugin<RemoteConfigPlugin>(
  'RemoteConfig',
  {
    web: () => import('./web').then(m => new m.RemoteConfigWeb()),
  },
);

export class RemoteConfig {
  private remoteConfig = CapacitorRemoteConfig;

  initialize(minimumFetchIntervalInSeconds: number) {
    return this.remoteConfig.initialize({ minimumFetchIntervalInSeconds });
  }
  fetch = this.remoteConfig.fetch;
  activate = this.remoteConfig.activate;
  fetchAndActivate = this.remoteConfig.fetchAndActivate;
  getBoolean(key: string) {
    return this.remoteConfig.getBoolean({ key });
  }
  getNumber(key: string) {
    return this.remoteConfig.getNumber({ key });
  }
  getString(key: string) {
    return this.remoteConfig.getString({ key });
  }
  async getJSON<T = object>(key: string) {
    const result = await this.remoteConfig.getJSON({ key });

    const { value, ...rest } = result;

    let jsonObj: T = {} as T;

    try {
      jsonObj = JSON.parse(value) as T;
    } catch (e) {
      console.error(e);
    }

    return {
      ...rest,
      value: jsonObj,
    };
  }
}

export * from './definitions';
