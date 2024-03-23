import React, { useState, useEffect, useContext } from "react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import NotificationContext from "@/store/notification-store";
import { ClipLoader } from "react-spinners";

const Announcement = () => {
  const { data: session, status } = useSession();
  const [announcement, setAnnouncement] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingAnnouncement, setExistingAnnouncement] = useState(false);

  const notificationctx = useContext(NotificationContext);

  useEffect(() => {
    fetchAnnouncement(); // Fetch announcement data on component mount
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const response = await axios.get("/api/announces");
      if (response.data.announceData) {
        setAnnouncement(response.data.announceData.announceData);
        setExistingAnnouncement(true);
      } else {
        setAnnouncement("");
        setExistingAnnouncement(false);
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  const handleAnnouncementAdd = async (e) => {
    e.preventDefault();

    setLoadingSpinner(true);
    setError(null);

    if (!announcement.trim()) {
      notificationctx.showNotification({
        title: "Fields Error",
        description: "Add Announcement or leave blank for default",
        variant: "destructive",
      });
      setLoadingSpinner(false);

      return;
    }

    try {
      if (existingAnnouncement) {
        setError("Announcement already exists. Please delete it first.");
      } else {
        await axios.post(
          "/api/announces",
          { announcementData: announcement },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        notificationctx.showNotification({
          title: "Announcement Added Successfully",
          description: "Announcement Added",
          variant: "blackToast",
        });
        fetchAnnouncement(); // Fetch updated announcement after posting
      }
    } catch (error) {
      setError("Error adding announcement. Please try again.");
      notificationctx.showNotification({
        title: "Error with announcement. Please try again",
        description: "Error",
        variant: "desctructive",
      });
      console.error(error);
    } finally {
      setLoadingSpinner(false);
    }
  };

  const handleAnnouncementDelete = async () => {
    setLoadingSpinner(true);
    setError(null);

    try {
      await axios.delete("/api/announces");
      notificationctx.showNotification({
        title: "Annoucement deleted ",
        description: "Data deleted successfully",
        variant: "destructive",
      });
      setAnnouncement("");
      setExistingAnnouncement(false); // Reset existingAnnouncement state
    } catch (error) {
      setError("Error deleting announcement. Please try again.");
      notificationctx.showNotification({
        title: "Error deleting data",
        description: "Error deleting announcement. Please try again",
        variant: "destructive  ",
      });
      console.error(error);
    } finally {
      setLoadingSpinner(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-4 p-6">
      <div className="text-center">
        <h4 className="text-lg font-medium leading-none">
          Meghalaya Sunday Teer Announcement
        </h4>
      </div>
      <Separator className="my-2 w-48" />
      <div className="flex justify-center items-center text-sm mb-4 lg:mb-0">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : session ? (
          <form
            className="flex flex-col items-center"
            onSubmit={handleAnnouncementAdd}
          >
            <Textarea
              className="w-[330px] md:w-[410px] lg:w-[870px]"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button disabled={existingAnnouncement}>
                <IoMdAdd size={20} />
              </Button>
              {existingAnnouncement && (
                <Button
                  variant="destructive"
                  onClick={handleAnnouncementDelete}
                  disabled={loadingSpinner}
                >
                  {loadingSpinner ? (
                    <ClipLoader size={20} color={"#000"} loading={true} />
                  ) : (
                    <MdDeleteOutline size={20} />
                  )}
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="w-[330px] md:w-[410px] lg:w-[870px] text-center">
            {announcement ? (
              <h1 className="mt-[-15px]">{announcement}</h1>
            ) : (
              <h1 className="mt-[-15px]">No Announcement Posted</h1>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Announcement;
