'use client';

import { useState } from 'react';

import Link from 'next/link';
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenu,
} from '@nextui-org/react';

import museoClassName from '@/components/admin/layout/fonts';

import paths from '@/utils/paths/admin';
import useDevice from '@/utils/useDevice';

export default function AdminHeader() {
  const { isDesktop } = useDevice();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => !isDesktop && setIsMenuOpen(!isMenuOpen);

  const pages = [
    {  title: 'Posts', label: 'posts', url: paths.posts() },
    {  title: 'Categories', label: 'categories', url: paths.categories() },
    {  title: 'Tags', label: 'tags', url: paths.tags() },
    {  title: 'Users', label: 'users', url: paths.users() },
  ].map(page => (
    <NavbarItem key={page.label}>
      <Link
        href={page.url}
        title={page.title}
        onClick={toggleMenu}
      >
        {page.title}
      </Link>
    </NavbarItem>
  ));

  return (
    <Navbar
      maxWidth="full"
      height="3rem"
      shouldHideOnScroll
      className="bg-sky-300 text-white"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle className="sm:hidden" />
      <div>
        Admin
      </div>  
      <NavbarContent className="hidden sm:flex">
        {pages}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>a</NavbarItem>
      </NavbarContent>
      <NavbarMenu className={`${museoClassName} bg-gradient-to-b from-sky-300 to-sky-300/10 text-white`}>
        {pages}
      </NavbarMenu>
    </Navbar>
  );
}
