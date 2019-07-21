<?php

/**
 * @name SamplePlugin
 * @desc   Yaf定义了如下的6个Hook,插件之间的执行顺序是先进先Call
 * @see    http://www.php.net/manual/en/class.yaf-plugin-abstract.php
 * @author afoii-12\administrator
 */
class RouterPlugin extends \Yaf\Plugin_Abstract
{

    private $dispatcher;

    public function __construct(\Yaf\Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }


    public function routerStartup(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
        if ((new \Yaf\Route_Static())->match($request->getRequestUri())) {

            $router = \Yaconf::get('routes');

            $keys = array_keys($router);
            $index = array_search($request->getRequestUri(), array_column($router, 'match'));

            if ($index !== false){
                // 2
                //$request->setModuleName('admin');
                //$request->setRequestUri('auth/info');

                $array_names = $router[$keys[$index]]['route'] ?? ['error','error'];
                // 3
                $request->setRequestUri(implode('/',array_values($array_names)));
            }
        }


    }

    public function routerShutdown(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {

    }

    public function dispatchLoopStartup(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }

    public function preDispatch(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }

    public function postDispatch(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }

    public function dispatchLoopShutdown(\Yaf\Request_Abstract $request, \Yaf\Response_Abstract $response)
    {
    }
}
