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

namespace App\BackendBundle\Controller;

use vSymfo\Bundle\FOSUserBundle\Controller\SecurityController as BaseController;

/**
 * @author Rafał Mikołajun <rafal@mikoweb.pl>
 * @package vSymfo CMF
 * @subpackage BackendBundle_Controller
 */
class SecurityController extends BaseController
{
    /**
     * @inheritdoc
     */
    protected function renderLogin(array $data)
    {
        return $this->render('AppWebBundle:Backend/Security:login.html.twig', $data);
    }
}
