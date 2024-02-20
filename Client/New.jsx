import React, { useState, useEffect } from 'react';
import { Center,Avatar, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Input, FormControl, FormLabel, Tabs, TabList, Tab } from '@chakra-ui/react';
import axios from 'axios';

function New() {
    const url = "http://localhost:3001/";
    const [newEntry, setNewEntry] = useState({});
    const [selectedTab, setSelectedTab] = useState('cow');
    const [data, setData] = useState([{
        id:1,
        EntryDate:"2024-02-17",
        BirthDate: null,
        breed:"Montbéliarde"
    }]);
    useEffect(() => {
        fetchData(selectedTab);
    }, [selectedTab]);

    const fetchData = async (tab) => {
        // Implement fetching data based on tab if needed
        // Example: fetchData from API based on tab name
        try {
            // Fetch data based on tab
            const response = await axios.get(`${url}${tab}`);
            setData(response.data);
        } catch (error) {
            console.error(`Error fetching ${tab} data:`, error);
        }
    };
    console.log(data);
    return (
        <>
        
        <Container maxW="container.md" mt={8}>
            <Heading mb={4}>Cow Management System</Heading>
            <Button size="sm" colorScheme="teal" position="absolute" top={4} right={24}>User</Button>
            <Button size="sm" colorScheme="red" position="absolute" top={4} right={4}>Logout</Button>
            <Tabs mb={4} onChange={(index) => setSelectedTab(index === 0 ? 'cow' : index === 1 ? 'medicalExam' : index === 2 ? 'births' : 'milkProduction')}>
                <TabList>
                    <Tab>Cow</Tab>
                    <Tab>Medical Exams</Tab>
                    <Tab>Births</Tab>
                    <Tab>Milk Production</Tab>
                </TabList>
            </Tabs>

            <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Name"
                    value={newEntry.name || ''}
                    onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
                />
                <FormLabel mt={2}>Breed</FormLabel>
                <Input
                    type="text"
                    placeholder="Breed"
                    value={newEntry.breed || ''}
                    onChange={e => setNewEntry({ ...newEntry, breed: e.target.value })}
                />
                <Button mt={4} colorScheme="teal" >Add {selectedTab.slice(0, 1).toUpperCase() + selectedTab.slice(1)}</Button>
            </FormControl>
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>EntryDate</Th>
                        <Th>BirthDate</Th>
                        <Th>Breed</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.length>0 ? data.map(entry => (
                        <Tr key={entry.CowID}>
                            <Td>{entry.CowID}</Td>
                            <Td>{entry.EntryDate}</Td>
                            <Td>{entry.BirthDate}</Td>
                            <Td>{entry.Breed}</Td>
                            <Td>
                                <Button colorScheme="red">Delete</Button>
                                <Button ml={2}>Update</Button>
                            </Td>
                        </Tr> 
                    )) : <td colSpan={5}>
                            <Center>
                                <Heading mb={4} size={20} >NO DATA</Heading>
                            </Center>
                        </td>}
                </Tbody>
            </Table>
        </Container>
        </>
    );
}

export default New;
