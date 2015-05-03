
<p align="right">
    <a href="https://github.com/katzer/cordova-plugin-badge/tree/example">EXAMPLE :point_right:</a>
</p>

Cordova Badge Plugin
====================

[Cordova][cordova] plugin to access and modify the badge number of the app icon on various mobile platforms including iOS, Android and Windows Phone.

<table>
    <tr>
        <img height="150px" src="http://www.maximizeurmac.com/wp-content/uploads/2013/09/1.jpg" />
    </tr>
    &nbsp;&nbsp;
    <tr>
        <img height="150px" src="http://4.bp.blogspot.com/-GBwBSN92DvU/UB8Kut7Oz0I/AAAAAAAAJKs/mJgBmj1RKqU/s1600/whatsapp+wp8+10.png" />
    </tr>
    &nbsp;&nbsp;
    <tr>
        <img height="409px" width="230px" src="http://www.developer.com/imagesvr_ce/5314/notify-fig2.png" />
    </tr>
</table>


## Overview
1. [Supported Platforms](#supported-platforms)
2. [Installation](#installation)
3. [ChangeLog](#changelog)
4. [Using the plugin](#using-the-plugin)
5. [Examples](#examples)
6. [Quirks](#quirks)


## Supported Platforms
- __iOS__ *(including iOS8)*
- __Android__ *(SDK >=11)*<br>
See [Notification Guide][android_notification_guide] for detailed informations and screenshots.
- __WP8__<br>
See [WP8 Guide][wp8_notification_guide] for detailed informations and screenshots.


## Installation
The plugin can either be installed from git repository, from local file system through the [Command-line Interface][CLI]. Or cloud based through [PhoneGap Build][PGB].

### Local development environment
From master:
```bash
# ~~ from master branch ~~
cordova plugin add https://github.com/katzer/cordova-plugin-badge.git
```
from a local folder:
```bash
# ~~ local folder ~~
cordova plugin add de.appplant.cordova.plugin.badge --searchpath path/to/plugin
```
or to use the last stable version:
```bash
# ~~ stable version ~~
cordova plugin add de.appplant.cordova.plugin.badge@0.6.3
```

### PhoneGap Build
Add the following xml to your config.xml to always use the latest version of this plugin:
```xml
<gap:plugin name="de.appplant.cordova.plugin.badge" version="0.6.3" />
```
More informations can be found [here][PGB_plugin].


## ChangeLog

#### Version 0.6.3 (22.03.2015)
- New interfaces to increase or decrease the badge number.
- Fix incompatibility with local-notification plugin.
- Add instead of replace permissions on iOS
- Refreshed layout of the example app.

#### Further informations
- See [CHANGELOG.md][changelog] to get the full changelog for the plugin.


## Using the plugin
The plugin creates the object `cordova.plugins.notification.badge` with the following methods:

1. [notification.badge.hasPermission][has_permission]
2. [notification.badge.registerPermission][register_permission]
3. [notification.badge.set][set]
4. [notification.badge.get][get]
5. [notification.badge.clear][clear]
7. [notification.badge.increase][increase]
8. [notification.badge.decrease][decrease]
9. [notification.badge.configure][set_title]

__Note:__ The previous namespace `plugin.notification.badge` will be removed with v0.6.1

### Plugin initialization
The plugin and its methods are not available before the *deviceready* event has been fired.

```javascript
document.addEventListener('deviceready', function () {
    // cordova.plugins.notification.badge is now available
}, false);
```

### Determine if the app does have the permission to show badge notifications
If the permission has been granted through the user can be retrieved through the `notification.badge.hasPermission` interface.<br/>
The method takes a callback function as its argument which will be called with a boolean value. Optional the scope of the callback function ca be defined through a second argument.

#### Further informations
- The method is supported on each platform, however its only relevant for iOS8 and above.

```javascript
cordova.plugins.notification.badge.hasPermission(function (granted) {
    // console.log('Permission has been granted: ' + granted);
});
```

### Register permission for badge notifications
The user can be prompted to grant the required permission through the `notification.badge.registerPermission` interface.<br/>
The method takes a callback function as its argument which will be called with a boolean value. Optional the scope of the callback function ca be defined through a second argument.

#### Further informations
- The method is supported on each platform, however its only relevant for iOS8 and above.
- The user will only get a prompt dialog for the first time. Later its only possible to change the setting via the notification center.

```javascript
cordova.plugins.notification.badge.registerPermission(function (granted) {
    // console.log('Permission has been granted: ' + granted);
});
```

### Set the badge number
The badge number can be set through the `notification.badge.set` interface.<br>
The method takes the badge as its argument. It needs to be a number or a string which can be parsed to a number.

#### Further informations
- The badge number can only be set if the user has previously granted the [required permission][register_permission].
- On Android the badge will be displayed through a notification. See [configure][set_title] how to specify a custom notification title.
- On Windows Phone 8 the badge will be displayed through the app's live tile.
- See [get][get] how to get back the current badge number.
- See [clear][clear] of how to clear the badge number.
- See the [examples][examples] of how to use the plugin.

```javascript
cordova.plugins.notification.badge.set(Number);
```

### Get the badge number
The badge number can be accessed through the `notification.badge.get` interface.<br>
The method takes a callback function as its argument which will be called with the badge number. Optional the scope of the callback function ca be defined through a second argument.

```javascript
cordova.plugins.notification.badge.get(function (badge) {
	// console.log('badge number: ' + badge);
}, scope);
```

### Increase the badge number
The badge number can be increased through the `notification.badge.increase` interface.<br>
The method takes a number as an argument which will be added to the current badge number. The default count is _1_.

```javascript
cordova.plugins.notification.badge.increase(count);
```

#### Further informations
- See [set][set] of how to set the badge number.

### Decrease the badge number
The badge number can be decreased through the `notification.badge.decrease` interface.<br>
The method takes a number as an argument which will be subtracted to the current badge number. The default count is _1_.

```javascript
cordova.plugins.notification.badge.decrease(count);
```

#### Further informations
- See [set][set] of how to set the badge number.

### Clear the badge number
The badge number can be removed through the `notification.badge.clear` interface.

#### Further informations
- Clearing the badge number is equivalent to set a zero number.
- See [configure][autoclear] how to clear the badge automatically after the user has taped the app icon.
- See [set][set] of how to set the badge number.

```javascript
cordova.plugins.notification.badge.clear();
```

### Clear the badge number automatically if the user taps the app icon
The badge number can be cleared automatically after the user has taped the app icon. The default value is *false*.

```javascript
cordova.plugins.notification.badge.configure({ autoClear: Boolean });
```


##  Examples
Please see the [Example branch][example_branch] for more examples and a running example app.

### Set the badge number
The following example shows how to set the badge number to **1**.

```javascript
cordova.plugins.notification.badge.set(1);
```

### Clear the badge number
See below how to clear the badge number.

```javascript
cordova.plugins.notification.badge.clear();
```

### Clear the badge number automatically if the user taps the app icon
The code below tells the plugin to clear the badge each time the user taps the app icon.

```javascript
cordova.plugins.notification.badge.configure({ autoClear: true });
```

### Increase the badge number
The badge number can be increased by one or any other value as follows.

```javascript
cordova.plugins.notification.badge.increase();
```


## Platform specifics
### Specify custom notification title on Android
The default format for the title is `%d new messages`, but is customizable through `configure`.

```javascript
cordova.plugins.notification.badge.configure({ title: '%d neue Meldungen' });
```

### Specify small icon on Android
As default the email icon is used, but is customizable through `configure`.

```javascript
cordova.plugins.notification.badge.configure({ smallIcon: 'icon' });
```

__Note:__ A small icon is required.


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## License

This software is released under the [Apache 2.0 License][apache2_license].

© 2013-2015 appPlant UG, Inc. All rights reserved


[cordova]: https://cordova.apache.org
[android_notification_guide]: http://developer.android.com/guide/topics/ui/notifiers/notifications.html
[wp8_notification_guide]: http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh202948.aspx
[CLI]: http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface
[PGB]: http://docs.build.phonegap.com/en_US/index.html
[PGB_plugin]: https://build.phonegap.com/plugins/2324
[changelog]: CHANGELOG.md
[has_permission]: #determine-if-the-app-does-have-the-permission-to-show-badge-notifications
[register_permission]: #register-permission-for-badge-notifications
[set]: #set-the-badge-of-the-app-icon
[get]: #get-the-badge-of-the-app-icon
[clear]: #clear-the-badge-of-the-app-icon
[increase]: #increase-the-badge-number
[decrease]: #decrease-the-badge-number
[autoclear]: #clear-the-badge-automatically-if-the-user-taps-the-app-icon
[examples]: #examples
[set_title]: specify-custom-notification-title-on-android
[example_branch]: https://github.com/katzer/cordova-plugin-badge/tree/example
[apache2_license]: http://opensource.org/licenses/Apache-2.0
