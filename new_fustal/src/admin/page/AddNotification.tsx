import { useEffect, useState } from "react";
import {
  createNotitificationAPI,
  deleteNotificationAPI,
  getNotitificationAPI,
} from "@/api/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

interface User {
  _id: string;
  userName: string;
}

const AddNotification = () => {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  const id = user?._id ?? null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = () => {
    getNotitificationAPI(id).then((res) => {
      setNotifications(res.data.notification);
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", "userid");
    formData.append("title", title);
    formData.append("description", description);

    createNotitificationAPI(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setIsModalOpen(false);
          fetchNotifications();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Server Error"));
  };

  const handleDelete = () => {
    if (!deleteId) return;

    deleteNotificationAPI(deleteId).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        fetchNotifications();
      } else {
        toast.error(res.data.message);
      }
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    });
  };

  return (
    <div className="w-full sm:px-6 relative">
      <Toaster />
      <div className="flex items-center justify-between px-4 md:px-10 py-4 bg-gray-100 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add Notification</Button>
      </div>

      <div className="bg-white shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-gray-700 border-b">
              <th className="py-3">Title</th>
              <th>Description</th>
              <th>Date Sent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n._id} className="border-b hover:bg-gray-50">
                <td className="py-2">{n.title}</td>
                <td>{n.description}</td>
                <td>{new Date(n.dateSent).toLocaleDateString()}</td>
                <td className="flex gap-2 mt-1">
                  <Link to={`/admin/editnotification/${n._id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil size={16} />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setDeleteId(n._id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="max-w-3xl w-full"> {/* 👈 adjust size here */}
    <DialogHeader>
      <DialogTitle>Add New Notification</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
        rows={4}
        required
      />
      <DialogFooter>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>


      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Are you sure you want to delete?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4">
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNotification;
