<?php
class Race_Date extends ActiveRecord\Model
{
    static $table_name = 'race_date';
    static $primary_key = 'id';

    static $has_many = array(
        array('atheletes','class_name' => 'Athelete','foreign_key' => 'race_date_id')
    );
}
