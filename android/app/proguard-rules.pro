# Keep WebView and JavaScript interface classes
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.lottozen.ultra.MainActivity { *; }

# Keep WebView classes
-keep class android.webkit.** { *; }
-keep class androidx.webkit.** { *; }

# Keep React and related JS bridge classes
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Don't warn about WebView methods
-dontwarn android.webkit.WebView
-dontwarn android.webkit.WebViewClient
-dontwarn android.webkit.WebSettings
-dontwarn android.webkit.WebChromeClient

# Keep app package
-keep class com.lottozen.** { *; }

# Remove debug logs in release
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}
