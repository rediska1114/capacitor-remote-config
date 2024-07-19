export interface Result<T> {
  key: string;
  value: T;
  source: number;
}

export interface InitializeOptions {
  minimumFetchIntervalInSeconds: number;
}

export interface GetParamOptions {
  key: string;
}

export interface RemoteConfigPlugin {
  initialize(options: InitializeOptions): Promise<void>;
  fetch(): Promise<void>;
  activate(): Promise<void>;
  fetchAndActivate(): Promise<void>;
  getBoolean(options: GetParamOptions): Promise<Result<boolean>>;
  getNumber(options: GetParamOptions): Promise<Result<number>>;
  getString(options: GetParamOptions): Promise<Result<string>>;
  getJSON(options: GetParamOptions): Promise<Result<string>>;
}
