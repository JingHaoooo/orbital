import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const formatDate = (dateTime) => {
    const day = dateTime.toLocaleDateString('en-US', { weekday: 'short' }).split(',')[0];
    const date = dateTime.toLocaleDateString('en-US', { day: 'numeric' });
    const month = dateTime.toLocaleDateString('en-US', { month: 'long' });
    const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    const year = dateTime.getFullYear();
    return [day, date, month, time, year];
};

export const HomePageSlot = ({ slot, userRole }) => {
    const date = formatDate(new Date(slot.dateTime));
    return (
        <View style={styles.container} key={slot.id}>
            <View style={styles.leftContainer}>
                <View style={styles.dateContainer}>
                    <Text style={styles.detailText}>{date[2]}</Text>
                    <Text style={styles.date}>{date[1]}</Text>
                    <Text style={styles.detailText}>{date[4]}</Text>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayText}>{date[0]}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.module}>{slot.module}</Text>
                <Text style={styles.time}>{date[3]}</Text>
                <Text style={styles.detailText}>Duration: {slot.duration} minutes</Text>
                {userRole == 'STUDENT' ? (
                    <Text style={styles.detailText}>Tutor: {slot.tutorName}</Text>
                ) : (
                    <Text style={styles.detailText}>Student: {slot.studentName}</Text>
                )}
            </View>
            <View style={[styles.userRoleContainer, { backgroundColor: getRoleColor(userRole) }]}>
                <Text style={styles.userRoleText}>{userRole}</Text>
            </View>
        </View>
    );
};

