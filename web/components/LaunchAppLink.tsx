"use client";

import { useEffect, useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { API_URL, APP_URL, LOGIN_URL } from "@/lib/config";

type LaunchAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

let cachedLaunchUrl: string | null = null;
let pendingLaunchUrlRequest: Promise<string> | null = null;

const fetchLaunchUrl = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    return APP_URL;
  }

  if (response.status === 401) {
    return LOGIN_URL;
  }

  throw new Error(`Unexpected auth status while resolving app launch: ${response.status}`);
};

const resolveLaunchUrl = async () => {
  if (cachedLaunchUrl) {
    return cachedLaunchUrl;
  }

  if (!pendingLaunchUrlRequest) {
    pendingLaunchUrlRequest = fetchLaunchUrl()
      .catch((error) => {
        console.error("Failed to resolve landing page app launch URL.", error);
        return LOGIN_URL;
      })
      .then((url) => {
        cachedLaunchUrl = url;
        pendingLaunchUrlRequest = null;
        return url;
      });
  }

  return pendingLaunchUrlRequest;
};

export default function LaunchAppLink({
  children,
  href,
  onClick,
  ...props
}: LaunchAppLinkProps) {
  const [resolvedHref, setResolvedHref] = useState(href || LOGIN_URL);

  useEffect(() => {
    let isActive = true;

    resolveLaunchUrl().then((url) => {
      if (isActive) {
        setResolvedHref(url);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  const handleClick: LaunchAppLinkProps["onClick"] = async (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    const url = await resolveLaunchUrl();
    window.location.assign(url);
  };

  return (
    <a {...props} href={resolvedHref} onClick={handleClick}>
      {children}
    </a>
  );
}
