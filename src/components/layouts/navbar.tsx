"use client";
import NextLink from "next/link";
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "../ui/color-mode";
import React from "react";

interface LinkItemProps {
  href: string;
  path: string;
  children: React.ReactNode;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, path, children }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");
  return (
    <>
      <NextLink href={href}>
        <Link
          p={2}
          bg={active ? "glassTeal" : undefined}
          color={active ? "#202023" : inactiveColor}
        >
          {children}
        </Link>
      </NextLink>
    </>
  );
};

const Navbar = () => {
  return (
    <Box
      position="fixed"
      top={0} // Ensure the navbar is at the top
      left={0} // Ensure it's aligned to the left edge of the viewport
      w="100%" // Full width
      bg={useColorModeValue("#ffffff40", "20202380")}
      style={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      p={4} // Add some padding if needed
    >
      Navbar
    </Box>
  );
};

export default Navbar;
