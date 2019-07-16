## yaf swoole 

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