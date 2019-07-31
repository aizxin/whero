<?php
/**
 * FileName: LoginController.php
 * ==============================================
 * Copy right 2016-2017
 * ----------------------------------------------
 * This is not a free software, without any authorization is not allowed to use and spread.
 * ==============================================
 * @author: kong | <iwhero@yeah.com>
 * @date  : 2019-07-20 01:26
 */

class AuthController extends Controller
{
    /**
     * 登录
     * @author: kong | <iwhero@yeah.com>
     * @date  : 2019-07-20 12:15
     */
    public function loginAction()
    {
        $this->response->cookie('12535647588',md5('12345678'),time()+24*60*60,'/');
        return $this->response->write('{"code":200,"message":"OK","data":{"id":1,"username":"admin","email":"chuanshuo_yongyuan@163.com","mobile":"18988450185","create_ip":"127.0.0.1","last_login_time":1560398044,"last_login_ip":"10.1.1.1","status":1,"roles":["admin"]}}');
    }

    /**
     * 获取 用户信息
     * @return mixed
     * @author: kong | <iwhero@yeah.com>
     * @date  : 2019-07-20 12:56
     */
    public function infoAction()
    {
        /* 自己输出响应 */
        return $this->response->write('{"code":200,"message":"OK","data":{"id":1,"username":"admin","email":"chuanshuo_yongyuan@163.com","mobile":"18988450185","create_ip":"127.0.0.1","last_login_time":1560398044,"last_login_ip":"10.1.1.1","status":1,"roles":["admin"]}}');
    }

    /**
     * 退出
     * @author: kong | <iwhero@yeah.com>
     * @date  : 2019-07-21 11:38
     */
    public function logoutAction()
    {
        $this->response->cookie('12535647588',md5('12345678'),10,'/');
        return $this->response->write(json_encode([
            "code" => 0, "message" => "请登录", "data" => [],
        ]));
    }


}