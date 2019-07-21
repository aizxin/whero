<?php
/** 
 * @Author: whero 
 * @Date: 2018-05-26 17:42:17 
 * @Desc: 默认控制器 
 */

use swf\model\UserModel;

class UserController extends Controller {

	/** 
	 * @Author: whero 
	 * @Date: 2018-05-26 17:45:05 
	 * @Desc: 默认动作 
	 */	
	public function listAction() {
        /* 自己输出响应 */
        return $this->response->write('1234');
	}

}
