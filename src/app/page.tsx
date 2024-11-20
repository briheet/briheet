import { Box, Heading, Container } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Box lineHeight="1.2" position={"absolute"} left={20} top={20}>
        <Heading
          as="h1"
          fontFamily="Mate SC, serif"
          fontSize="4xl"
          fontWeight="extralight"
          mb={2}
        >
          Briheet Singh Yadav
        </Heading>
        <p>Developer, Arch enjoyer</p>
      </Box>
    </>
  );
}
