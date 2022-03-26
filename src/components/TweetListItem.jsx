import { Box, ListItem, Heading, Text } from "@chakra-ui/react";
export const TweetListItem = (props) => {
    return (
        <ListItem key={props.tweetId}>
              <Box
                marginTop={{ base: '1', sm: '5' }}
                display="flex"
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent="space-between">
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: '3', sm: '0' }}>
                  <Heading as="h3" size='md'>{props.username}</Heading>
                  <Text
                    as="p"
                    marginTop="2"
                    fontSize="sm">
                    {props.tweet}
                  </Text>
                  <Heading as="h4" size='sm'>tweetId: {props.tweetId}</Heading>
                </Box>
              </Box>
            </ListItem>
    );
};