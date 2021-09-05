import { CapacitorRemoteConfigPlugin } from './definitions';
import { Plugins } from '@capacitor/core';

const CapacitorRemoteConfig =
  Plugins.CapacitorRemoteConfig as CapacitorRemoteConfigPlugin;

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
}
