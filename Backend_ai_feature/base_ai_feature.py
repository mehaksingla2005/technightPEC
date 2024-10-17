# Load environment variables and necessary imports
import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI, HarmBlockThreshold, HarmCategory
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

# Load environment variables from .env file
load_dotenv()
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# Initialize the LLM using Google Gemini API
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    },
)

# PDF document loading
loader = PyPDFLoader("./1706.03762v7.pdf")
document = loader.load()

# Split the PDF document into smaller chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
docs = text_splitter.split_documents(document)

# Initialize HuggingFace embeddings using a pre-trained model
model_name = "sentence-transformers/all-mpnet-base-v2"
model_kwargs = {'device': 'cpu'}  # Using CPU for inference
encode_kwargs = {'normalize_embeddings': False}
hf_embeddings = HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)

# Store documents and embeddings in Chroma for retrieval
db = Chroma.from_documents(docs, embedding=hf_embeddings)

# Create a ChatPromptTemplate for querying the LLM
prompt = ChatPromptTemplate.from_template("""
Answer the following question based only on the provided context. 
Think step by step before providing a detailed answer. 
I will tip you $1000 if the user finds the answer helpful. 
<context>
{context}
</context>
Question: {input}
""")

# Create a document chain to process and generate responses using LLM and prompt
doc_chain = create_stuff_documents_chain(llm, prompt)

# Set up the retriever to fetch relevant documents
retriever = db.as_retriever()

# Create the retrieval chain to handle questions and context-based retrieval
retrieval_chain = create_retrieval_chain(retriever, doc_chain)

# Run a query on the retrieval chain
response = retrieval_chain.invoke({"input": "Scaled Dot-Product Attention"})

# Output the answer from the model
print(response["answer"])
