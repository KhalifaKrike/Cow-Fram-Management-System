import React, { useState, useEffect } from 'react';
import { Container, Heading, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import DataTable from '../component/DataTable';
import DataTabs from '../component/DataTabs';
import CowDataForm from '../component/Forms/CowDataForm';
import MedicalExamsDataForm from '../component/Forms/MedicalExamsDataForm';
import BirthForm from '../component/Forms/BirthForm';
import MilkProductionDataForm from '../component/Forms/MilkProductionDataForm';
import { useNavigate } from 'react-router-dom';
import LougoutModel from '../component/modal/LougoutModel';
import ProfileModel from '../component/modal/ProfileModel';


export default function CrudPage() {
    const selectedTabInfo = {
        cow: [['ID', 'EntryDate', 'BirthDate', 'Breed'], ['CowID', 'EntryDate', 'BirthDate', 'Breed']],
        medicalExam: [['ID', 'Disease', 'CowID', 'ExamDate', 'Result'], ['ExamID', 'Disease', 'CowID', 'ExamDate', 'Result']],
        birth: [['ID', 'MotherCowID', 'CowID', 'BirthDate'], ['BirthID', 'MotherCowID', 'CowID', 'BirthDate']],
        milkProduction: [['ID', 'ProductionDate', 'CowID', 'MilkQuantity'], ['ProductionID', 'ProductionDate', 'CowID', 'MilkQuantity']]
    };

    const url = import.meta.env.VITE_API_URL;

    
    const [token, setToken] = useState('');
    const [profile, setProfile] = useState(false);
    const [logout, setLogout] = useState(false);
    const [newEntry, setNewEntry] = useState({});
    const [selectedTab, setSelectedTab] = useState('cow');
    const [data, setData] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();
    
    useEffect(() => {
        const cookies = document.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
            prev[name] = decodeURIComponent(value);
            return prev;
        }, {});
        if(!cookies.jwt) navigate('/'); // if not autherized
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
            toast({
                title: 'Error',
                description: 'An error occurred while fetching the data.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const sendData = async () => {
        try {
            // post new data to the API 
            const response = await axios.post(`${url}${selectedTab}`, newEntry);
            console.log(response.data);
            fetchData(selectedTab);
            toast({
                title: 'Success',
                description: 'Data created successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
        } catch (error) {
            console.error(`Error posting data to ${tab} :`, error);
            toast({
                title: 'Error',
                description: 'An error occurred while creating the data.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }
    const deleteData = async (id) => {
        try {
            // post new data to the API 
            const response = await axios.delete(`${url}${selectedTab}/${id}`);
            console.log(response.data);
            fetchData(selectedTab);
            toast({
                title: 'Success',
                description: 'Data deleted successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
        } catch (error) {
            console.error(`Error deleting  data:`, error);
            toast({
                title: 'Error',
                description: 'An error occurred while deleting the data.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }
    const updateData = async (id) => {
        try {
            // post new data to the API 
            const response = await axios.patch(`${url}${selectedTab}/${id}`, newEntry);
            console.log(response.data);
            fetchData(selectedTab);
            toast({
                title: 'Success',
                description: 'Data updated successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
        } catch (error) {
            console.error(`Error updating data:`, error);
            toast({
                title: 'Error',
                description: 'An error occurred while updating the data',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <>

            <Container maxW="container.md" mt={8}>
                <Heading mb={4}>Cow Fram Management System</Heading>
                <Button size="sm" colorScheme="teal" position="absolute" top={4} right={24} onClick={()=>setProfile(true)}>User</Button>
                <Button size="sm" colorScheme="red" position="absolute" top={4} right={4} onClick={()=>setLogout(true)}>Logout</Button>

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
                <LougoutModel isOpen={logout} setIsOpen={setLogout} navigate={navigate} />
                <ProfileModel isOpen={profile} setIsOpen={setProfile} /> 
            </Container>
        </>
    );
}

