from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_google_genai import ChatGoogleGenerativeAI, HarmBlockThreshold, HarmCategory
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter # type: ignore
import os
from dotenv import load_dotenv
import tempfile
# Initialize FastAPI app
app = FastAPI()

# Load environment variables
load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")

# HuggingFace embeddings setup
hf_embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2", 
    model_kwargs={'device': 'cpu'}, 
    encode_kwargs={'normalize_embeddings': False}
)

# LLM setup
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    }
)

# Storage for document embeddings (you can use more sophisticated solutions like MongoDB)
db = {}

# Endpoint to upload PDF
@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    # Load the PDF and split into chunks
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(file.file.read())  # Write the uploaded file to the temporary file
            temp_file.flush()  # Ensure all data is written
        loader = PyPDFLoader(temp_file.name)
        document = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        docs = text_splitter.split_documents(document)
        
        # Create embeddings and store in Chroma
        chroma_db = Chroma.from_documents(docs, embedding=hf_embeddings)
        room_id = len(db)  # unique ID for each PDF room
        db[room_id] = chroma_db  # Store Chroma instance in DB
        return {"message": "PDF uploaded and processed", "room_id": room_id}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Model for query input
class QueryInput(BaseModel):
    room_id: int
    query: str

# Endpoint to handle user query
@app.post("/query/")
async def query_pdf(query_input: QueryInput):
    room_id = query_input.room_id
    query = query_input.query
    
    if room_id not in db:
        return JSONResponse(status_code=404, content={"message": "Room not found"})
    
    # Fetch relevant Chroma DB
    chroma_db = db[room_id]
    retriever = chroma_db.as_retriever()

    # Create prompt template
    prompt = ChatPromptTemplate.from_template("""
    Answer the following question based only on the provided context. 
    <context>
    {context}
    </context>
    Question: {input}
    """)
    
    doc_chain = create_stuff_documents_chain(llm, prompt)
    retrieval_chain = create_retrieval_chain(retriever, doc_chain)
    
    # Get response from the LLM
    response = retrieval_chain.invoke({"input": query})
    
    return {"answer": response["answer"]}

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
