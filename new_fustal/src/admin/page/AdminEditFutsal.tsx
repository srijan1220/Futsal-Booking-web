"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateFutsalAPI, getSingleFutsalApi } from "@/api/api";

const AdminEditFutsal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [futsalName, setFutsalName] = useState("");
  const [futsalPrice, setFutsalPrice] = useState("");
  const [futsalContact, setFutsalContact] = useState("");
  const [futsalCategory, setFutsalCategory] = useState("");
  const [futsalDescription, setFutsalDescription] = useState("");
  const [futsalLocation, setFutsalLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [futsalImage, setFutsalImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    getSingleFutsalApi(id).then((res) => {
      const data = res.data.futsal;
      setFutsalName(data.futsalName);
      setFutsalPrice(data.futsalPrice);
      setFutsalContact(data.futsalContact);
      setFutsalCategory(data.futsalCategory);
      setFutsalDescription(data.futsalDescription);
      setFutsalLocation(data.futsalLocation);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setOldImage(data.futsalImageUrl);
    });
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFutsalImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("futsalName", futsalName);
    formData.append("futsalPrice", futsalPrice);
    formData.append("futsalContact", futsalContact);
    formData.append("futsalCategory", futsalCategory);
    formData.append("futsalDescription", futsalDescription);
    formData.append("futsalLocation", futsalLocation);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    if (futsalImage) {
      formData.append("futsalImage", futsalImage);
    }

    try {
      const res = await updateFutsalAPI(id, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/futsal");
      } else {
        toast.error("Failed to update futsal");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Edit {futsalName} Futsal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="futsalName">Futsal Name</Label>
            <Input
              id="futsalName"
              value={futsalName}
              onChange={(e) => setFutsalName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="futsalPrice">Futsal Price</Label>
            <Input
              id="futsalPrice"
              type="number"
              value={futsalPrice}
              onChange={(e) => setFutsalPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="futsalContact">Futsal Contact</Label>
            <Input
              id="futsalContact"
              type="number"
              value={futsalContact}
              onChange={(e) => setFutsalContact(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Futsal Category</Label>
            <Select value={futsalCategory} onValueChange={setFutsalCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5A-Side">5A-Side</SelectItem>
                <SelectItem value="7A-Side">7A-Side</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="futsalLocation">Futsal Location</Label>
            <Input
              id="futsalLocation"
              value={futsalLocation}
              onChange={(e) => setFutsalLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="futsalDescription">Futsal Description</Label>
          <Textarea
            id="futsalDescription"
            value={futsalDescription}
            onChange={(e) => setFutsalDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="futsalImage">Futsal Image</Label>
          <Input
            type="file"
            id="futsalImage"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {oldImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Old Image:</p>
              <img
                src={oldImage}
                alt="Old"
                className="w-48 h-32 object-cover rounded-md"
              />
            </div>
          )}
          {previewImage && (
            <div className="mt-2">
              <p className="text-sm text-blue-600">New Image Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                className="w-48 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default AdminEditFutsal;
/*  */
