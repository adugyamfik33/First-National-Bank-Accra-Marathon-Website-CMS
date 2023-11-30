<?php
class Race_Category extends ActiveRecord\Model
{
    static $table_name = 'race_category';
    static $primary_key = 'id';

    static $has_many = array(
        array('atheletes','class_name' => 'Athelete','foreign_key' => 'race_category_id')
    );
}
