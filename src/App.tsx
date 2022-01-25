import './App.css';

import { useEffect, useState } from 'react';

import getProcessingPage from './getProcessingPage';
import { api } from './services/api';

interface ProcessingResult {
  title: string;
  message: string;
}
interface ProcessingPages {
  data: {
    state: string;
    errorCode: string | undefined | null;
  }[];
}

function App() {
  const [processingPages, setProcessingPages] = useState<ProcessingPages>(
    {} as ProcessingPages
  );
  const [processingResult, setProcessingResult] = useState<ProcessingResult>(
    {} as ProcessingResult
  );

  useEffect(() => {
    getData();
  }, []);

  async function getData(){
   await getProcessingData();
   const processingPageResult = await getProcessingResult() ?? processingResult;
   setProcessingResult(processingPageResult)
  }

  async function getProcessingData(){
    api
    .get("/data")
    .then((response) => setProcessingPages(response.data))
    .catch((error) => console.log(`Error API: ${error}`))
  }

  async function getProcessingResult(){
   return await getProcessingPage(processingPages?.data)
  }

  return (
    <div className="App">
      <p>Title: {processingResult.title}</p>
      <p>Message: {processingResult.message}</p>
    </div>
  );
}

export default App;
