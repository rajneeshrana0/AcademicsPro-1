import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";

import axios from "axios";

import { X } from "lucide-react";
import { useRef, useState } from "react";


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
}


// Controlled Component
interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
}

export const CreateContentModel = ({ open, onClose }: CreateContentModelProps) => {
    const titeRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);




    async function addContent() {

        const title = titeRef.current?.value;;
        const link = linkRef.current?.value;

        await axios.post(BACKEND_URL + "content", {
            title,
            link,
            type
        }, {
            headers: {

                "Authorization": localStorage.getItem("token")

            }

        })
        onClose();




        console.log("add content");
    }


    return (

        <>
            <div>

                {open && <div className="w-screen h-screen bg-background/60 fixed top-0 left-0 flex justify-center items-center z-50">

                    <div className="text-lg text-foreground p-4 rounded bg-background">

                        <div className="flex justify-end">

                            <X className="h-6 w-6 cursor-pointer bg-violet-600 hover:grayscale-0 transition-all" onClick={onClose} />

                        </div>
                        <div className="mt-4">
                            <Input placeholder={"title"}
                                ref={titeRef}
                            />
                            <Input placeholder={"link"}
                                ref={linkRef}
                            />
                            {/* <Input placeholder={"type"} /> */}
                            <h1 className="text-center mt-4 font-bold">Type</h1>
                            <div className="flex justify-around mt-4">
                                <Button variant={type === ContentType.Youtube ? "glow" : "outline"}
                                    onClick={() => setType(ContentType.Youtube)}
                                >Youtube</Button>
                                <Button variant={type === ContentType.Twitter ? "glow" : "outline"}
                                    onClick={() => setType(ContentType.Twitter)}
                                >Twitter</Button>
                            </div>

                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant={"secondary"} className="mt-4">Submit</Button>
                        </div>

                    </div>

                </div>}
            </div>
        </>
    );
};



// function InputField({ onChange,placeholder }: {onChange: () => void}) {


//     <div>
//         <Input placeholder={placeholder} className="px-4 py-2 rounded-md w-full border  "  onChange={onChange}/>
//     </div>
// }