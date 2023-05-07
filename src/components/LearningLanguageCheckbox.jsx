import {firestore}  from "../firebase";
import { collection, addDoc,doc, setDoc, updateDoc } from "firebase/firestore"; 
import { auth } from "../firebase";




import { useState } from "react";

const LearningLanguageCheckbox = () => {
  const [languagesl, setLanguages] = useState({
    javascript: false,
    python: false,
    java: false,
    ruby: false,
    cplusplus: false,
    csharp: false,
    go: false,
    swift: false,
    kotlin: false,
    typescript: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLanguages({ ...languagesl, [name]: checked });
  
  
  
    const doc2 = doc(firestore, 'Users', auth.currentUser.uid );
  
     setDoc(doc2,{
      languagesl: { ...languagesl, [name]: checked }
    });
}

  return (
    <div  className="programmingCheckbox">
      <h2>Select the programming languagesl you want to learn:</h2>
      <label>
        <input
          type="checkbox"
          name="javascript"
          checked={languagesl.javascript}
          onChange={handleCheckboxChange}
        />
        JavaScript
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="python"
          checked={languagesl.python}
          onChange={handleCheckboxChange}
        />
        Python
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="java"
          checked={languagesl.java}
          onChange={handleCheckboxChange}
        />
        Java
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="ruby"
          checked={languagesl.ruby}
          onChange={handleCheckboxChange}
        />
        Ruby
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="cplusplus"
          checked={languagesl.cplusplus}
          onChange={handleCheckboxChange}
        />
        C++
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="csharp"
          checked={languagesl.csharp}
          onChange={handleCheckboxChange}
        />
        C#
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="go"
          checked={languagesl.go}
          onChange={handleCheckboxChange}
        />
        Go
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="swift"
          checked={languagesl.swift}
          onChange={handleCheckboxChange}
        />
        Swift
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="kotlin"
          checked={languagesl.kotlin}
          onChange={handleCheckboxChange}
        />
        Kotlin
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="typescript"
          checked={languagesl.typescript}
          onChange={handleCheckboxChange}
        />
        TypeScript
      </label>
    </div>
  );
};

export default LearningLanguageCheckbox;
