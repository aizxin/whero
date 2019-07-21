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
     *
     * @author: kong | <iwhero@yeah.com>
     * @date  : 2019-07-20 12:15
     */
    public function loginAction()
    {
        $this->response->cookie('12535647588',md5('12345678'),time()+24*60*60,'/');
    }

    /**
     * 获取 用户信息
     * @return mixed
     * @author: kong | <iwhero@yeah.com>
     * @date  : 2019-07-20 12:56
     */
    public function infoAction()
    {
//        echo $this->getModuleName();
//        var_dump(json_encode([
//            "code" => 0, "message" => "请登录", "data" => 1122,
//        ]));
//        return;
        /* 自己输出响应 */
        return $this->response->write(json_encode([
            "code" => 0, "message" => "请登录", "data" => $this->request->cookie['12535647588'],
        ]));
    }


}