const getRoleColor = (userRole) => {
    if (userRole === 'STUDENT') {
        return '#FFA500'; // Orange color for student
    } else if (userRole === 'TUTOR') {
        return '#00BFFF'; // Blue color for tutor
    } else {
        return '#808080'; // Gray color for other users
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 18,
        marginBottom: 12,
        padding: 8,
        height: 128,
        borderWidth: 2,
        borderColor: 'white', // #00BFFF  //FFA500
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 2,
        elevation: 5,
        position: 'relative',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer: {
        flex: 5,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFA500',
        width: windowWidth * 0.2,
        height: windowWidth * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    dayContainer: {
        flex: 1,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    date: {
        fontSize: windowWidth * 0.06,
    },
    text: {
        fontSize: windowWidth * 0.04,
    },
    button: {
        fontSize: windowWidth * 0.04,
        fontWeight: 'bold',
        color: 'red',
    },
    time: {
        fontSize: windowWidth * 0.04,
        color: 'blue',
    },
    module: {
        fontSize: windowWidth * 0.045,
        fontWeight: 'bold',
    },
    rightContainer: {
        flex: 3,
        paddingLeft: 16,
    },
    detailText: {
        fontSize: windowWidth * 0.035,
    },
    dayText: {
        fontSize: windowWidth * 0.035,
    },
    userRoleContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    userRoleText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
});


// const windowWidth = Dimensions.get('window').width;

// const formatDate = (dateTime) => {
//     const day = dateTime.toLocaleDateString('en-US', { weekday: 'short' }).split(',')[0];
//     const date = dateTime.toLocaleDateString('en-US', { day: 'numeric' });
//     const month = dateTime.toLocaleDateString('en-US', { month: 'long' });
//     const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
//     const year = dateTime.getFullYear();
//     return [day, date, month, time, year];
// };

// export const HomePageSlot = ({ slot, userRole }) => {
//     const date = formatDate(new Date(slot.dateTime));
//     return (
//         <View style={styles.container} key={slot.id}>
//             <View style={styles.leftContainer}>
//                 <View style={styles.dateContainer}>
//                     <Text style={styles.detailText}>{date[2]}</Text>
//                     <Text style={styles.date}>{date[1]}</Text>
//                     <Text style={styles.detailText}>{date[4]}</Text>
//                 </View>
//                 <View style={styles.dayContainer}>
//                     <Text style={styles.dayText}>{date[0]}</Text>
//                 </View>
//             </View>
//             <View style={styles.rightContainer}>
//                 <Text style={styles.module}>{slot.module} ({slot.userRole})</Text>
//                 <Text style={styles.time}>{date[3]}</Text>
//                 <Text style={styles.detailText}>Duration: {slot.duration} minutes</Text>
//                 {userRole == 'Student' ? (
//                     <Text style={styles.detailText}>Tutor: {slot.tutorName}</Text>
//                 ) : (
//                     <Text style={styles.detailText}>Student: {slot.studentName}</Text>
//                 )}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         flexDirection: 'row',
//         borderRadius: 10,
//         marginBottom: 12,
//         padding: 8,
//         height: 128,
//         borderWidth: 2,
//         borderColor: '#FFA500',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     leftContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         padding: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dateContainer: {
//         flex: 4,
//         backgroundColor: '#FFA500',
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#FFA500',
//         width: windowWidth * 0.2,
//         height: windowWidth * 0.2,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderTopRightRadius: 10,
//         borderBottomLeftRadius: 10,
//     },
//     dayContainer: {
//         flex: 1,
//         height: 'auto',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 4,
//     },
//     date: {
//         fontSize: windowWidth * 0.06,
//     },
//     text: {
//         fontSize: windowWidth * 0.04,
//     },
//     button: {
//         fontSize: windowWidth * 0.04,
//         fontWeight: 'bold',
//         color: 'red',
//     },
//     time: {
//         fontSize: windowWidth * 0.04,
//         color: 'blue',
//     },
//     module: {
//         fontSize: windowWidth * 0.045,
//         fontWeight: 'bold',
//     },
//     rightContainer: {
//         flex: 3,
//         paddingLeft: 16,
//     },
//     detailText: {
//         fontSize: windowWidth * 0.035,
//     },
//     dayText: {
//         fontSize: windowWidth * 0.035,
//     },
// });




// working draft
// const windowWidth = Dimensions.get('window').width;

// const formatDate = (dateTime) => {

//     const day = dateTime.toLocaleDateString('en-US', { weekday: 'short' }).split(',')[0];
//     const date = dateTime.toLocaleDateString('en-US', { day: 'numeric' });
//     const month = dateTime.toLocaleDateString('en-US', { month: 'long' });
//     const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
//     const year = dateTime.getFullYear();
//     return [day, date, month, time, year];
// };

// export const HomePageSlot = ({ slot, userRole }) => {
//     const date = formatDate(new Date(slot.dateTime));
//     return (
//         <View style={styles.container} key={slot.id}>
//             <View style={styles.leftContainer}>
//                 <View style={styles.dateContainer}>
//                     <Text style={styles.detailText}>{date[2]}</Text>
//                     <Text style={styles.date}>{date[1]}</Text>
//                     <Text style={styles.detailText}>{date[4]}</Text>
//                 </View>
//                 <View style={styles.dayContainer}>
//                     <Text style={styles.dayText}>{date[0]}</Text>
//                 </View>
//             </View>
//             <View style={styles.rightContainer}>
//                 <Text style={styles.module}>{slot.module} ({slot.userRole})</Text>
//                 <Text style={styles.time}>{date[3]}</Text>
//                 <Text style={styles.detailText}>Duration: {slot.duration} minutes</Text>
//                 {userRole == 'Student'
//                     ? <Text style={styles.detailText}>Tutor: {slot.tutorName}</Text>
//                     : <Text style={styles.detailText}>Student: {slot.studentName}</Text>
//                 }
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         flexDirection: 'row',
//         borderRadius: 16,
//         marginBottom: 12,
//         padding: 8,
//         height: 128,
//     },
//     leftContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         padding: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dateContainer: {
//         flex: 4,
//         backgroundColor: '#FFA500',
//         borderRadius: 10,
//         width: windowWidth * 0.2, // Adjust the width based on window width
//         height: windowWidth * 0.2,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dayContainer: {
//         flex: 1,
//         height: 'auto',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 4,
//     },
//     date: {
//         fontSize: windowWidth * 0.06,
//         // fontWeight: 'bold',
//     },
//     text: {
//         fontSize: windowWidth * 0.04,
//     },
//     button: {
//         fontSize: windowWidth * 0.04,
//         fontWeight: 'bold',
//         color: 'red'
//     },
//     time: {
//         fontSize: windowWidth * 0.04,
//         color: 'blue'
//     },
//     module: {
//         fontSize: windowWidth * 0.045,
//         fontWeight: 'bold',
//     },
//     rightContainer: {
//         flex: 3,
//         paddingLeft: 16,
//     },
//     detailText: {
//         fontSize: windowWidth * 0.035,
//     },
//     dayText: {
//         fontSize: windowWidth * 0.035,
//     },
// });