declare global {
  interface PluginRegistry {
    CapacitorRemoteConfig: CapacitorRemoteConfigPlugin;
  }
}

export interface IResult<T> {
  key: string;
  value: T;
  source: number;
}

export interface IInitializeOptions {
  minimumFetchIntervalInSeconds: number;
}

export interface IGetParamOptions {
  key: string;
}

export interface CapacitorRemoteConfigPlugin {
  initialize(options: IInitializeOptions): Promise<void>;
  fetch(): Promise<void>;
  activate(): Promise<void>;
  fetchAndActivate(): Promise<void>;
  getBoolean(options: IGetParamOptions): Promise<IResult<boolean>>;
  getNumber(options: IGetParamOptions): Promise<IResult<number>>;
  getString(options: IGetParamOptions): Promise<IResult<string>>;
  getJSON<T = object>(options: IGetParamOptions): Promise<IResult<T>>;
}
