import { Button, Input } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-8">Website Parser Download</h1>
      <InputField />
    </div>
  );
}

export function InputField() {
  return (
    <div className="w-full max-w-3xl">
      <Input
        label="Website"
        required
        placeholder="add website to download data"
        width="100%" // Set the width to 100% to fill the parent div
      />
      <div className="flex justify-center mt-8">
        <Button className="m-4">Submit</Button>
      </div>
    </div>
  );
}
