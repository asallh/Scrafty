import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-8 text-titleColor text-3xl font-bold">Scrafty</h1>
      <div className="w-full max-w-3xl">
        <Input
          label="Website"
          required
          placeholder="add website to download data"
          width="100%" // Set the width to 100% to fill the parent div
        />
        <div className="flex justify-center mt-8">
          <Button variant="solid" className="m-4 p-4 bg-buttonColor">Submit</Button>
        </div>
      </div>
    </div>
  );
}
