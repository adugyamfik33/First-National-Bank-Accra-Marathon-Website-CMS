<?php
    header('Access-Control-Allow-Origin:*');
    require_once 'php-activerecord/ActiveRecord.php';

    ActiveRecord\Config::initialize(function($cfg)
    {
        $cfg->set_model_directory(dirname(__FILE__) . '/models');
        $cfg->set_connections(array(
            'development' => 'mysql://root:@localhost/dbmarathon'));
    });
