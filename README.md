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

2\. As a student, I wish to see the availability and contact information of my professors or teaching assistants. 

3\. As a student who has booked consultation slots with my professors or TA, I will need reminders nearer to the consultation slot so that I do not forget about the consultation. 

4\. As a student, if I have urgent matters to attend to, I can cancel/ reschedule my existing consultation slot.

5\. As a student, once the consultation slots have been confirmed, I do not want other students to “steal” my consultation slot. 

6\. As a student booking a consultation slot, I wish to add a comment by typing a short description of the areas I need help in, so that the professors or teaching assistants could better prepare the consultation for me.

7\. As a user of the application, I wish to have the autonomy to choose which information should be displayed publicly. For example, as a TA, I may not want students to know my telegram handle or email address. 

8\. As a user of the application, I wish to see an overview of my consultation schedule easily. 

9\. As a professor or TA, I can choose to receive bookings from NUS students in my classes only. I do not want to receive booking consultations from students in other modules or from the public. 

10\. As a professor or TA, I wish to see my consultation history with the students. This consultation log could be submitted for claims from the school. 

11\. As an administrator who wants to prevent abuse of the system, I want to be able to identify abusers, warn them and ban them if they continue to cause problems.

****

## **Features** 

There are 3 groups of people who will be using our mobile application: 

1. Students - who may be taking modules
2. TAs/ Professors - who may be teaching modules
3. TAs who are also students themselves - who may be taking and teaching modules
   
### **To be implemented in future**
#### Reminders
This feature will remind students and tutors of their consultations, perhaps a few days in advance, so that users of this application, comprising students and tutors, will not forget about their consultations. 
These reminders will be sent to the users’ mobile phones through push notifications. Users will be able to receive them as long as the correct settings are applied, and the permissions are appropriately given. 

### **Partially implemented**
#### Authentication (with Firebase Authentication Services)
Similar to how NUS students and staff log in to Canvas using their NUSNET account, we hope that the same could be implemented in our mobile application. 

Currently, we would require users to create an account in the mobile application. Users will need to sign up with a NUS email address (ending with @u.nus.edu) and a password with more than 8 characters. Thereafter, they will be able to log in and log out as well. 

This feature is important as we do not want non-NUS students and tutors to use the application. We also want each consultation booking to be tagged to a specific tutor and student. By logging in, the student’s and tutor’s respective IDs will be tagged to the bookings they make, and they would be able to see their consultation bookings and history as well.

To be done before Milestone 3: 
We have yet to implement the verification of the NUS emails provided. This verification of the NUS email provided will be done with Firebase Authentication services, and entails sending users a confirmation email to verify their registered email address. 

Currently, users could enter any email address to register for an account. This is to facilitate testing and debugging for now. 

To improve the user experience, we plan to [persist the authentication state](https://firebase.google.com/docs/auth/web/auth-state-persistence) using AsyncStorage provided by React Native. This will also be done before Milestone 3. 

#### Set Availability
This feature is only available to TAs/ Professors of the specified module. This may also include TAs who are also students for other modules themselves. It allows them to create new available consultation slots for a specific module by giving module code, date, time and duration of the consultation slot, as input. 

To be done before Milestone 3: 
Currently, anyone could be releasing consultation slots for a module. We are working to limit this ability to those who are TAs/ tutors of that module only. We are also working to prevent the overlapping of slots by the same TA/ tutor. 


### **Implemented**
#### Overview
Overview
This feature is available to all groups of users. It allows them to have a view of the upcoming consultations in chronological order, and includes details such as module code, date, time and tutor/ student involved. 

This is implemented in the home page of the mobile application so that users could easily see their upcoming consultations without having to navigate between pages. It includes all consultation slots that are booked by the user (the user is a student of a module) and the consultation slots that are booked with the user (the user is a tutor/ TA of a module), and these slots are arranged in chronological order for better visibility. Consultation slots that are not booked, as well as consultation slots that are already over, will not be shown in this overview. 

Users are able to edit their booking list. For example, if they are not able to make it for a consultation, they could cancel their bookings. 
If the user is a student who cancels his consultation slot, the consultation slot will be released to the list of available consultation slots for other students to book.
If the user is a tutor who cancels his consultation slot for that module, the consultation slot will be removed from the student’s list of booked slots, as well as the tutor’s list of upcoming bookings. This means that other students are not able to book the same consultation slot. 

We are working on the push notifications, so that users will be informed if their consultation slots are cancelled/ removed. 

#### Booking of new consultation slots
This feature is only available to students of the specified module. It allows students to book new consultation slots with their module’s tutors based on the teaching team’s released slots. 

To book a new consultation slot, students will first navigate to the specified module. Thereafter, students will click on one of the consultation slots released by the tutor to book the consultation slots. Once the consultation slot is booked, it will disappear from the list of available consultation slots, and other students will not be able to book the same consultation slot. This prevents clashes among students themselves, and other students will not be able to edit your booked consultation slots. 

#### See history
This feature is available to all groups of users. It allows users to view their consultation history, which includes the details of the tutor, student, module, date and time of the consultation booking that has passed.  

If the consultation slot released by a tutor was not booked by any student, it will not be shown in this ‘See history’ component. 

This feature is only available to students. It allows students to see their teaching teams and also allows students to book a new consultation slot with their module’s tutors based on availability. Users will be able to access the availability of their tutors by clicking on their respective names in the selected module. 
