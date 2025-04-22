import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { getSingleNotificationAPI, updateNotitificationAPI } from "@/api/api";

const EditNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await getSingleNotificationAPI(id);
        setTitle(res?.data?.notification?.title || "");
        setDescription(res?.data?.notification?.description || "");
      } catch (error) {
        toast.error("Failed to fetch notification");
      }
    };
    fetchNotification();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await updateNotitificationAPI(id, formData);
      if (res.data.success) {
        toast.success("Notification updated successfully!");
        navigate("/admin/notification");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch {
      toast.error("Server Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              Edit Notification for {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
              <Link to="/admin/notification">
                <Button variant="secondary" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditNotification;
