import {useState,useEffect} from 'react'
const api_base="https://msg-app-sigma.vercel.app"
function Explore({byValue}) {
    const [msgArr,setMsgArr]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(() =>{
        GetMsg();
          
      },[])
    
      const GetMsg = async () => {
        try {
          const response = await fetch(`${api_base}/profile/${byValue}`);
          const data = await response.json();
          setMsgArr(data);
        } catch (err) {
          console.error("Error: ", err);
        } finally {
          setLoading(false); // Move setLoading(false) to finally block
        }
      };
   
   
      const sendReq = async (id) => {
        try{
        const data = await fetch(api_base + "/request/"+id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            
        from:byValue,
          
          })
        });
      GetMsg();}catch (error) {
        console.error("Error accepting request:", error);
      }
      }
	
      return (
        <div className="todos">
          {loading ? (''):
          msgArr.length > 0 ? (
            msgArr.map((msg) => (
              <div className="todo" key={msg._id}>
                <div className="text">
                  <p>
                    {msg.image && (
                      <div className="image-containernew">
                        <img
                          className="user-imagenew"
                          src={`data:image/jpeg;base64, ${msg.image}`}
                          alt="User Image"
                        />
                      </div>
                    )}
                    {msg.id}
                  </p>
                  {msg.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="button" onClick={() => sendReq(msg._id)}>
                  Add Friend
                </div>
              </div>
            ))
          ) : (
            <h1 className="emp">No New Friends</h1>
          )}


        </div>

      );
}

export default Explore;