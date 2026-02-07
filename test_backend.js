// test_backend.js
import fetch from "node-fetch"; // make sure to run with Node 18+ or install node-fetch

const testPrediction = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender: "Male",
        Partner: "No",
        tenure: 12,
        MonthlyCharges: 70,
        Contract: "Month-to-Month",
        InternetService: "DSL",
        OnlineSecurity: "No",
        TechSupport: "No"
      }),
    });

    const data = await response.json();
    console.log("Backend response:", data);
  } catch (error) {
    console.error("Error calling backend:", error);
  }
};

testPrediction();
