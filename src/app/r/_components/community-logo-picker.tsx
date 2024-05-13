import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdDelete } from "react-icons/md";

type CommunityLogoPickerProps = {
  setFile: Dispatch<SetStateAction<File | null | undefined>>;
  file: File | null | undefined;
};

export default function CommunityLogoPicker({
  file,
  setFile,
}: CommunityLogoPickerProps) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { "image/*": [".png", ".jpeg", ".svg"] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  return (
    <div className="flex space-x-4 items-center">
      <Image
        src={file ? URL.createObjectURL(file) : "default-community-icon.svg"}
        width={24}
        height={24}
        alt="Community Logo"
        className="rounded-full size-16 border-2 p-1"
      />
      {file ? (
        <Button variant={"destructive"} onClick={() => setFile(null)}>
          <MdDelete className="size-5 mr-2"/>
          <span>Remove</span>
        </Button>
      ) : (
        <Button variant={"secondary"} {...getRootProps()} type="button">
          <input {...getInputProps()} />
          Select Logo
        </Button>
      )}

      {/* <MdDelete className="text-red-500 p-1 size-8 cursor-pointer block" /> */}
    </div>
  );
}
