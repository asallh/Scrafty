"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [download, setDownload] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  // Will fetch the page data
  const getPageData = async () => {
    const res = await fetch("http://localhost:3000/api/getData", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
    const { download } = await res.json();
    setDownload(download);
    console.log("Downloads", download);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-8 text-titleColor text-3xl font-bold">Scrafty</h1>
      <h2 className="text-titleColor p-8">
        Enter a URL to download the page as a text file and all image assets
        from the webpage!
      </h2>
      <div className="w-full max-w-3xl">
        <Input
          label="Website"
          required
          width="100%"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex justify-center mt-8">
          <Button
            variant="solid"
            className="m-4 p-4 bg-buttonColor hover:bg-buttonHover"
            onClick={getPageData}
          >
            Submit
          </Button>
        </div>
        {download && (
          <center>
            <p> This Package has {download} downloads.</p>
          </center>
        )}
      </div>
    </div>
  );
}
