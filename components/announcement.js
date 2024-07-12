import React, { useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import NotificationContext from "@/store/notification-store";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";

const fetchAnnouncement = async () => {
  const response = await axios.get("/api/announces");
  return response.data.announceData?.announceData || "";
};

const Announcement = () => {
  const { data: session } = useSession();
  const notificationctx = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const textareaRef = useRef(null);

  const {
    data: announcement,
    isLoading,
    isError,
  } = useQuery("announcement", fetchAnnouncement);

  const addAnnouncementMutation = useMutation(
    (newAnnouncement) =>
      axios.post("/api/announces", { announcementData: newAnnouncement }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("announcement");
        notificationctx.showNotification({
          title: "Announcement Added Successfully",
          description: "Announcement Added",
          variant: "blackToast",
        });
      },
      onError: () => {
        notificationctx.showNotification({
          title: "Error with announcement. Please try again",
          description: "Error",
          variant: "destructive",
        });
      },
    }
  );

  const deleteAnnouncementMutation = useMutation(
    () => axios.delete("/api/announces"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("announcement");
        queryClient.setQueryData("announcement", ""); // Clear the announcement data
        if (textareaRef.current) {
          textareaRef.current.value = ""; // Clear the textarea
        }
        notificationctx.showNotification({
          title: "Announcement deleted",
          description: "Data deleted successfully",
          variant: "destructive",
        });
      },
      onError: () => {
        notificationctx.showNotification({
          title: "Error deleting data",
          description: "Error deleting announcement. Please try again",
          variant: "destructive",
        });
      },
    }
  );

  const handleAnnouncementAdd = (e) => {
    e.preventDefault();
    const newAnnouncement = e.target.announcement.value.trim();

    if (!newAnnouncement) {
      notificationctx.showNotification({
        title: "Fields Error",
        description: "Add Announcement or leave blank for default",
        variant: "destructive",
      });
      return;
    }

    addAnnouncementMutation.mutate(newAnnouncement);
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
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching announcement</div>
        ) : session ? (
          <form
            className="flex flex-col items-center"
            onSubmit={handleAnnouncementAdd}
          >
            <Textarea
              className="w-[330px] md:w-[410px] lg:w-[870px]"
              name="announcement"
              defaultValue={announcement}
              ref={textareaRef}
            />
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button
                type="submit"
                disabled={addAnnouncementMutation.isLoading || !!announcement}
              >
                {addAnnouncementMutation.isLoading ? (
                  <ClipLoader size={20} color={"#000"} loading={true} />
                ) : (
                  <IoMdAdd size={20} />
                )}
              </Button>
              {announcement && (
                <Button
                  variant="destructive"
                  onClick={() => deleteAnnouncementMutation.mutate()}
                  disabled={deleteAnnouncementMutation.isLoading}
                >
                  {deleteAnnouncementMutation.isLoading ? (
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
