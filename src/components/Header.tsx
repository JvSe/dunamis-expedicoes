"use client"

import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Image, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { HTMLAttributes, useEffect, useState } from "react";
import { CgMenuRight } from 'react-icons/cg';
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { NavBar } from "./NavBar";

type HeaderProps = HTMLAttributes<HTMLDivElement> & {}

const listIcons = [
  { icon: <FaWhatsapp />, route: 'https://api.whatsapp.com/send?phone=556392437096' },
  { icon: <FaInstagram />, route: 'https://www.instagram.com/dunamis_expedicoes/' },
  { icon: <FaTiktok />, route: 'https://www.tiktok.com/@dunamis_expedicoes' },
  { icon: <FaYoutube />, route: 'https://www.youtube.com/@dunamis_expedicoes' },
]

export function Header({ ...rest }: HeaderProps) {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const [color, _setColor] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleScrollWindow = () => {
    const position = window.scrollY;
    return position <= 100 ? _setColor(true) : _setColor(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollWindow, true)
    return () => {
      window.removeEventListener('scroll', handleScrollWindow, true);
    }
  }, []);

  return (
    <div className={`${color ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[#112126a8]'} flex w-full h-[5rem] shadow-lg rounded-2xl backdrop-filter backdrop-blur px-[0.5rem] 2xl:px-[4rem] items-center transition`}>
      <div className="flex flex-1">
        <Image
          src="/assets/logo.png"
          w={"5rem"}
        />
      </div>

      {isMobile ?
        <div className="flex flex-1 justify-end" onClick={onOpen}>
          <Icon color="white" fontSize="4xl" as={CgMenuRight} />
        </div>
        :
        <>
          <div className="w-full flex-[5] pt-1">
            <NavBar className="text-md text-center justify-center" />
          </div>
          <div className="flex w-full items-center flex-1 justify-end">
            {listIcons.map((buttons, _) => (
              <a href={buttons.route} target="_blank" key={_}>
                <div className="flex cursor-pointer p-1 pr-3 text-white text-xl rounded-full hover:scale-105">
                  {buttons.icon}
                </div>
              </a>
            ))}
          </div>
        </>
      }

      <Drawer isOpen={isOpen} size="full" placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="#112126ff" p="4">
            <DrawerCloseButton color="white" mt={6} />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <Flex flexDir="column" h="full" align="center">
                <div onClick={onClose}>
                  <NavBar />
                </div>
                <Flex mt="auto" flexDir="column" color="#ffffff4b" align="center" fontFamily="var(--font-lato)" gap={2}>
                  <Image w="25%" src='/assets/logo.png' alt="logo Dunamis Expedições" />
                  <Text fontSize="sm">© Todos os direitos reservados</Text>
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  )
}