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

namespace App\PanelBundle\Controller;

use Symfony\Component\HttpFoundation\Response;

/**
 * @author Rafał Mikołajun <rafal@mikoweb.pl>
 * @package vSymfo CMF
 * @subpackage PanelBundle_Controller
 */
class DefaultController extends Controller
{
    /**
     * @return Response
     */
    public function indexAction()
    {
        return $this->renderDocument('AppPanelBundle:Default:index.html.twig');
    }

    /**
     * {@inheritdoc}
     */
    public function getCrudOptions()
    {
        return [];
    }
}
