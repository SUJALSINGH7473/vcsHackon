## Getting Started with Backend

### Step 1: Clone the Repository

Clone the project repository to your local machine using the following command:
```sh
git clone https://github.com/Tushar-022/vcsHackon/tree/master/backend.git
```

### Step 2: Navigate to the Project Directory

Change your directory to the backend project folder:
```sh
cd vcsHackon/backend
```

### Step 3: Set Up a Virtual Environment

Set up a virtual environment to isolate project dependencies from your global Python environment:
```sh
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### Step 4: Install the Required Dependencies

Install all the necessary dependencies listed in the `requirements.txt` file:
```sh
pip install -r requirements.txt
```

### Step 5: Configure Environment Variables

Create a `.env` file in the root of your project directory and add the following environment variables. Replace the placeholder values with your actual keys and region information:
```
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
ACCESS_KEY=YOUR_AWS_ACCESS_KEY
SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
REGION=AWS_REGION
PINECONE_API_KEY=YOUR_PINECONE_API_KEY
PINECONE_INDEX_NAME=YOUR_PINECONE_INDEX_NAME
```

### Step 6: Add Firebase Services JSON File

Ensure that the `vcs-hackon-firebase.json` file is placed in the root of your project directory. This file is required for Firebase services integration.

### Step 7: Run the Main Application

Start the development server by running:
```sh
python main.py
```
