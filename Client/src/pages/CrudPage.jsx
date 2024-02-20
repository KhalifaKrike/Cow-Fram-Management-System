import React, { useState, useEffect } from 'react';
import { Container, Heading, Button } from '@chakra-ui/react';
import axios from 'axios';
import DataTable from '../component/DataTable';
import DataTabs from '../component/DataTabs';
import CowDataForm from '../component/Forms/CowDataForm';
import MedicalExamsDataForm from '../component/Forms/MedicalExamsDataForm';
import BirthForm from '../component/Forms/BirthForm';
import MilkProductionDataForm from '../component/Forms/MilkProductionDataForm';


export default function CrudPage() {
    const selectedTabInfo = {
        cow: [['ID', 'EntryDate', 'BirthDate', 'Breed'], ['CowID', 'EntryDate', 'BirthDate', 'Breed']],
        medicalExam: [['ID', 'Disease', 'CowID', 'ExamDate', 'Result'], ['ExamID', 'Disease', 'CowID', 'ExamDate', 'Result']],
        birth: [['ID', 'MotherCowID', 'CowID', 'BirthDate'], ['BirthID', 'MotherCowID', 'CowID', 'BirthDate']],
        milkProduction: [['ID', 'ProductionDate', 'CowID', 'MilkQuantity'], ['ProductionID', 'ProductionDate', 'CowID', 'MilkQuantity']]
    };

    const url = import.meta.env.VITE_API_URL;

    const [token, setToken] = useState('');
    const [newEntry, setNewEntry] = useState({});
    const [selectedTab, setSelectedTab] = useState('cow');
    const [data, setData] = useState([]);
   
    
    useEffect(() => {
        const cookies = document.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
            prev[name] = decodeURIComponent(value);
            return prev;
        }, {});
        console.log(cookies.jwt);
        // Set the token state
        setToken(cookies.jwtToken);
        fetchData(selectedTab);
    }, [selectedTab]);

    const fetchData = async (tab) => {
        // Implement fetching data based on tab if needed
        try {
            // Fetch data based on tab
            const response = await axios.get(`${url}${tab}`);
            setData(response.data);
        } catch (error) {
            console.error(`Error fetching ${tab} data:`, error);
        }
    };
    const sendData = async () => {
        try {
            // post new data to the API 
            const response = await axios.post(`${url}${selectedTab}`, newEntry);
            console.log(response.data);
            fetchData(selectedTab);
        } catch (error) {
            console.error(`Error posting data to ${tab} :`, error);
        }
    }
    const deleteData = async (id) => {
        try {
            // post new data to the API 
            const response = await axios.delete(`${url}${selectedTab}/${id}`);
            console.log(response.data);
            fetchData(selectedTab);
        } catch (error) {
            console.error(`Error deleting ${tab} data:`, error);
        }
    }
    const updateData = async (id) => {
        try {
            // post new data to the API 
            const response = await axios.patch(`${url}${selectedTab}/${id}`, newEntry);
            console.log(response.data);
            fetchData(selectedTab);
        } catch (error) {
            console.error(`Error updating ${tab} data:`, error);
        }
    }

    return (
        <>

            <Container maxW="container.md" mt={8}>
                <Heading mb={4}>Cow Fram Management System</Heading>
                <Button size="sm" colorScheme="teal" position="absolute" top={4} right={24}>User</Button>
                <Button size="sm" colorScheme="red" position="absolute" top={4} right={4}>Logout</Button>

                <DataTabs setSelectedTab={setSelectedTab} />

                {selectedTab === 'cow' ? <CowDataForm
                                            setNewEntry={setNewEntry}
                                            newEntry={newEntry}
                                            selectedTab={selectedTab}
                                            sendData={sendData} /> :
                    selectedTab === 'medicalExam' ? <MedicalExamsDataForm
                                                setNewEntry={setNewEntry}
                                                newEntry={newEntry}
                                                selectedTab={selectedTab}
                                                sendData={sendData}
                                                url={url} /> : 
                    selectedTab === 'birth' ? <BirthForm
                                                setNewEntry={setNewEntry}
                                                newEntry={newEntry}
                                                selectedTab={selectedTab}
                                                sendData={sendData}
                                                url={url} />
                                            : <MilkProductionDataForm
                                                setNewEntry={setNewEntry}
                                                newEntry={newEntry}
                                                selectedTab={selectedTab}
                                                sendData={sendData}
                                                url={url} />
                    }

                <DataTable data={data}
                           selectedTabThead={selectedTabInfo[selectedTab][0]}
                           keys={selectedTabInfo[selectedTab][1]} 
                           deleteData={deleteData}
                           newEntry={newEntry}
                           setNewEntry={setNewEntry}
                           selectedTab={selectedTab}
                           updateData={updateData} 
                           url={url}/>
                

            </Container>
        </>
    );
}

