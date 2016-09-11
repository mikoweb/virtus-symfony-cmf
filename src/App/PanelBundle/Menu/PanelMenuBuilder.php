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

namespace App\PanelBundle\Menu;

use vSymfo\Core\Menu\MenuBuilderAbstract;

/**
 * @author Rafał Mikołajun <rafal@mikoweb.pl>
 * @package vSymfo CMF
 * @subpackage PanelBundle_Menu
 */
class PanelMenuBuilder extends MenuBuilderAbstract
{
    /**
     * {@inheritdoc}
     */
    public function createMenu()
    {
        return $this->loadMenuFromXml(__DIR__ . '/../Resources/config/panel_menu.xml');
    }

    /**
     * {@inheritdoc}
     */
    protected function translationDomain()
    {
        return 'panel_menu';
    }
}
