import Capacitor
import FirebaseCore
import FirebaseRemoteConfig
import Foundation

/// Please read the Capacitor iOS Plugin Development Guide
/// here: https://capacitorjs.com/docs/plugins/ios
@objc(RemoteConfigPlugin)
public class RemoteConfigPlugin: CAPPlugin {
  var remoteConfig: RemoteConfig?

  override public func load() {
    if FirebaseApp.app() == nil {
      FirebaseApp.configure()
    }

    let fileName =
      getConfigValue("defaultConfigFilePath") as? String ?? "FirebaseRemoteConfigDefaults"

    if Bundle.main.path(forResource: fileName, ofType: "plist") != nil {
      remoteConfig?.setDefaults(fromPlist: fileName)
    }

    if remoteConfig == nil {
      remoteConfig = RemoteConfig.remoteConfig()
    }
  }

  @objc func initialize(_ call: CAPPluginCall) {
    let minFetchInterval = call.getInt("minimumFetchIntervalInSeconds") ?? 0

    if remoteConfig != nil {
      let settings = RemoteConfigSettings()
      settings.minimumFetchInterval = TimeInterval(minFetchInterval)
      remoteConfig?.configSettings = settings
      call.resolve()
    }
  }

  @objc func fetch(_ call: CAPPluginCall) {
    remoteConfig?.fetch(completionHandler: { status, error in
      if status == .success {
        call.resolve()
      } else {
        call.reject(error?.localizedDescription ?? "Error occured while executing fetch()")
      }
    })
  }

  @objc func activate(_ call: CAPPluginCall) {
    remoteConfig?.activate(completion: { _, error in
      if error != nil {
        call.reject(error?.localizedDescription ?? "Error occured while executing activate()")
      } else {
        call.resolve()
      }
    })
  }

  @objc func fetchAndActivate(_ call: CAPPluginCall) {
    remoteConfig?.fetchAndActivate(completionHandler: { status, _ in
      if status == .successFetchedFromRemote || status == .successUsingPreFetchedData {
        call.resolve()
      } else {
        call.reject("Error occured while executing failAndActivate()")
      }
    })
  }

  @objc func getBoolean(_ call: CAPPluginCall) {
    guard let key = call.getString("key") else {
      return call.reject("Missing key option")
    }

    let value = remoteConfig?.configValue(forKey: key).boolValue
    let source = remoteConfig?.configValue(forKey: key).source
    call.resolve([
      "key": key as String,
      "value": value as Any,
      "source": source!.rawValue as Int,
    ])
  }

  @objc func getNumber(_ call: CAPPluginCall) {
    guard let key = call.getString("key") else {
      return call.reject("Missing key option")
    }

    let value = remoteConfig?.configValue(forKey: key).numberValue
    let source = remoteConfig?.configValue(forKey: key).source
    call.resolve([
      "key": key as String,
      "value": value as Any,
      "source": source!.rawValue as Int,
    ])
  }

  @objc func getString(_ call: CAPPluginCall) {
    guard let key = call.getString("key") else {
      return call.reject("Missing key option")
    }

    let value = remoteConfig?.configValue(forKey: key).stringValue
    let source = remoteConfig?.configValue(forKey: key).source
    call.resolve([
      "key": key as String,
      "value": value as Any,
      "source": source!.rawValue as Int,
    ])
  }

  @objc func getJSON(_ call: CAPPluginCall) {
    guard let key = call.getString("key") else {
      return call.reject("Missing key option")
    }

    let value = remoteConfig?.configValue(forKey: key).stringValue
    let source = remoteConfig?.configValue(forKey: key).source
    call.resolve([
      "key": key as String,
      "value": value as Any,
      "source": source!.rawValue as Int,
    ])
  }

}
