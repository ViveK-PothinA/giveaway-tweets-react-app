import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    useColorMode} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex
            align="center"
            boxSize="full"
            bg={useColorModeValue('twitter.400', 'gray.900')}
            justifyContent={'space-between'}
            position="fixed"
            h={12}
            zIndex={1000}
        >
                <Box marginLeft={5}>Giveaway Tweets Search</Box>

                <Button marginRight={5} variant={'outline'} colorScheme='white' onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
        </Flex>
    );
}