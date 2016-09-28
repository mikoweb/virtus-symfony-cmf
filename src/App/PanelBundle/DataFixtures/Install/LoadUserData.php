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

namespace App\PanelBundle\DataFixtures\Install;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use FOS\UserBundle\Model\UserManager;
use vSymfo\Bundle\UserBundle\Entity\Group;
use vSymfo\Bundle\UserBundle\Entity\User;

/**
 * @author Rafał Mikołajun <rafal@mikoweb.pl>
 * @package vSymfo CMF
 * @subpackage PanelBundle_DataFixtures_Install
 */
class LoadUserData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var UserManager
     */
    protected $userManager;

    /**
     * {@inheritdoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
        $this->userManager = $this->container->get('fos_user.user_manager');
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $this->createUser('admin@test.local', 'admin', 'admin', 'Group.Admin');
    }

    /**
     * @param string $email
     * @param string $username
     * @param string $pass
     * @param string $groupReference
     *
     * @return User
     */
    public function createUser($email, $username, $pass, $groupReference)
    {
        if ($found = $this->userManager->findUserByUsername($username)) {
            $this->setReference('User.' . $username, $found);

            return $found;
        }

        /** @var User $user */
        $user = $this->userManager->createUser();
        $user->setEmail($email)
            ->setPlainPassword($pass)
            ->setUsername($username)
            ->setEnabled(true)
        ;

        /** @var Group $group */
        $group = $this->getReference($groupReference);
        $user->addGroup($group);
        $this->userManager->updateUser($user);

        $this->setReference('User.' . $username, $user);

        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 60;
    }
}
