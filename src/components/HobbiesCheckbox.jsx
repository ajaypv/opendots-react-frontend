import { useState } from "react";
import { auth, firestore, database} from "../firebase";
import { getDatabase, ref, set,update  } from "firebase/database";

const HobbiesCheckbox = () => {
  const [hobbies, setHobbies] = useState({
    hiking: false,
    cooking: false,
    reading: false,
    gaming: false,
    painting: false,
    running: false,
    cycling: false,
    singing: false,
    dancing: false,
    writing: false,
    photography: false,
    knitting: false,
    woodworking: false,
    fishing: false,
    gardening: false,
    traveling: false,
    skiing: false,
    surfing: false,
    yoga: false,
    meditation: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setHobbies({ ...hobbies, [name]: checked });

    const selectedHobbies = Object.entries(hobbies)
      .filter(([key, value]) => value)
      .map(([key]) => key);

   
      update(ref(database, 'users/' + auth.currentUser.uid), {
      hobbies: selectedHobbies,
    });
  
  };

  return (
    <div className="programmingCheckbox">
      <h2>Select your hobbies:</h2>
      <label>
        <input
          type="checkbox"
          name="hiking"
          checked={hobbies.hiking}
          onChange={handleCheckboxChange}
        />
        Hiking
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="cooking"
          checked={hobbies.cooking}
          onChange={handleCheckboxChange}
        />
        Cooking
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="reading"
          checked={hobbies.reading}
          onChange={handleCheckboxChange}
        />
        Reading
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="gaming"
          checked={hobbies.gaming}
          onChange={handleCheckboxChange}
        />
        Gaming
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="painting"
          checked={hobbies.painting}
          onChange={handleCheckboxChange}
        />
        Painting
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="running"
          checked={hobbies.running}
          onChange={handleCheckboxChange}
        />
        Running
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="cycling"
          checked={hobbies.cycling}
          onChange={handleCheckboxChange}
        />
        Cycling
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="singing"
          checked={hobbies.singing}
          onChange={handleCheckboxChange}
        />
        Singing
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="dancing"
          checked={hobbies.dancing}
          onChange={handleCheckboxChange}
        />
        Dancing
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="writing"
          checked={hobbies.writing}
          onChange={handleCheckboxChange}
        />
        Writing
      </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="photography"
            checked={hobbies.photography}
            onChange={handleCheckboxChange}
        />
        Photography
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="knitting"
            checked={hobbies.knitting}
            onChange={handleCheckboxChange}
        />  
        Knitting
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="woodworking"
            checked={hobbies.woodworking}
            onChange={handleCheckboxChange}
        />
        Woodworking
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="fishing"
            checked={hobbies.fishing}
            onChange={handleCheckboxChange}
        />
        Fishing
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="gardening"
            checked={hobbies.gardening}
            onChange={handleCheckboxChange}
        />
        Gardening
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="traveling"
            checked={hobbies.traveling}
            onChange={handleCheckboxChange}
        />
        Traveling
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="skiing"
            checked={hobbies.skiing}
            onChange={handleCheckboxChange}
        />
        Skiing
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="surfing"
            checked={hobbies.surfing}
            onChange={handleCheckboxChange}
        />
        Surfing
        </label>
        <br />

        <label>
        <input
            type="checkbox"
            name="yoga"
            checked={hobbies.yoga}
            onChange={handleCheckboxChange}
        />
        Yoga
        </label>
        <br />
        <label>
        <input
            type="checkbox"
            name="meditation"
            checked={hobbies.meditation}
            onChange={handleCheckboxChange}
        />
        Meditation
        </label>
        <br />
    </div>
    );
};

export default HobbiesCheckbox;
