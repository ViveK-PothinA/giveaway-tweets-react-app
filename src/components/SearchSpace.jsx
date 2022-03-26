import React, { useState } from 'react';
import { Flex, Box, Button, Stack, Input, RadioGroup, Radio, InputGroup, InputLeftElement, useColorModeValue, VStack, List, ListItem, Heading } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons';
import { TweetListItem } from './TweetListItem';

export const SearchSpace = (props) => {
    const [value, setValue] = React.useState('lucene');
    const [query, setQuery] = React.useState('');
    const handleChange = (event) => {
        setQuery(event.target.value);
        if (event.target.value.length === 1) {
            emptyFetch();
        }
    }
    let [searchLoading, setSearchLoading] = useState(false);
    let [searchResults, setSearchResults] = useState([]);
    let [searchTime, setSearchTime] = useState(null);

    const emptyFetch = async () => {
        try {
            const response = await fetch(props.baseURL);
            console.log(response.url);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchSearchResults = async (searchMode, query) => {
        if (query.length === 0) setSearchResults([]);
        else {
            try {
                setSearchLoading(true);
                const response = await fetch(props.baseURL + "search/" + searchMode + "/" + query);
                const jsonData = await response.json();

                setSearchResults(jsonData.search_results);
                setSearchTime(jsonData.search_time);
                setSearchLoading(false);
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const bgColor = useColorModeValue('twitter.400', 'twitter.800');
    return (
        <div>

            <Flex justifyContent={'center'} w={'full'} h={'auto'}>
                <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} my='5'>
                    <InputGroup size='lg' mt={10} mb={3}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<Search2Icon />}
                        />
                        <Input variant='outline'
                            value={query}
                            onChange={handleChange}
                            placeholder='Type here to search' backgroundColor='whiteAlpha.300' />
                    </InputGroup>

                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row' justifyContent={'center'}>
                            <Radio value='lucene'>Lucene</Radio>
                            <Radio value='hadoop'>Hadoop</Radio>
                            <Button colorScheme='twitter'
                                isLoading={searchLoading}
                                loadingText='Loading'
                                onClick={() => fetchSearchResults(value, query)}>Search</Button>
                        </Stack>
                    </RadioGroup>
                </Box>
            </Flex>
            <Heading as={"h5"} size='sm'>Try queries like "ETH AND btc AND cool" or "aaanft OR aaarrh"</Heading>
            <Flex justifyContent={'center'} w={'full'} h={'auto'}
                visibility={(searchResults.length > 0) ? 'visible' : 'hidden'}>

                <VStack px={5}>
                    <List spacing={4} textAlign='left'>
                        <ListItem key={0} textAlign={'center'}>Results were fetched in {searchTime}</ListItem>

                        {searchResults.map(result =>
                            <TweetListItem username={result.user_name} tweet={result.tweet}
                                tweetId={result.tweet_id} />)}
                    </List>
                </VStack>

            </Flex>
        </div>);
};