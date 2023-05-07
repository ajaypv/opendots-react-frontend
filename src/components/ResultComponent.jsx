import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, firestore, database} from "../firebase";
import { getDatabase, ref, set,update ,get,onValue } from "firebase/database";

function ResultComponent() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'users/' + auth.currentUser.uid);
    onValue(usersRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.hobbies) {
       console.log("hobbies",userData.hobbies)
       // convert into string 
         const hobbies = userData.hobbies.toString();
            console.log("hobbies",hobbies)
            axios.get(`http://localhost:8000/recommend_friends?name=${auth.currentUser.uid}&interests=${hobbies}`)
            .then(response => {
                console.log(response.data);
                setResult(response.data);
                
              
            })
            .catch(error => {
              console.log(error);
            });
      }
    });
  }, []);



  return (
    <div className="resulte" >
     
      <h3>open dots Recommended Friend for you </h3>
        <h1>{result}</h1>

     
    </div>
  );
}

export default ResultComponent;
