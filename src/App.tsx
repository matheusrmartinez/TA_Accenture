import "./App.css";

import { useEffect, useState } from "react";

import getProcessingPage from "./getProcessingPage";
import { api } from "./services/api";

interface ProcessingResult {
  title: string;
  message: string;
}
interface ProcessingPages {
    state: string;
    errorCode: string | undefined | null;
}

function App() {
  const [processingPages, setProcessingPages] = useState<ProcessingPages[]>([] as ProcessingPages[]);
  const [processingResult, setProcessingResult] = useState<ProcessingResult>(
    {} as ProcessingResult
  );

  useEffect(() => {
    api
    .get("/data")
    .then((response) => {
      setProcessingPages(response.data)
    })
    .catch((error) => console.log(`Error API: ${error}`))
  }, []);

  useEffect(() => {
    getProcessingResult();
  }, [processingPages])

  async function getProcessingResult(){
    const processData = await getProcessingPage(processingPages) ?? processingResult
    setProcessingResult(processData)
  }

  return (
    <div className="App">
      <p>Title: {processingResult.title}</p>
      <p>Message: {processingResult.message}</p>
    </div>
  );
}

export default App;
