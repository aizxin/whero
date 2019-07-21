<?php
/**
 * FileName: Controller.php
 * ==============================================
 * Copy right 2016-2017
 * ----------------------------------------------
 * This is not a free software, without any authorization is not allowed to use and spread.
 * ==============================================
 * @author: kong | <iwhero@yeah.com>
 * @date  : 2019-07-16 14:21
 */

use Yaf\Registry;
use Yaf\Dispatcher;
use think\Container;
use swf\event\EventDispatcher;

class Controller extends \Yaf\Controller_Abstract
{
    /**
     * @var
     * Author: kong | <iwhero@yeah.com>
     */
    public $response;
    /**
     * @var
     * Author: kong | <iwhero@yeah.com>
     */
    public $request;
    /**
     * @var
     * Author: kong | <iwhero@yeah.com>
     */
    public $swoole;

    /**
     * @var
     * Author: kong | <iwhero@yeah.com>
     */
    public $dispatcher;

    /**
     * @var
     * Author: kong | <iwhero@yeah.com>
     */
    public $app;

    /**
     * @var
     * Author: kong | <iwhero@yeah.com>
     */
    public $event;

    public function init()
    {
        $this->response = Registry::get('response');
        $this->request = Registry::get('request');
        $this->swoole = Registry::get('swoole');
        $this->dispatcher = Dispatcher::getInstance();
        $this->app = $this->dispatcher->getApplication();
        $this->event = Container::getInstance()->make(EventDispatcher::class);
    }
}