<?php
/**
 * FileName: TestProcess.php
 * ==============================================
 * Copy right 2016-2017
 * ----------------------------------------------
 * This is not a free software, without any authorization is not allowed to use and spread.
 * ==============================================
 * @author: kong | <iwhero@yeah.com>
 * @date  : 2019-07-20 00:44
 */

namespace swf\process;


class TestProcess extends AbstractProcess
{
    /**
     * @var string
     */
    public $name = 'TestProcess';

    public function handle(): void
    {
        var_dump('2111');
    }
}