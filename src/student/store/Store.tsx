
import { Button } from "@/components/ui/button"

import { Plus, Share2 } from "lucide-react"
import { CardD } from "./CardD"
import { CreateContentModel } from "./CreateContentModel"
import { useEffect, useState } from "react"
import { useContent } from "@/hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "@/config"
// import { copyToClipboard } from "copy-to-clipboard";




function Store() {
  const [modalOpen, setModalOpen] = useState(false);
  // const [copied, setCopied] = useState(false);

  // const contents = useContent();

  const {content, refresh} = useContent();

  useEffect(() =>{
    refresh();
  },[modalOpen]);
  return (

    <>
      {/* <Sidebarc /> */}
      <div className="p-4  bg-background rounded-md min-h-screen">
        <CreateContentModel open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-between p-8 " >
          <h1 className="text-muted-foreground font-bold text-2xl">All Notes</h1>
          <div className="flex items-center gap-2">

            <Button onClick={ async () =>{

           const response = await   axios.post(`${BACKEND_URL}content/share/`,{
                share: true
              },{
                headers:{
                  "Authorization" : localStorage.getItem("token")
                }
              });
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`
              // copyToClipboard(shareUrl);

              // setCopied(true);
              console.log(shareUrl);
              alert("Copied to clipboard");
              
            }} 
            
            
            variant="glow" className="flex items-center gap-2 hover:scale-105 hover:text-white ">

              <Share2 className=" w-4 h-4" />
              Share Brain
            </Button>

            <Button onClick={() => setModalOpen(true)} variant="glow" className="flex items-center gap-2 hover:scale-105 hover:text-white ">
              <Plus className="w-4 h-4" />
              Add Content
            </Button>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap mb-4 ml-8">
      {/* {JSON.stringify(contents)} */}
          {
            content.map(({ type, link, title }) => <CardD title={title}link={link}type={type}/>
            )}



        </div>

      </div>




    </>
  )
}

export default Store