import {useState,useEffect} from 'react'
const api_base="https://msg-app-sigma.vercel.app"
function Sent({byValue}) {
    const [msgArr,setMsgArr]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(() =>{
        GetMsg();
          
      },[])
    
      const GetMsg = async () => {
        try {
          const response = await fetch(`${api_base}/myMsg/${byValue}`);
          const data = await response.json();
          setMsgArr(data);
        } catch (err) {
          console.error("Error: ", err);
        } finally {
          setLoading(false); // Move setLoading(false) to finally block
        }
      };
      const updateMsg = async (id) => {
        try {
          await fetch(api_base + "/myMsg/update/" + id, {
            method: 'PUT',
          });
    
          // Update msgArr based on its previous state
          //setMsgArr(prevMsgArr => prevMsgArr.filter(msg => msg._id !== id));
          GetMsg();
        } catch (error) {
          console.error("Error updating request:", error);
        }
      };
      const [images, setImages] = useState({});
      useEffect(() => {
        const getImage = async (d) => {
          try {
            const response = await fetch(`${api_base}/getImage/${d}`);
            const data = await response.json();
    
            setImages((prevImages) => ({
              ...prevImages,
              [d]: data,
            }));
          } catch (error) {
            console.error("Error: ", error);
          }
        };
    
    
        msgArr.forEach((msg) => {
          getImage(msg.name);
        });
      }, [msgArr]);
	
    return(
     <div className="todos">
      {loading ? (''):
      msgArr.length > 0 ? (
        msgArr.map(msg => (
        <div className="todo " key={msg._id}>
       
          <div className="text">{images[msg.name] &&   ( <div className="image-containernew">
                <img
                  className="user-imagenew"
                  src={`data:image/jpeg;base64, ${images[msg.name]}`}
                  alt="User Image"
                />
              </div>)}<p>{msg.name}</p>{msg.message}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="button" onClick={()=> updateMsg(msg._id)}>Clear</div>
     </div>
        </div>
       ))):(
        <h1 className="emp">Nothing Here</h1>
       )}
       </div>
    );
}

export default Sent;