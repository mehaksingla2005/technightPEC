# PDF Chatbot System

This project is a chatbot system that processes PDF files, allowing users to upload documents, automatically generate embeddings, suggest relevant questions, enable user queries, and provide citations. The system features an interactive frontend and is deployable in a cloud environment.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

## Features
- **Upload PDF Documents**: Users can upload documents for the system to process.
- **Embedding Generation**: Automatically generate embeddings from the uploaded documents for efficient query processing.
- **Question Suggestions**: The system suggests relevant questions based on the document content.
- **User Queries**: Users can ask questions about the documents, and the chatbot provides accurate responses.
- **Citations**: The chatbot offers citations for the information it provides.
- **Storage**: MongoDB is used to store user credentials, room details, and related questions and answers.
- **ChromaDB**: Handles query processing.

## Tech Stack
- **Frontend**: React.js, Tailwind CSs,Material UI
- **Backend**: Node.js, Express,Fast API,LangChain
- **Database**: MongoDB, ChromaDB


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mehaksingla2005/technightPEC
   cd Frontend
   npm install
   npm run dev


   cd Backend
   npm install
   node server.js


  
2. Usage
:-Upload a PDF document using the interface.
:-Wait for the system to generate embeddings.
:-Use the suggested questions or ask your own queries.
:-Get responses along with proper citations.

License
This project is licensed under the MIT License.

markdown
Copy code

### Instructions:
1. Replace the image paths (`./mnt/data/...`) with the correct relative paths if the files will be stored differently in your project.
2. Add your GitHub repository URL in the installation section.
3. Customize the `README.md` further if there are other aspects of the project you’d like to highlight!








