import { Container, Box, Heading, Flex } from "@chakra-ui/react";

export default function Page() {
  return (
    <Container maxW="container.md">
      <Flex
        direction="column"
        align="flex-start"
        justify="flex-start"
        p={4}
        mt={20}
      >
        <Box borderRadius="lg" bg="red" textAlign="center" p={3} mb={6}>
          Hello, I&apos;m a full stack developer based in India.
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Heading as="h2" fontSize="2xl">
            Briheet Singh Yadav
          </Heading>
          <p>Developer, Arch enjoyer</p>
        </Box>
      </Flex>
    </Container>
  );
}
