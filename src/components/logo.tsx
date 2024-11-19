import Link from "next/link";
import Image from "next/image";
/* FIXME */ import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  &:hover img {
    transform: rotate(20deg);
  }
`;

// const Logo = () => {
//   const PrintImage = useColorModeValue(
//     "/home/brsy/dotfiles/Wallpapers/Firefox_wallpaper.png",
//     "/home/brsy/dotfiles/Wallpapers/Firefox_wallpaper-dark.png",
//   );
//
//   return (
//     <Link href="/">
//       <LogoBox>
//         <Image src={PrintImage} alt="Logo" width={30} height={30} />
//         <Text
//           color={useColorModeValue("gray.800", "whiteAlpha.900")}
//           fontFamily="M PLUS Rounded 1c"
//           fontWeight="bold"
//           ml={3}
//         >
//           Briheet Singh Yadav
//         </Text>
//       </LogoBox>
//     </Link>
//   );
// };

// export default Logo;
