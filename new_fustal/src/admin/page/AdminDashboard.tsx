import {
  createFutsalApi,
  deleteFutsalAPI,
  getFutsalUserIdApi,
} from "@/api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [futsalName, setFutsalName] = useState("");
  const [futsalPrice, setFutsalPrice] = useState("");
  const [futsalContact, setFutsalContact] = useState("");
  const [futsalCategory, setFutsalCategory] = useState("");
  const [futsalDescription, setFutsalDescription] = useState("");
  const [futsalLocation, setFutsalLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [futsalImage, setFutsalImage] = useState<File | null>(null);
  const [imagePreview, setPreviewImage] = useState<string | null>(null);

  const [futsals, setFutsals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    getFutsalUserIdApi(user._id).then((res) => {
      setFutsals(res.data.futsals);
    });
  }, []);

  const filteredFutsals = futsals.filter((item) =>
    item.futsalName.toLowerCase().includes(searchQuery) ||
    item.futsalLocation.toLowerCase().includes(searchQuery) ||
    item.futsalPrice.toString().toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredFutsals.length / itemsPerPage);
  const slicedData = filteredFutsals.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("futsalName", futsalName);
    formData.append("futsalPrice", futsalPrice);
    formData.append("futsalContact", futsalContact);
    formData.append("futsalCategory", futsalCategory);
    formData.append("futsalDescription", futsalDescription);
    formData.append("futsalLocation", futsalLocation);
    if (futsalImage) formData.append("futsalImage", futsalImage);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    createFutsalApi(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Server Error"));
  };

  const handleDelete = (id: any) => {
    deleteFutsalAPI(id)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFutsalImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Futsals</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search Futsal..."
            onChange={handleSearchChange}
            className="max-w-sm"
          />
          <Button onClick={() => setIsModalOpen(true)}>Add Futsal</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Futsal Name</TableHead>
            <TableHead>Price/Hr</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slicedData.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="cursor-pointer" onClick={() => {
                setSelectedImageUrl(item.futsalImageUrl);
                setImageModalOpen(true);
              }}>
                <div className="flex items-center gap-2">
                  <img src={item.futsalImageUrl} alt="Thumbnail" className="w-10 h-10 rounded" />
                  <div>
                    <div className="font-medium">{item.futsalName}</div>
                    <div className="text-xs text-gray-500">{item.futsalLocation}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.futsalPrice}</TableCell>
              <TableCell>{item.futsalContact}</TableCell>
              <TableCell>{item.futsalCategory}</TableCell>
              <TableCell>{item.futsalDescription}</TableCell>
              <TableCell className="flex gap-2">
                <Link to={`/admin/edit/${item._id}`}>
                  <Button variant="secondary" size="sm">Edit</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => setDeleteModalOpen(true)}>
                  Delete
                </Button>

                <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      Are you sure you want to delete {item.futsalName}?
                    </div>
                    <DialogFooter>
                      <Button variant="destructive" onClick={() => handleDelete(item._id)}>
                        Confirm
                      </Button>
                      <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Futsal Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Futsal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input placeholder="Futsal Name" value={futsalName} onChange={(e) => setFutsalName(e.target.value)} />
            <Input placeholder="Price" value={futsalPrice} onChange={(e) => setFutsalPrice(e.target.value)} />
            <Input placeholder="Contact" value={futsalContact} onChange={(e) => setFutsalContact(e.target.value)} />
            <Input placeholder="Category" value={futsalCategory} onChange={(e) => setFutsalCategory(e.target.value)} />
            <Input placeholder="Description" value={futsalDescription} onChange={(e) => setFutsalDescription(e.target.value)} />
            <Input placeholder="Location" value={futsalLocation} onChange={(e) => setFutsalLocation(e.target.value)} />
            <Input placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            <Input placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            <Input type="file" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover" />}
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image View Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Futsal Image</DialogTitle>
          </DialogHeader>
          {selectedImageUrl && <img src={selectedImageUrl} alt="Futsal" className="w-full h-auto" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
