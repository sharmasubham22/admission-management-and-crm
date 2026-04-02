# Admission Management and CRM

Hosted Project Link: [admission-management-crm.netlify.app](https://admission-management-crm.netlify.app/)

Backend Link: https://admission-management-and-crm-nu.vercel.app/

### Admin Login Credentials
Email: admin@test.com

Password: admin1234

### Admission Officer Login Credentials
Email: admissions@test.com

Password: admission1234

### Management Login Credentials 
Email: management@test.com

Password: view1234

## Setup Instruction
### Frontend
**Step 1:** Create a folder on the  desktop and open command line or terminal on the folder. On the terminal, run the following command to clone the repository:
'git clone https://github.com/sharmasubham22/admission-management-and-crm.git' 

**Step 2:** Once the repository is cloned, open the folder in visual studio code (or similar IDE). Once opened, go to the terminal in the IDE and run "npm install" to install all the necessary libraries and build the project.

**Step 3:** Once completed, now use the command "npm run dev" to start running the frontend part of the project.

### Backend
**Step 1:** Open the same project in visual studio or similar IDE and open new terminal (let the frontend running in another terminal). Once opened, change the directory to backend folder using the command "cd backend".

**Step 2:** Next, to build and install libraries, use the command "npm install".

**Step 3:** To start the backend part, use the command "npm run start". 

The project is ready to use now.

## Admin Panel
When admin logs in, they are redirected to admin-panel which lets the admin to manage the platform. The admin can create institutions, campuses, departments, programs, and quotas for the applicants to enroll. Admin can also keep a track os all the added applicants. They have access to a dashboard to check on additional details and check progress on seat allocation. 

Admins can also create different users in their team who they want to give access to and can specify their roles.

## Admission Officer Panel
When this type of user logs in, they land on admissions' home page. Here, they can see all the applicants added and check their details. They have access to add new applicants as well. Next, they can update multiple things, such as seat allocation, documents status, fee status and admission number generation on success.

This type of user do not have access to admin panel and cannot add institutions flow or users. 

## Management 
Management type of users have view-only access. Similar to admin-panel but they can not perform any actions or add anything. They can just view applicants, institutions, users, and the dashboard details.  