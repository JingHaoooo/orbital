# NUSmentor README



## **Team Name:** 

IDK

## **Proposed Level of Achievement:** 

Apollo 11 

## **Motivation** 

University students are exposed to academic content and concepts which are harder to grasp compared to those taught in Junior Colleges or Polytechnics. As university students ourselves, we are no stranger to the difficulty of the university curriculum and academic stress that comes along with it. Admittedly, university students like us often face difficulties in our studies and desperately need the help of professors and Teaching Assistants (TA).

Professors and TAs often volunteer their time for consultations. In these sessions, they aim to clarify students’ doubts and concerns. Unfortunately, students face problems when attempting to book a consultation with the teaching team. These problems include, but are not limited to: 

- Students **may not have the contact information** of the teaching team. For example, some TAs are students themselves and are not listed on the faculty’s web page or in Canvas. Moreover, certain modules are not listed in Canvas and have their own web pages (CS2040S uses Coursemology instead of Canvas). 

  - This means that students are unable to book a consultation in time, even if the tutor is available for consultation. 

- The teaching team may **use different platforms** to keep track of consultations. For example, some prefer using email while others prefer Excel sheets or messaging platforms to keep track of consultations. 

  - As a result, it is difficult for students to keep track of which platform to use when booking a consultation. 
  - Moreover, spreadsheets could easily be edited by others (See Annex A), while consultation bookings via emails are hard to keep track of. 

- The **consultation schedule of every tutor varies greatly** across the teaching team. 

  - This means that it is difficult for students to keep track of the availability of their TA and professors. 
  - Also, some tutors/ students may need to cancel their consultations due to urgent matters, or tutors could add consultation slots as they are now free. 

- Students and professors/ TAs may **forget about the planned consultation** due to busy schedules. The lack of reminders and overviews of consultation schedules could be contributing factors. 

## **Aim** 

We hope to facilitate the booking of consultation slots for professors, teaching assistants (TA) and students on our mobile application. 

## **Vision** 

Our mobile application, called NUSmentor, will be used to facilitate the booking of consultation slots between students and tutors. Given that mobile applications bring greater convenience to users and do not need an active internet connection to run, we decided that a mobile application will better suit our needs compared to a website.

We hope that NUSmentor will reduce the time spent on scheduling and booking consultation slots, so that students and tutors alike could better spend their precious time elsewhere. 

Specific features of the mobile application will be elaborated in the following sections. 

We envision NUSmentor to be a mobile application that is widely used by students and the teaching team in NUS throughout the academic year (similar to the Canvas mobile application) for the booking of consultation slots. If NUSmentor proves to be useful, we hope that it will be implemented in universities and schools islandwide as well, not just in NUS (though it will require a change in name).

## **User Stories**

1\. As a student who has questions and problems with a module, I want to book a consultation slot with my professors or Teaching Assistants. 

2\. As a student, I wish to see the consultation slots released by my professors or teaching assistants. 

3\. As a student who has booked consultation slots with my professors or TA, I will need reminders nearer to the consultation slot so that I do not forget about the consultation. 

4\. As a student, if I have urgent matters to attend to, I can cancel/ reschedule my existing consultation slot.

5\. As a student, once the consultation slots have been confirmed, I do not want other students to “steal” my consultation slot. 

6\. As a student booking a consultation slot, I wish to add a comment by typing a short description of the areas I need help in, so that the professors or teaching assistants could better prepare the consultation for me.

7\. As a user of the application, I wish to see an overview of my consultation schedule easily. 

8\. As a professor or TA, I can choose to receive bookings from NUS students in my classes only. I do not want to receive booking consultations from students in other modules or from the public. 

9\. As a professor or TA, I wish to see my consultation history with the students. This consultation log could be submitted for claims from the school. 

****
## **Features** 

There are 3 groups of people who will be using our mobile application: 

1. Students - who may be taking modules
2. TAs/ Professors - who may be teaching modules
3. TAs who are also students themselves - who may be taking and teaching modules
   
### **To be implemented in future, before Splashdown:**
#### Reminders
This feature will remind students and tutors of their consultations, perhaps a few days in advance, so that users of this application, comprising students and tutors, will not forget about their consultations. 
These reminders will be sent to the users’ mobile phones through push notifications. Users will be able to receive them as long as the correct settings are applied, and the permissions are appropriately given. 

### **Implemented:**
#### Authentication (with Firebase Authentication Services)

Currently, we would require users to create an account in the mobile application. Users will need to sign up with a NUS email address (ending with @u.nus.edu for students, or ending with nus.edu.sg for staff) and a password with more than 8 characters. Thereafter, they will be able to log in and log out as well. 

