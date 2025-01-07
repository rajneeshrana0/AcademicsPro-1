import { BACKEND_URL } from "@/config";
import axios from "axios";


import { useEffect, useState } from "react";


export function useContent() {

    const [content, setContent] = useState([]);



    function refresh() {

        axios.get(`${BACKEND_URL}/content`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((response) => {
                setContent(response.data.content);
            })
        // setContent(response.data);

    }

    useEffect(() => {

        refresh();

        const interval = setInterval(() => {

            refresh();


        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }

    }, [])


    return {content, refresh};
}


