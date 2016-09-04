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

namespace App\WebBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * @author Rafał Mikołajun <rafal@mikoweb.pl>
 * @package vSymfo CMF
 * @subpackage WebBundle_DependencyInjection
 */
class AppWebExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
    }
}
