import {
    Pressable, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';
import { fetchUserData } from '../../firebase/config';
import Module from '../../components/ui/Module';

function ModuleList() {
    const [modulesTaken, setModulesTaken] = useState([]);
    const [modulesTeaching, setModulesTeaching] = useState([]);

    useEffect(() => {
        retrieveModules();
    }, []);

    const retrieveModules = async () => {
        try {
            const studentDetails = await fetchUserData(); // Assuming this function retrieves the module data from Firestore
            setModulesTaken(studentDetails.modulesTaken);
            setModulesTeaching(studentDetails.modulesTeaching);

        } catch (error) {
            console.log('Error retrieving modules:', error);
        }
    };

    return (
        <View>
            <Text>Modules Taken:</Text>
            {modulesTaken.map(module => (
                // <Module moduleCode={module} />
                <Text>{module}</Text>
            ))}

            <Text>Modules Teaching:</Text>
            {modulesTeaching.map(module => (
                // <Module moduleCode={module} />
                <Text>{module}</Text>
            ))}
        </View>
    );

    //       <View>
    //       {sortedSlots.map((slot) => (
    //           <Slot key={slot.id} slot={slot} buttonLabel={'Cancel Slot'} func={handleCancelSlot} user={'student'} />
    //       ))}
    //   </View>

    // return (
    //     <View>
    //       <Text>Modules Taken:</Text>
    //       {modulesTaken.map(module => (
    //         <Text key={module.id}>{module.name}</Text>
    //       ))}

    //       <Text>Modules Teaching:</Text>
    //       {modulesTeaching.map(module => (
    //         <Text key={module.id}>{module.name}</Text>
    //       ))}
    //     </View>
    //   );

}

export default ModuleList;