This feature is important as we do not want non-NUS students and tutors to use the application. We also want each consultation booking to be tagged to a specific tutor and student. By logging in, the student’s and tutor’s respective IDs will be tagged to the bookings they make, and they would be able to see their consultation bookings and history as well.

We have yet to implement the verification of the NUS emails provided. This verification of the NUS email provided will be done with Firebase Authentication services, and entails sending users a confirmation email to verify their registered email address. Currently, we do not have a paid Firebase subscription and are [limited to the daily limits](https://firebase.google.com/docs/auth/limits). We will, if possible, implement the verification of NUS emails after MS3.

To improve the user experience, we plan to [persist the authentication state](https://firebase.google.com/docs/auth/web/auth-state-persistence) using AsyncStorage provided by React Native. This will also be done before Splashdown. 

<p align="center">
  
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/LoginScreen_1.png" width="150">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/SignupScreen_1.png" width="150">
</p>

<p align="center">
  Caption: NUSmentor Login Screen and Signup Screen

  
</p>

#### Enter/ Update Details
Users of the application will be asked to input their display name, a list of modules that they take and a list of modules they teach when they download and sign up for an account in the mobile application. 

Users are able to choose from a list of current NUS modules retrieved from NUSmods API. The module codes and the respective module titles are prominently displayed. 

A display name is needed so that users of the application will be able to identify their students and/ or tutors. There can be multiple users with the same display name, as these display names are not unique identifiers for the users. Each user will be assigned a unique identifier by Firebase. 

Every user will have to provide a list of modules they are taking or teaching before they can book a consultation slot. We are not able to retrieve from NUS the list of modules taken by each user, or their student/ staff ID, or name, because this information is confidential. However, if NUS were to adopt this application, they could retrieve this list of modules automatically from their database, and users will no longer need to input the list of modules taken by them. 

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/EnterDetails_1.png" width="150">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/EnterDetails_2.png" width="150">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/EnterDetails_3.png" width="150">
</p>
<p align="center">
  Caption: NUSmentor Enter Details Screen, where users could enter their display names, and choose from a list of modules offered by NUS.
</p>

#### Overview
This feature is available to all groups of users. It allows them to have a view of the upcoming consultations in chronological order, and includes details such as module code, date, time and tutor/ student involved. Each consultation slot is also colour coded depending on the user’s role in the consultation. 

This is implemented in the home page of the mobile application so that users could easily see their upcoming consultations without having to navigate between pages. It includes all consultation slots that are booked by the user (the user is a student of a module) and the consultation slots that are booked with the user (the user is a tutor/ TA of a module), and these slots are arranged in chronological order for better visibility. Consultation slots that are not booked, as well as consultation slots that are already over, will not be shown in this overview. 

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/HomeScreen_1.png" width="150">
</p>
<p align="center">
  Caption: The user will be shown the Home Screen with an overview once he logs in. 
</p>

#### Booking List
Users are able to see their booking list, which consists of a list of modules they have booked as students, or are booked by students. 

Users are also able to edit their booking list. For example, if they are not able to make it for a consultation, they could cancel their bookings. 

If the user is a student who cancels his consultation slot, the consultation slot will be released to the list of available consultation slots for other students to book.

If the user is a tutor who cancels his consultation slot for that module, the consultation slot will be removed from the student’s list of booked slots, as well as the tutor’s list of upcoming bookings. This means that other students are not able to book the same consultation slot. 

We will be working on the push notifications as an additional feature if possible, so that users will be informed if their consultation slots are cancelled/ removed. 

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/BookingList_1.png" width="150">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/BookingList_2.png" width="150">
</p>

<p align="center">
  Caption: The list of booked slots is displayed prominently when the user navigates to this screen. The user is also able to cancel the slot from this screen. 
</p>

#### Set Availability - Release new consultation slots
This feature is only available to TAs/ Professors of the specified module. This may also include TAs who are also students for other modules themselves. 

It allows them to create new available consultation slots for a specific module by giving module code, date, time and duration of the consultation slot, as input. 

Tutors will only be able to release consultation slots for the modules they teach. 

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/Tutor_SetAvailability_1.png" width="150">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/Tutor_SetAvailability_2.png" width="150">
</p>

<p align="center">
  Caption: Tutors can select their available time slots and release consultation slots from this screen. 
</p>

#### Book new consultation slots 
This feature is only available to students of the specified module. It allows students to book new consultation slots with their module’s tutors based on the teaching team’s released slots. 

To book a new consultation slot, students will first navigate to the specified module. Thereafter, students will click on one of the consultation slots released by the tutor to book the consultation slots. Once the consultation slot is booked, it will disappear from the list of available consultation slots, and other students will not be able to book the same consultation slot. This prevents clashes among students themselves, and other students will not be able to edit your booked consultation slots. 

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/Student_BookSlot__1.png" width="150">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/Student_BookSlot__2.png" width="150">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/Student_BookSlot__3.png" width="150">
</p>

<p align="center">
  Caption: Students can view and book consultation slots released by tutors in this screen. 
</p>

#### See released slots
Tutors are able to see the list of consultation slots they have released, regardless of whether the slots have been booked. 

This page is only applicable to TAs or professors. 
 <p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/Tutor_ReleasedSlots_1.png" width="150">
</p>
<p align="center">
  Caption: Tutors can see all their released slots (and remove the slots if needed) in this screen. 
</p>

#### See history
This feature is available to all groups of users. It allows users to view their consultation history, which includes the details of the tutor, student, module, date and time of the consultation booking that has passed.  

If the consultation slot released by a tutor was not booked by any student, it will not be shown in this ‘See history’ component. 

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/History_1.png" width="150">
</p>
<p align="center">
  Caption: Users can see all their booked slots in this screen. 
</p>

## **Flowchart**
<img src="https://github.com/chewjh1234/orbital/blob/main/assets/NUSmentorFlowchart.png">

## **UML Diagrams**
### Use Case Diagram
There are different user roles which will limit the user’s ability to access certain features. For example, tutors can release slots for a module they teach, but they cannot book slots for that same module. On the other hand, students can book slots for the modules they take, but they cannot release consultation slots for these modules. Both users, however, could cancel slots that have been booked. 

The following Use Case Diagram depicts the various user roles:
<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/UML_1.png" width="550">
</p>
<p align="center">
  Caption: Use Case Diagram for NUSmentor  
</p>

### Sequence Diagrams
Sequence diagrams are a generic UML tool used to model and visualise the dynamic behaviour of a system, focusing on the interactions between different components (in the context of React Native) or objects over time.

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/UML_2.png" width="550">
</p>
<p align="center">
  Caption: Sequence Diagram for NUSmentor when a user attempts to search for a module he takes under the Enter Details screen and saves it:
</p>

<p align="center">
  <img src="https://github.com/chewjh1234/orbital/blob/main/assets/UML_3.png" width="550">
</p>
<p align="center">
  Caption: Sequence Diagram for NUSmentor when a student attempts to search for an available consultation slot for a module he takes:
</p>

## Tech Stack
### React Native
React Native offers a cross-platform development framework that allows us to build the mobile application for both Android and iOS using a single codebase. This means that we do not need to learn to be an Android and an iOS developer separately. This significantly reduces development time and effort as compared to developing separate native applications for each platform. 
React Native also provides pre-built components and libraries, and flexboxes allow us to create a visually appealing and interactive user interface.


### Git
Git was selected for version control because it is a widely-used distributed version control system. It allows us to track changes to our codebase over time, making it easy to revert to previous versions (each version is tagged with a unique identifier), collaborate with team members (although we work in pairs, it does help us collaborate better too), and manage code changes efficiently. With Git, we can work on new features or bug fixes in separate branches and then merge them back into the main branch only when ready.

### GitHub
GitHub was chosen as the platform to host our Git repositories because it provides us with a user-friendly interface and useful collaborative features. It allows us to centralise our codebase, making it accessible to our team members for collaboration and code reviews, which is even more useful if we work in bigger teams. GitHub also enables us to manage issues and track project progress efficiently. Our advisor would also be able to look at our code through GitHub. 

### Firebase 
#### Firebase Authentication
Firebase Authentication provides a simple and secure way to implement user sign-up, login, and account management. Users could create accounts and log in securely through their NUS email and password. It is also possible for users to use other authentication methods (but we did not implement these methods). 

#### Cloud Firestore and Realtime Database
Both Firebase Realtime database and Cloud Firestore are NoSQL databases (unfortunately, they are not relational databases that we learnt in Mission Control 1 and 2). 
The Realtime database synchronises data across all connected devices in real-time, such that users can see updates to data instantly, thereby ensuring that consultation bookings and slot availability status are always up to date. 
We also used Firestore when dealing with user profiles as it has great querying capabilities, especially when we need to retrieve the modules taken/ taught by the student.


### Others
#### Javascript
JavaScript is the programming language used in React Native for handling the application's logic and behaviour. It is a widely-used and versatile language that works seamlessly with React Native.

#### Code editor - Visual Studio Code (VSCode)
VS Code is a popular code editor that has an extensive set of features. VS Code offers excellent support for JavaScript and React Native development, including syntax highlighting, code completion etc. which we need for our project. 



