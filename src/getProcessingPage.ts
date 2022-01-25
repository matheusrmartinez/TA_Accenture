export const NO_STOCK = "NO_STOCK";
export const INCORRECT_DETAILS = "INCORRECT_DETAILS";
export const PROCESSING = "processing";
export const ERROR = "error";
export const SUCCESS = "success";

interface ProcessingPageProps {
  state: string;
  errorCode: string | null | undefined;
}

interface ProcessingResult {
  title: string;
  message: string;
}

export default async function getProcessingPage(
  processingPagesData: ProcessingPageProps[]
) {

  if (!processingPagesData || processingPagesData.length === 0) return;

  let processingResults: ProcessingResult = {} as ProcessingResult;

 for await (let processingPageData of processingPagesData) {
    if (processingPageData.state === PROCESSING) {
     await timer();
    }

    if (processingPageData.state === ERROR) {
      let errorObject: ProcessingResult;
      errorObject = handleErrorMessage(processingPageData.errorCode);
      processingResults.title = errorObject.title;
      processingResults.message = errorObject.message;

      return processingResults;
    }

    if (processingPageData.state === SUCCESS) {
      processingResults.title = "Order complete";
      processingResults.message = "null"
    }

  };
  return processingResults
}
const timer = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

function handleErrorMessage(errorCode: string | null | undefined) {
  switch (errorCode) {
    case NO_STOCK:
      return {
        title: "Error page",
        message: "No stock has been found",
      };
    case INCORRECT_DETAILS:
      return {
        title: "Error page",
        message: "Incorrect details have been entered",
      };
    case null:
      return {
        title: "Error page",
        message: "null",
      };
    case undefined:
      return {
        title: "Error page",
        message: "null",
      };
    default:
      return {
        title: "",
        message: "",
      };
  }
}
