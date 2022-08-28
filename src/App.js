import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { StorageProvider } from '@arcana/storage/dist/standalone/storage.umd';
import app from "./firebase";
import { getFirestore } from "firebase/firestore";
import { collection,getDoc,doc,setDoc } from "firebase/firestore"; 


const db = getFirestore(app);


function App() {
  const[choice,setChoice] = useState("");
  const[pro,setP] = useState("");
  const[file,setF] = useState("");
  const[pName,setName] = useState("");
  const[pId,setId] = useState("");
  const[name,setPName] = useState("");
  const[a,setAccess] = useState("");
  
  const[cName,setCName] = useState("");
  const[cId,setCId] = useState("");

  async function addData(did){
    console.log(window.ethereum.selectedAddress);
    const Ref = collection(db, "users");
    await setDoc(doc(Ref, window.ethereum.selectedAddress), {
      dids: did });
    
  }
  async function getData(name){
    const docRef = doc(db, "Research", name);
    console.log(docRef)
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() 
    console.log(data);
    setAccess(data.wallet_Add);
  }
  return (
    <div className="App">
      
      <header className="App-header">
      <button onClick={async()=>{setP("login")}}>Connect</button>
      {
        pro === "register" ? <div>
        <h1>Register Yourself !!! Who are you ?</h1>
        
        <button onClick={()=>{setChoice("patient")}}>Patient</button>
        <button onClick={()=>{setChoice("res")}}>Research Company</button>
        {
          choice === "patient" ? <div><h2>Welcome New Patient</h2><form><input type="text" name="pId" onChange={(e)=>{setId(e.target.value)}} placeholder="Registration Id"></input><input type="text" onChange={(e)=>{console.log(e.target.value);setName(e.target.value)}} placeholder="Patient Name"></input> <button onClick={(e)=>{e.preventDefault(); console.log(pName,pId)}}>Add Patient</button></form></div> : choice === "res" ? <div><h2>Welcome New Company</h2><form><input type="text" name="cId" onChange={(e)=>{setCId(e.target.value)}} placeholder="Comapany Id"></input><input type="text" onChange={(e)=>{console.log(e.target.value);setCName(e.target.value)}} placeholder="Company Name"></input> <button onClick={(e)=>{e.preventDefault(); console.log(cName,cId)}}>Add Comapany</button></form></div>  : ""
        } </div>
       : pro === "login" ? <div><h1>Welcome Back !!!</h1>
      
        <button onClick={()=>{setChoice("pat")}}>Patient</button>
       
        <button onClick={()=>{setChoice("r")}}>Research Company</button>
        {
          choice === "pat" ? <div><button onClick={async ()=>{
           // console.log(window.ethereum.getAddress());

          const dAppStorageProvider = await new StorageProvider({
            appId: 2193,
            provider: window.ethereum,
            email: "rupalishah040@gmail.com",
          });
          const Downloader = await dAppStorageProvider.getDownloader();
          const tx = await Downloader.download("0x1ef8e0e83e864ec4907b348ba44c8186bb0b8eff4a35c76afa144d3ee681f856");
          alert("Downloaded Check download folder!!")

          }}>Get Patient Data</button><input type="file" onChange={(e)=>{setF(e.target.files[0])}}></input><button onClick={async()=>{
           
            const dAppStorageProvider = await new StorageProvider({
              appId:  2193,
              provider: window.ethereum,
              email: "rupalishah040@gmail.com",
            });
            
            console.log(dAppStorageProvider);
            const Uploader = await dAppStorageProvider.getUploader();
            const Access = await new dAppStorageProvider.getAccess();
            console.log(Access,dAppStorageProvider);
            const tx = await Uploader.upload(file);
            console.log(tx);
            addData(tx);
          }}>Upload New Data</button> <input type="text" onChange={(e)=>{
            setPName(e.target.value);
         }}></input>
         <button onClick={()=>{getData(name)}}>Select Comapany</button><button onClick={async()=>{
            const dAppStorageProvider = await new StorageProvider({
              appId:  2193,
              provider: window.ethereum,
              email: "rupalishah040@gmail.com",
            });
            
            console.log(dAppStorageProvider);
            const Access = await new dAppStorageProvider.getAccess();
            const docRef = doc(db, "users", window.ethereum.selectedAddress);
            console.log(docRef)
            const docSnap = await getDoc(docRef);
            const data = docSnap.data() 
            console.log(data);
          //  setAccess(data.wallet_Add);
            Access.share([data.dids], [a]);
         }}>Give Access</button></div> : choice === "r" ? <div>R</div> : ""
        }
        </div> : ""
      }
        
      </header>
    </div>
  );
}

export default App;
