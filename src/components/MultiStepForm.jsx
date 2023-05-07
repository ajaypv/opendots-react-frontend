import { useState } from "react";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import { useMultistepForm } from "./useMultistepForm";
import { UserForm } from "./UserForm";
import { auth, firestore, database} from "../firebase";
import { getDatabase, ref, set ,update } from "firebase/database";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  age: "",
  collegeName: "",
  branchName: "",
  semester: "",
  section: "",
  langauage1: "",
  langauage2: "",
  langauage3: "",
  data: "",
};

function MultiStepForm() {
  const [data, setData] = useState(INITIAL_DATA);
  
  function updateFields(fields) {
    setData(prev => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();
    update(ref(database, 'users/' + auth.currentUser.uid), {
        userData: data
      });
  }

  return (
    <div
  
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "10rem 10rem 10rem 20rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth: "max-content",
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
}

export default MultiStepForm;
