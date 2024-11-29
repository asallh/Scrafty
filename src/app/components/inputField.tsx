import { Button, Input } from "@nextui-org/react";

export default function InputField() {
  return (
    <div>
      <Input
        label="Website"
        required
        placeholder="add website to download data"
        width="300px" // Set the desired width here

      />
      <center className="m-8">
        <Button className="m-4">Submit</Button>
      </center>
    </div>
  );
}
