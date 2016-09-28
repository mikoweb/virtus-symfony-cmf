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

use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use vSymfo\Bundle\UserBundle\Entity\Group;
use vSymfo\Bundle\UserBundle\Entity\Role;
use vSymfo\Core\DataFixtures\AbstractGroupFixture;

/**
 * @author Rafał Mikołajun <rafal@mikoweb.pl>
 * @package vSymfo CMF
 * @subpackage PanelBundle_DataFixtures_Install
 */
class LoadGroupData extends AbstractGroupFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        /** @var Group $user */
        $user = $this->createGroup($manager, Group::NAME_USER, Role::ROLE_USER);
        $this->setReference('Group.User', $user);
        $user->setType(Group::TYPE_USER);

        /** @var Group $admin */
        $admin = $this->createGroup($manager, Group::NAME_ADMIN, Role::ROLE_ADMIN);
        $this->setReference('Group.Admin', $admin);
        $admin->setType(Group::TYPE_EMPLOYEE);

        foreach ($manager->getRepository(Role::class)->findAll() as $role) {
            $this->setReference('Role.' . $role->getRole(), $role);
        }

        $this->loadGroupRolesFromXml('group_roles.xml', $manager);

        $manager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getGroupClass()
    {
        return Group::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getRoleClass()
    {
        return Role::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 40;
    }
}
