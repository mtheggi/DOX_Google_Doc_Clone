# DOX_Google_Doc_Clone

## Overview
The Online Collaborative Text Editor is a real-time web application that allows multiple users to collaboratively edit a document simultaneously. It provides features similar to Google Docs, including user authentication, document management, and real-time updates.

## Features
### User Management
- **User Registration**: Users can create an account.
- **User Authentication**: Users can log in to their account securely using JWT (JSON Web Tokens).

### Document Management
- **File Management**: Users can create, open, rename, and delete files.
- **Access Control**: Users can share documents with others and set permissions (viewer or editor). Only authorized users can access the document based on their permissions.
- **List Documents**: Users can view a list of their documents and documents shared with them.

### Real-time Collaborative Editing
- **Concurrent Editing**: Supports multiple users editing the document simultaneously. Uses CRDTs (Conflict-free Replicated Data Types) to handle concurrency and conflicts.
- **Real-time Updates**: Users can see real-time updates of edits made by other users, including cursor movements.

### User Interface
- **Login**: Simple login interface.
- **Sign Up**: User registration interface.
- **File Management Interface**: Interface to list, create, delete, rename, and share documents.
- **Text Editor Interface**: Basic text editor with support for bold and italic formatting.

## Technology Stack
- **Backend**: Java, Spring Boot
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Collaboration**: Web Sockets, CRDTs (Conflict-free Replicated Data Types)
- **Frontend**: ReactJS

## Getting Started

### Prerequisites
- Java 11 or higher
- Node.js and npm
- PostgreSQL or any preferred database

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/AhmedYasser20/Online-Collaborative-Text-Editor.git
    cd Online-Collaborative-Text-Editor
    ```

2. **Backend Setup**
    - Navigate to the backend directory
    - Configure the database settings in `application.properties`
    - Build and run the Spring Boot application
    ```bash
    cd backend
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

3. **Frontend Setup**
    - Navigate to the frontend directory
    - Install dependencies and start the React development server
    ```bash
    cd frontend
    npm install
    npm start
    ```

### Running the Application
- The backend server should be running on `http://localhost:8080`
- The frontend development server should be running on `http://localhost:3000`

## Usage
1. **Register a new user** on the sign-up page.
2. **Log in** with the registered credentials.
3. **Create, open, rename, or delete documents** from the document management interface.
4. **Share documents** with other users and set their permissions.
5. **Edit documents** collaboratively in real-time.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


This README provides an overview of the project, features, technology stack, setup instructions, usage, contribution guidelines, license information, and contact details.
