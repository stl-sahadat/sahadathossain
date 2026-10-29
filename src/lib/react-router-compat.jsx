'use client';
import React, { useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter, usePathname, useParams as useNextParams } from 'next/navigation';

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === 'number') {
      if (typeof window !== 'undefined') {
        if (to === -1) window.history.back();
        else if (to === 1) window.history.forward();
      }
      return;
    }
    if (typeof to === 'string') {
      router.push(to);
    }
  };
}

export function useLocation() {
  const pathname = usePathname() || '/';
  return useMemo(() => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    return {
      pathname,
      search,
      hash,
      state: null,
      key: 'default',
    };
  }, [pathname]);
}

export function useParams() {
  try {
    return useNextParams() || {};
  } catch (e) {
    return {};
  }
}

export function Link({ to, href, children, className, style, onClick, target, rel, ...props }) {
  const destination = to || href || '#';
  return (
    <NextLink
      href={destination}
      className={className}
      style={style}
      onClick={onClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, className, children, ...props }) {
  const pathname = usePathname() || '/';
  const destination = to || href || '#';
  const isActive = pathname === destination;
  const resolvedClass = typeof className === 'function' ? className({ isActive }) : className;
  return (
    <NextLink href={destination} className={resolvedClass} {...props}>
      {children}
    </NextLink>
  );
}

export function BrowserRouter({ children }) {
  return <>{children}</>;
}

export function Routes({ children }) {
  return <>{children}</>;
}

export function Route({ element }) {
  return element || null;
}

export function Outlet() {
  return null;
}
