import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  ImageFile,
  setImageFile,
  ImageUrl,
  setImageUrl,
  ImageLoading,
  setImageLoading,
}) => {
  const inputRef = useRef(null);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const ImageUploadToCloudinary = async () => {
    try {
      setImageLoading(true)
      const formData = new FormData();
      formData.append("my_file", ImageFile);
      const { data } = await axios.post(
        "/api/admin/products/upload-image",
        formData
      );
      setImageUrl(data.result.url);
      setImageLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ImageFile) ImageUploadToCloudinary();
  }, [ImageFile]);

  return (
    <div className=" w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed "
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          onChange={handleImageUpload}
        />
        {!ImageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 " />
            <span>Drag & Drop or click to upload</span>
          </Label>
        ) : (
          ImageLoading ? 
          <Skeleton className='h-16 bg-gray-200 '/> : 
          <div className="flex items-center justify-between ">
            <div className="flex items-center ">
              <FileIcon className="text-primary w-8 h-8 mr-2 " />
            </div>
            <p className="text-sm font-medium truncate">{ImageFile.name}</p>
            <Button
              onClick={() => setImageFile(null)}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
