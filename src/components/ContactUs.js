import { useState } from "react";
const ContactUs=()=>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit=()=>{
        e.preventDefault();
        console.log(name,email,message);
        setName('');
        setEmail('');
        setMessage('');
    }
  return (
     <div className="contact-page">
        <div className="contact-form">
        <h1>Contact-Us</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            required
            onChange={(e) => setName(e.target.value)} 
          />
         
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            required
            onChange={(e) => setEmail(e.target.value)} 
          />
          <textarea  
            placeholder="Message u want to send to me" 
            value={message} 
            className="textarea"
            required
            onChange={(e) => setMessage(e.target.value)} 
            ></textarea>

          <button type="submit">Submit</button>
        </form>
        </div>
     </div>
  )
}
export default ContactUs;