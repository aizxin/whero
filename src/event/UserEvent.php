<?php
/**
 * FileName: UserEvent.php
 * ==============================================
 * Copy right 2016-2017
 * ----------------------------------------------
 * This is not a free software, without any authorization is not allowed to use and spread.
 * ==============================================
 * @author: kong | <iwhero@yeah.com>
 * @date  : 2019-07-16 13:00
 */

namespace swf\event;


class UserEvent
{
    public $user;
    public function __construct($user)
    {
        $this->user = $user;
    }
}