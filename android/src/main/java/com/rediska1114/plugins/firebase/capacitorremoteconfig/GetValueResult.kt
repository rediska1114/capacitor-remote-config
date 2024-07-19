package com.rediska1114.plugins.firebase.capacitorremoteconfig

import com.getcapacitor.JSObject

class GetValueResult<T>(var key: String, var value: T, var source: Int) {
    fun toJSObject(): JSObject {
        val result = JSObject()
        result.put("key", key)
        result.put("value", value)
        result.put("source", source)
        return result
    }
}
