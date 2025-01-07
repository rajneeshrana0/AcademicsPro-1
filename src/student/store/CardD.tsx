import { useEffect } from "react";

// Declare the twttr property on the window object
declare global {
    interface Window {
        twttr: {
            widgets: {
                load: () => void;
            };
        };
    }
}
import { Share2 } from "lucide-react";

interface CardsProps {
    title: string; // Title of the card, e.g., video or tweet title
    link: string; // Link to the content (YouTube or Twitter)
    type: "twitter" | "youtube"; // Type of the content
}

// The Card component represents a styled card that can display either a YouTube video or a Twitter embed based on the type prop.
export function CardD({ title, link, type }: CardsProps) {
    // Improved embed URL for YouTube
    const embedUrl = type === "youtube" && link
        ? link.replace("youtube.com/watch?v=", "youtube.com/embed/").split("&")[0] // Improved to handle extra query params
        : "";

    useEffect(() => {
        // Ensure Twitter embeds are initialized when type is "twitter"
        if (type === "twitter" && window.twttr) {
            window.twttr.widgets.load();
        }
    }, [type]);

    return (
        <div>
            {/* Card Container */}
            <div className="p-4 bg-background  border max-w-72 min-h-48 min-w-72 rounded-lg">
                {/* Header Section */}
                <div className="flex justify-between">
                    {/* Left Section: Title with Icon */}
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            {/* Share Icon preceding the title */}
                            <Share2 />
                        </div>
                        {title}
                    </div>
                    {/* Right Section: Links with Icons */}
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            {/* Clickable Share Icon that opens the link */}
                            <a href={link} target="_blank" rel="noopener noreferrer" aria-label="Share content">
                                <Share2 />
                            </a>
                        </div>
                        <div className="text-gray-500">
                            {/* Placeholder for another Share Icon */}
                            <Share2 />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="pt-4">
                    {/* Render YouTube embed if type is "youtube" */}
                    {type === "youtube" && embedUrl && (
                        <iframe
                            className="w-full h-64"  // Adjust height to make it more visible
                            src={embedUrl}
                            title="YouTube video player"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <>
                            <blockquote className="twitter-tweet">
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                            {/* Ensure script is added to the page */}
                            {/* <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script> */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
