<?php
/**
 * FileName: Index.php
 * ==============================================
 * Copy right 2016-2017
 * ----------------------------------------------
 * This is not a free software, without any authorization is not allowed to use and spread.
 * ==============================================
 * @author: kong | <iwhero@yeah.com>
 * @date  : 2019-07-18 13:43
 */

class IndexController extends Controller
{

    /**
     * @Author: whero
     * @Date  : 2018-05-26 17:45:05
     * @Desc  : 默认动作
     */
    public function indexAction()
    {
        /* 自己输出响应 */
        return $this->response->write($this->render("admin"));
    }
}