<?php

/**
 * @Author: whero
 * @Date  : 2018-05-26 17:39:56
 * @Desc  :
 */

class Bootstrap extends \Yaf\Bootstrap_Abstract
{

    public function _initPlugin(\Yaf\Dispatcher $dispatcher)
    {
        //注册一个插件
        $objSamplePlugin = new SamplePlugin();
        $dispatcher->registerPlugin($objSamplePlugin);
    }

    public function _initRoute(\Yaf\Dispatcher $dispatcher)
    {
        //在这里注册自己的路由协议,默认使用简单路由
    }

    public function _initView(\Yaf\Dispatcher $dispatcher)
    {
        $dispatcher->disableView();
    }

    /**
     * @Author: whero
     * @Date  : 2018-05-26 17:39:09
     * @Desc  : swoole的异步日志
     */
    public function _initLog(\Yaf\Dispatcher $dispatcher)
    {

        \think\facade\Log::init([
            'default'  => 'file',
            'channels' => [
                'file' => [
                    'type' => 'file',
                    'path' => APP_PATH . '/runtime/logs/',
                ],
            ],
        ]);
    }

    public function _initDb(\Yaf\Dispatcher $dispatcher)
    {
        \swf\facade\Db::setConfig([
            // 默认数据连接标识
            'default'     => 'mysql',
            // 数据库连接信息
            'connections' => [
                'mysql' => \Yaconf::get('mysql'),
                'mongo' => [
                    // 数据库类型
                    'type'          => 'mongo',
                    // 服务器地址
                    'hostname'      => '127.0.0.1',
                    // 数据库名
                    'database'      => 'demo',
                    // 用户名
                    'username'      => '',
                    // 密码
                    'password'      => '',
                    // 主键转换为Id
                    'pk_convert_id' => true,
                    // 数据库调试模式
                    'debug'         => true,
                    // 端口
                    'hostport'      => '27017',
                ],
            ],
        ]);
    }

    public function _initCache(\Yaf\Dispatcher $dispatcher)
    {
        \swf\facade\Cache::config([
            'default' => 'file',
            'stores'  => [
                'file'  => [
                    'type'   => 'File',
                    // 缓存保存目录
                    'path'   => APP_PATH . '/runtime/cache/',
                    // 缓存前缀
                    'prefix' => '',
                    // 缓存有效期 0表示永久缓存
                    'expire' => 0,
                ],
                'redis' => [
                    'type'   => 'redis',
                    'host'   => '127.0.0.1',
                    'port'   => 6379,
                    'prefix' => '',
                    'expire' => 0,
                ],
            ],
        ]);
    }
}
