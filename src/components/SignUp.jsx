import { useState,useRef ,useEffect} from 'react'
import '../styles/SignUp.css';
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Web3 from "web3";
import axios from 'axios';
import { getAuth, signInWithCustomToken,onAuthStateChanged } from "firebase/auth";

function SignUp() {

  const [data, setdata] = useState({
    address: "",
    access: "",
  });

  const emailRef = useRef()
  const passwordRef = useRef()
  const { signup} = useAuth()
  
  const { googleSignIn} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()


  const eyes1Ref = useRef(null);
  const eyes2Ref = useRef(null);


  useEffect(() => {

    
    const stars = document.getElementById('stars');
const starsCtx = stars.getContext('2d');
// const slider = document.querySelector(".slider input");
// const output = document.querySelector("#speed");

// global variables
let screen, starsElements, starsParams = { speed: 15, number: 300, extinction: 4 };

// run stars
setupStars();
updateStars();

// handle slider


starsParams.speed = 5;

// update stars on resize to keep them centered
window.onresize = function() {
setupStars();
};

// star constructor
function Star() {
this.x = Math.random() * stars.width;
this.y = Math.random() * stars.height;
this.z = Math.random() * stars.width;

this.move = function() {
    this.z -= starsParams.speed;
    if (this.z <= 0) {
        this.z = stars.width;
    }
};

this.show = function() {
    let x, y, rad, opacity;
    x = (this.x - screen.c[0]) * (stars.width / this.z);
    x = x + screen.c[0];
    y = (this.y - screen.c[1]) * (stars.width / this.z);
    y = y + screen.c[1];
    rad = stars.width / this.z;
    opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

    starsCtx.beginPath();
    starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    starsCtx.arc(x, y, rad, 0, Math.PI * 2);
    starsCtx.fill();
}
}

// setup <canvas>, create all the starts
function setupStars() {
screen = {
    w: window.innerWidth,
    h: window.innerHeight,
    c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
};
window.cancelAnimationFrame(updateStars);
stars.width = screen.w;
stars.height = screen.h;
starsElements = [];
for (let i = 0; i < starsParams.number; i++) {
    starsElements[i] = new Star();
}
}

// redraw the frame
function updateStars() {
starsCtx.fillStyle = "black";
starsCtx.fillRect(0, 0, stars.width, stars.height);
starsElements.forEach(function (s) {
    s.show();
    s.move();
});
window.requestAnimationFrame(updateStars);
}
})

  useEffect(() => {
    function handleMouseMove(event) {
      const x = (event.clientX * 100) / window.innerWidth + "%";
      const y = (event.clientY * 100) / window.innerHeight + "%";

      eyes1Ref.current.style.left = x;
      eyes1Ref.current.style.top = y;
      eyes1Ref.current.style.transform = `translate(-${x}, -${y})`;

      eyes2Ref.current.style.left = x;
      eyes2Ref.current.style.top = y;
      eyes2Ref.current.style.transform = `translate(-${x}, -${y})`;
    }

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  

  async function  handleSubmit(e){
    e.preventDefault()
    try {
       
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        history.push("/")
       
      } catch {
        setError("Failed to create an account")
        console.log("Failed to create an account")
      }
  
      setLoading(false)

  }

  const accountChangeHandler = (account) => {
    console.log("Account changed",account)
    setdata({
      address: account,
    });
    onConnect();
  };

  const getProvider = () => {
    if (window.ethereum) {
      console.log("found window.ethereum>>");
      return window.ethereum;
    } else {
      const ethereum = createMetaMaskProvider();
      return ethereum;
    }
  };

  const detectCurrentProvider = () => {
    let provider;
    if (getProvider()) {
      provider = getProvider();
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

const onConnect = async () => {
  
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];

       
        let balance = await web3.eth.getBalance(account);
        let ethBalance = web3.utils.fromWei(balance, "ether");
        
        //signature varification
        var signature = await web3.eth.personal.sign("Access Check", account);
        try {
          const url = `http://localhost:3030/secret?signature=${signature}`;
           const response = await axios.get(url);
           console.log(response.data)
           const auth = getAuth();
          signInWithCustomToken(auth, response["data"]["Customtoken"])
            .then((userCredential) => {
              const user = userCredential.user.uid;
              console.log(user)
            })
            .catch((error) => {
            });
           
            if (response["data"]["access"]) {
              history.push("/")
             
              
              }
           if(!response["data"]["access"]) {
            setTimeout(() => {
              
            }, 3000);
          }
        } catch (err) {
         
          console.log(err);
        }
      }
   
  };

  async function metamusk(){
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  }

  async function googlelog(){
    console.log("google")
    try {
       
        setError("")
        setLoading(true)
        await googleSignIn();
        history.push("/")
       
      } catch {
        setError("Failed to create an account")
        console.log("Failed to create an account")
      }
  
      setLoading(false)

  }

 
  

  return (
    <div className="App">
        <canvas id="stars"></canvas>
       
     <div className="wrapper">
         
    <main>
    
      <section>
        <div className="face">
          <img src="https://assets.codepen.io/9277864/PF.png" alt="Face" widht="250" height="250" />
          <div className="eye-cover1">
            <div ref={eyes1Ref} id="eyes1"></div>
          </div>

          <div className="eye-cover2">
            <div ref={eyes2Ref} id="eyes2"></div>
          </div>
        </div>
        <div className="login-container">
          <div className="social-login">
            <div className="logo">
              <img src="https://assets.codepen.io/9277864/robot-face-3.svg" alt="Gravam Company Logo" width="100" height="100" />
              <p>OPEN DOTS</p>
            </div>
            <p>Continue with social media to get quick access</p>
            <div className="social-grp">
              <div className="btn"><div className="ac" onClick={metamusk}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" alt="" width="32" height="32" /><span>MetaMask</span></div ></div>
              <div className="btn"><div className="ac" ><img src="https://assets.codepen.io/9277864/social-media-facebook.svg" alt="" width="32" height="32" /><span>Facebook</span></div ></div>
              <div className="btn" ><div  className="ac"onClick={googlelog}><img src="https://assets.codepen.io/9277864/social-media-google.svg" alt="" width="32" height="32" /><span>Google</span></div ></div>
            </div>
          </div>
          <div className="email-login">
            <div className="login-h-container">
              <h1>Login to your account</h1>
              <p>Don’t have an account? <a href="#">Sign up Free!</a></p>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                <input id="email" name="email" type="email" ref={emailRef} placeholder="" autoComplete="off"onChange={(e) => setEmail(e.target.value)}/>
                 <span className={email ? "focus-span" : ""}
      >Email</span>
              </label>
              <label htmlFor="password">
                <input id="password" ref={passwordRef} name="password" type="password" placeholder=""onChange={(e) => setPassword(e.target.value)}/>
                <span id="span-password"
        className={password ? "focus-span" : ""}
      >Password
      </span>
              </label>
              <div className="recovery">
                <div>
                  <input type="checkbox" id="remember" name="remember"/>
                  <label className="remember" htmlFor="remember">Remember me</label>
                </div>
                <a href="">Forgot Password?</a>
              </div>
              <input type="submit"  value="Login with Email"/>
            </form>
          </div>
        </div>
      </section>
      <div className="vector-1"></div>
      <div className="vector-2"></div>
      <div className="vector-3"></div>
    </main>
  </div>
    </div>
  )
}

export default SignUp
