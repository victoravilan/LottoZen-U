# Keep WebView and JavaScript interface classes
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.lottozen.ultra.MainActivity { *; }

# Keep model classes
-keep class android.webkit.** { *; }
-keep class androidx.webkit.** { *; }
