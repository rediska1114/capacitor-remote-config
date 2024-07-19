package com.rediska1114.plugins.firebase.capacitorremoteconfig

import android.content.Context
import android.util.Log
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.firebase.remoteconfig.FirebaseRemoteConfig
import com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings
import com.google.firebase.remoteconfig.FirebaseRemoteConfigValue

@CapacitorPlugin(name = "RemoteConfig")
class RemoteConfigPlugin : Plugin() {
    override fun load() {
        super.load()

        val fileName =
                bridge.activity
                        .getPreferences(Context.MODE_PRIVATE)
                        .getString("FirebaseRemoteConfigDefaults", "")

        if (fileName!!.isEmpty()) {
            rCInstance.setDefaultsAsync(emptyMap())
        } else {
            val ctx = bridge.activity.applicationContext
            val resourceId = ctx.resources.getIdentifier(fileName, "xml", ctx.packageName)
            rCInstance.setDefaultsAsync(resourceId)
        }
    }

    @PluginMethod
    fun initialize(call: PluginCall) {
        val minFetchTimeInSecs = call.getLong("minimumFetchIntervalInSeconds", 3600)!!

        val configSettings =
                FirebaseRemoteConfigSettings.Builder()
                        .setFetchTimeoutInSeconds(minFetchTimeInSecs)
                        .build()
        rCInstance.setConfigSettingsAsync(configSettings)    .addOnSuccessListener { _: Void? -> call.resolve() }
            .addOnFailureListener { exception: Exception ->
                Log.w(TAG, "SetFetchTimeoutInSeconds failed", exception)
                call.reject(exception.message)
            }
    }

    @PluginMethod
    fun fetch(call: PluginCall) {
        rCInstance
                .fetch()
                .addOnSuccessListener { result: Void? -> call.resolve() }
                .addOnFailureListener { exception: Exception ->
                    Log.w(TAG, "Fetch config failed.", exception)
                    call.reject(exception.message)
                }
    }

    @PluginMethod
    fun activate(call: PluginCall) {
        rCInstance
                .activate()
                .addOnSuccessListener { _: Boolean? -> call.resolve() }
                .addOnFailureListener { exception: Exception ->
                    Log.w(TAG, "Activate config failed.", exception)
                    call.reject(exception.message)
                }
    }

    @PluginMethod
    fun fetchAndActivate(call: PluginCall) {
        rCInstance
                .fetchAndActivate()
                .addOnSuccessListener { result: Boolean? -> call.resolve() }
                .addOnFailureListener { exception: Exception ->
                    Log.w(TAG, "Fetch and activate config failed.", exception)
                    call.reject(exception.message)
                }
    }

    @PluginMethod
    fun getBoolean(call: PluginCall) {
        val key = call.getString("key")

        if (key == null) {
            call.reject(ERROR_KEY_MISSING)
            return
        }

        val value = getFirebaseRCValue(key)
        val result = GetValueResult(key, value.asBoolean(), value.source)

        call.resolve(result.toJSObject())
    }

    @PluginMethod
    fun getNumber(call: PluginCall) {
        val key = call.getString("key")

        if (key == null) {
            call.reject(ERROR_KEY_MISSING)
            return
        }

        val value = getFirebaseRCValue(key)
        val result = GetValueResult(key, value.asDouble(), value.source)

        call.resolve(result.toJSObject())
    }

    @PluginMethod
    fun getString(call: PluginCall) {
        val key = call.getString("key")

        if (key == null) {
            call.reject(ERROR_KEY_MISSING)
            return
        }

        val value = getFirebaseRCValue(key)
        val result = GetValueResult(key, value.asString(), value.source)

        call.resolve(result.toJSObject())
    }

    @PluginMethod
    fun getJSON(call: PluginCall) {
        val key = call.getString("key")

        if (key == null) {
            call.reject(ERROR_KEY_MISSING)
            return
        }

        val value = getFirebaseRCValue(key)
        val result = GetValueResult(key, value.asString(), value.source)

        call.resolve(result.toJSObject())
    }

    private fun getFirebaseRCValue(key: String): FirebaseRemoteConfigValue {
        return rCInstance.getValue(key)
    }

    private val rCInstance: FirebaseRemoteConfig
        get() = FirebaseRemoteConfig.getInstance()

    companion object {
        const val TAG: String = "FirebaseRemoteConfig"
        const val ERROR_KEY_MISSING: String = "Key is missing."
    }
}
