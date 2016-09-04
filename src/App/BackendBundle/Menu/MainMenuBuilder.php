<?php

/*
 * This file is part of the vSymfo CMF.
 *
 * website: www.mikoweb.pl
 * (c) Rafał Mikołajun <rafal@mikoweb.pl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\BackendBundle\Menu;

use vSymfo\Core\Menu\MenuBuilderAbstract;

/**
 * @author Rafał Mikołajun <rafal@mikoweb.pl>
 * @package vSymfo CMF
 * @subpackage Menu
 */
class MainMenuBuilder extends MenuBuilderAbstract
{
    /**
     * {@inheritdoc}
     */
    public function createMenu()
    {
        return $this->loadMenuFromXml(__DIR__ . '/../Resources/config/main_menu.xml');
    }

    /**
     * {@inheritdoc}
     */
    protected function translationDomain()
    {
        return 'backend_main_menu';
    }
}
