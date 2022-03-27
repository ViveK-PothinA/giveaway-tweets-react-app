import React, { useState } from 'react';
import { Flex, Box, Button, Stack, Input, RadioGroup, Radio, InputGroup, InputLeftElement, useColorModeValue, useToast, VStack, List, ListItem, Heading, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
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
    const toast = useToast()

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
                
                if (response.status == 200) {
                    setSearchResults(jsonData.search_results);
                    setSearchTime(jsonData.search_time);
                } else {
                    setSearchResults([]);
                    toast({
                        title: "Error (Response status: " + response.status + ")",
                        variant:'solid',
                        position: 'bottom-right',
                        description: jsonData.message,
                        status: 'error',
                        duration: 6000,
                        isClosable: true,
                      })
                }
                
                setSearchLoading(false);
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const bgColor = useColorModeValue('twitter.400', 'twitter.800');
    return (
        <div>
            <Accordion defaultIndex={[1]} allowMultiple pt={12} px={5}>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                What is this project about?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        The objective of the project is to build a search engine on Giveaway tweets, to make it searchable
                        and accessible for users to access through simple keyword searches. For the scope of this project, only
                        Bitcoin(BTC), Ethereum(ETH), and NFT Giveaways were selected. A corpus of tweets containing hashtags: #giveaway #BTC,
                        #giveaway #ETH, #giveaway #crypto, and #giveaway #NFT was collected. It was indexed with Lucene
                        and also, Hadoop MapReduce was used to generate Inverse Document Frequency.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Flex justifyContent={'center'} w={'full'} h={'auto'}>
                <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} my='5'>
                    <InputGroup size='lg' mb={3}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<Search2Icon />}
                        />
                        <Input variant='outline'
                            value={query}
                            onChange={handleChange}
                            placeholder='Type here to search' backgroundColor='whiteAlpha.300' />
                    </InputGroup>


                    <Stack direction='row' justifyContent='space-between' alignItems='center' >
                        <RadioGroup onChange={setValue} value={value}>
                            <Radio value='lucene'>Lucene Indexed</Radio>
                            <Radio value='hadoop' pl={6}>IDF by Hadoop MapReduce</Radio>
                        </RadioGroup>
                        <Button colorScheme='twitter'
                            isLoading={searchLoading}
                            loadingText='Loading' size='md'
                            onClick={() => fetchSearchResults(value, query)}>Search</Button>
                    </Stack>

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