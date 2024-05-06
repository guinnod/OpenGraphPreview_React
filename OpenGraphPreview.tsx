import { proxyUrl } from "@/config/site";
import axios from "axios";
import { useEffect, useState } from "react";
import { FC } from "react";

interface SkeletonProps {
    height: number;
}

export const Skeleton: FC<SkeletonProps> = ({ height }) => {
    return (
        <div
            className={`w-[min(calc(100vw - 20px), 335px)] h-[${height}px] animate-pulse bg-gray-500 z-10`}
        />
    );
};

interface OpenGraphPreviewProps {
    url: string;
}

export const OpenGraphPreview: FC<OpenGraphPreviewProps> = ({ url }) => {
    const [ogData, setOgData] = useState({
        title: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        const fetchData = async (retryCount = 0) => {
            try {
                const response = await axios.get(`${proxyUrl}?url=${url}`);

                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(
                    response.data,
                    "text/html"
                );
                const metaTags = htmlDocument.getElementsByTagName("meta");

                let ogMeta = { title: "", description: "", image: "" };
                // @ts-ignore
                for (let tag of metaTags) {
                    if (tag.getAttribute("property") === "og:title") {
                        ogMeta.title = tag.getAttribute("content");
                    } else if (
                        tag.getAttribute("property") === "og:description"
                    ) {
                        ogMeta.description = tag.getAttribute("content");
                    } else if (tag.getAttribute("property") === "og:image") {
                        ogMeta.image = tag.getAttribute("content");
                    }
                }
                setOgData(ogMeta);
            } catch (error) {
                if (retryCount < 3) {
                    console.log(`Retrying... Attempt ${retryCount + 1}`);
                    setTimeout(() => fetchData(retryCount + 1), 1000);
                } else {
                    console.error("Error fetching OpenGraph data:", error);
                }
            }
        };

        fetchData();
    }, [url]);

    return (
        <div>
            {ogData.title ? (
                <h1 className="mb-2">{ogData.title}</h1>
            ) : (
                <Skeleton height={25} />
            )}
            {!ogData.title && <div className="h-4" />}

            {ogData.image ? (
                <img src={ogData.image} alt="Open Graph Image" />
            ) : (
                <Skeleton height={175} />
            )}
        </div>
    );
};
