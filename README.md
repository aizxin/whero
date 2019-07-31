## yaf swoole 
swoole 4.3.5
yaf 3.0.7
yaconf 1.0.7



## 配置 php.ini
```
[yaf]
extension="yaf.so"
yaf.use_namespace=1
yaf.use_spl_autoload=1 ;开启自动加载

[yaconf]
extension="yaconf.so"
yaconf.directory = "/Users/kong/www/study/yaf/whero/conf"
yaconf.check_delay = 60

[swoole]
extension="swoole.so"
swoole.enable_coroutine = On
swoole.use_shortname = 'Off'
```


## 使用 smproxy 
```
[swoole]
extension="swoole.so"
swoole.enable_coroutine = On
swoole.use_shortname = 'On'
```