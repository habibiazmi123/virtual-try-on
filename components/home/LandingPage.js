import React from 'react'
import { Box, Button, Center, Img, SimpleGrid } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const LOGO_MAIN = 'https://mizora.jewelry/assets/images/logo-mizora.svg'
const ROUTES = [
  { title: 'Bracelets', path: '/?cat=bracelets&login=false&id_cat=7' },
  { title: 'Bangles', path: '/?cat=bangles&login=false&id_cat=8' },
  { title: 'Earrings', path: '/?cat=earrings&login=false&id_cat=9' },
  { title: 'Rings', path: '/?cat=rings&login=false&id_cat=10' },
  { title: 'Necklaces', path: '/?cat=necklaces&login=false&id_cat=11' },
]

function LandingPage() {
  const router = useRouter()
  return (
    <Box p="14">
      <Center>
        <Img src={LOGO_MAIN} h="100px" objectFit="contain" />
      </Center>
      <Center bg="white" p="10">
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2}>
          {ROUTES.map((r, i) => (
            <Button key={`path-${i}`} onClick={() => router.push(r.path)} w="150px">
              {r.title}
            </Button>
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  )
}

export default LandingPage
