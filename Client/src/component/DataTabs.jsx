
import { Tabs, TabList, Tab } from '@chakra-ui/react';


export default function DataTabs({setSelectedTab}) {


    return (
        <>
            <Tabs mb={4} onChange={(index) => setSelectedTab(index === 0 ? 'cow' : index === 1 ? 'medicalExam' : index === 2 ? 'birth' : 'milkProduction')}>
                <TabList>
                    <Tab>Cow</Tab>
                    <Tab>Medical Exams</Tab>
                    <Tab>Births</Tab>
                    <Tab>Milk Production</Tab>
                </TabList>
            </Tabs>

        </>
    );
}
//

