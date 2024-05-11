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
  getJSON<T = object>(key: string) {
    return this.remoteConfig.getJSON<T>({ key });
  }
}

export * from './definitions';
