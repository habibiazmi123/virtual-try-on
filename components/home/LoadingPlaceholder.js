import React from "react"
import { Box, Stack, Skeleton, SkeletonText, Spinner } from "@chakra-ui/react"

function LoadingPlaceholder() {
  return (
    <Box height={"100%"}>
      <Stack
        boxShadow="lg"
        bg="gray.200"
        padding={2}
        marginBottom={2}
        position={"fixed"}
        top={0}
        height={"100%"}
        width={"100%"}
      >
        <Skeleton startColor="#0e1c28f0" endColor="black.400" height="100%">
          <Box>Loading</Box>
        </Skeleton>
        <Spinner
          thickness="4px"
          speed="0.50s"
          emptyColor="gray.200"
          color="black.500"
          size="xl"
          left={"45%"}
          top={"45%"}
          position={"fixed"}
        />
      </Stack>
      <Stack
        bg="gray.200"
        direction="row"
        padding={2}
        zIndex={2}
        bottom={150}
        position={"fixed"}
        width={"100%"}
        height={100}
      >
        <Skeleton startColor="#0e1c28f0" endColor="black.400" width="20%">
          <Box>Loading</Box>
        </Skeleton>
        <Skeleton startColor="#0e1c28f0" endColor="black.400" width="20%">
          <Box>Loading</Box>
        </Skeleton>
        <Skeleton startColor="#0e1c28f0" endColor="black.400" width="20%">
          <Box>Loading</Box>
        </Skeleton>
        <Skeleton startColor="#0e1c28f0" endColor="black.400" width="20%">
          <Box>Loading</Box>
        </Skeleton>
        <Skeleton startColor="#0e1c28f0" endColor="black.400" width="20%">
          <Box>Loading</Box>
        </Skeleton>
      </Stack>
      <Stack
        boxShadow="lg"
        direction="row"
        bg="gray.200"
        padding={2}
        bottom={0}
        position={"fixed"}
        width={"100%"}
        height={250}
      >
        <SkeletonText
          startColor="#0e1c28f0"
          endColor="black.400"
          noOfLines={2}
          spacing="4"
          skeletonHeight="4"
          width="50%"
          style={{ marginTop: "145px" }}
        />
        <Skeleton
          startColor="#0e1c28f0"
          endColor="black.400"
          width="50%"
          borderRadius={50}
          style={{
            marginTop: "145px",
            marginBottom: "50px",
            marginLeft: "100px",
            marginRight: "20px",
          }}
        >
          <Box>Loading</Box>
        </Skeleton>
      </Stack>
    </Box>
  )
}

export default LoadingPlaceholder
