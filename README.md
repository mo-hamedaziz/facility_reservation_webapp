# Facility Reservation Platform

## Abstract

The Facility Reservation Platform serves as a solution tailored to the needs of INSAT's student community, aiming to streamline the process of booking classrooms for various events and workshops organized by student clubs. Developed as part of our Professional Personal Project (PPP) during our third year at INSAT, this platform enhances the efficiency and user-friendliness of reservation management, ultimately contributing to the betterment of student life within the institution.

## 🌟 Introduction

The Facility Reservation Platform is a web application developed to address specific needs within INSAT's student community. Its primary objectives are:

- Enable club presidents to efficiently book classrooms for their events and workshops.
- Provide a real-time availability calendar to prevent booking conflicts.
- Streamline the reservation process for enhanced efficiency and user-friendliness.
- Implement administrative features for managing and approving reservations.
- Ultimately contribute to the improved management of student life at INSAT.

![Home Page](https://raw.githubusercontent.com/mo-hamedaziz/facility_reservation_webapp/main/images/homepage.png)

## 🚀 Technology Stack

The Facility Reservation Platform was built using the following technologies:

- **MERN Stack:** MongoDB, Express.js, React.js, Node.js
- **NGINX:** Used as a reverse proxy server to handle client requests and distribute them to the appropriate backend services.
- **Docker:** Utilized for containerization to ensure consistency across different environments and simplify deployment processes.

## ✨ Features

### Admin
- **Admin Panel Access:** Admins can access a dedicated panel upon login.
- **Modify Club Presidents' Accounts:** Admins can edit club presidents' account details.
- **Manage Signup Requests:** View, approve, or deny signup requests.
- **Registered Club Presidents:** View a complete list of all registered club presidents.
- **Manage Reservation Requests:** Check the status of all reservation requests, approve or deny them with optional comments.
- **Reservation Calendar:** View a calendar of all reservations.
- **Account Management:** Admins can modify or delete their own accounts.
- **Generate PDF:** Generate PDF documents from signup requests.

### Club President
- **Registration:** Club presidents can register via a signup form.
- **Approval Email:** Receive an approval email with a generated unique password.
- **Login:** Login with an institutional email and pre-set password.
- **Account Management:** Edit or delete their own account details.
- **Reservation Requests:** Create, view, modify, or delete reservation requests.
- **Reservation Status:** View the status of all their reservation requests.
- **Reservation Calendar:** Access the reservation calendar to view bookings.

## 🛠️ Installation Guide

### Prerequisites
- Node.js (v14 or above)
- npm (v6 or above)
- Docker

### Steps
1. **Clone the Repository**
    ```bash
    git clone https://github.com/mo-hamedaziz/facility-reservation-platform.git
    cd facility-reservation-platform
    ```

2. **Backend Setup**
    - Navigate to the backend directory:
      ```bash
      cd server
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Set up environment variables:
      Create a `.env` file in the backend directory and add the necessary environment variables.
    - Start the backend server:
      ```bash
      npm run dev
      ```

3. **Frontend Setup**
    - Navigate to the frontend directory:
      ```bash
      cd ../client
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Set up environment variables:
      Create a `.env` file in the frontend directory and add the necessary environment variables.
    - Start the frontend server:
      ```bash
      npm run dev
      ```

4. **Docker Setup (Optional)**
    - Ensure Docker is installed and running on your machine.
    - Navigate to the root directory of the project and build the Docker images:
      ```bash
      docker-compose up --build
      ```

## 👨‍💻 Contributors
- [Bchini Mohamed Aziz](https://github.com/bchinimohamedaziz)
- [Ferjani Oussama](https://github.com/ferjanioussama)
- [Merji Louay](https://github.com/merjilouay)
- [Zghal Ines](https://github.com/zghalines)

## 🙏 Acknowledgments

Special thanks to the INSAT DVURE department (Direction de la Vie Universitaire et des Relations avec l'Environnement) for providing the opportunity to develop this platform and contribute to the enhancement of student life at INSAT.

We would also like to express our gratitude to Mr. Mohamed Ali Zormati for his invaluable help and supervision during the development process.

## 📧 Contact
For any inquiries, please contact [mohamedaziz.bchini@insat.ucar.tn].
