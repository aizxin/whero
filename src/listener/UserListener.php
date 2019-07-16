<?php
/**
 * FileName: UserListener.php
 * ==============================================
 * Copy right 2016-2017
 * ----------------------------------------------
 * This is not a free software, without any authorization is not allowed to use and spread.
 * ==============================================
 * @author: kong | <iwhero@yeah.com>
 * @date  : 2019-07-16 12:58
 */

namespace swf\listener;



use swf\event\ListenerInterface;
use swf\event\UserEvent;
use swf\facade\Log;

class UserListener implements ListenerInterface
{
    public function listen(): array
    {
        return [
            UserEvent::class
        ];
    }

    public function process(object $event)
    {
        if ($event instanceof UserEvent){
            Log::write('=========99999999999');
            Log::write($event);
        }
    }
}