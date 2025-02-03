import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
// import { Avatar, AvatarImage } from './ui/avatar';
// import { X } from 'lucide-react';  // Import the close icon

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
    // profilePhoto: null, // New state for profile photo
  });

  const dispatch = useDispatch();

  const isRecruiter = user?.role === 'recruiter';

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a valid PDF file.');
        return;
      }
      setInput({ ...input, file });
    }
  };

  // const profilePhotoChangeHandler = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  //     if (!validImageTypes.includes(file.type)) {
  //       toast.error('Please upload a valid image file (JPG, PNG, JPEG).');
  //       return;
  //     }
  //     setInput({ ...input, profilePhoto: file });
  //   }
  // };

  const phoneNumberChangeHandler = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setInput({ ...input, phoneNumber: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(input.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    if (!isRecruiter) {
      formData.append("skills", input.skills);
      if (input.file) {
        formData.append("file", input.file);
      }
    }

    // if (input.profilePhoto) {
    //   formData.append("profilePhoto", input.profilePhoto);
    // }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent
          aria-describedby="dialog-description"
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
          style={{
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle>Update Profile</DialogTitle>
            {/* Close icon at the top-right */}
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">Number</Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={phoneNumberChangeHandler}
                  maxLength={10}
                  className="col-span-3"
                  placeholder="Enter 10 digits"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>

              {/* Skills Section - Show only if user is not a recruiter */}
              {!isRecruiter && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    className="col-span-3"
                  />
                </div>
              )}

              {/* Resume Section - Show only if user is not a recruiter */}
              {!isRecruiter && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">Resume</Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                    className="col-span-3"
                  />
                  {input.file && <div className="text-sm text-gray-500 mt-2">{input.file.name}</div>}
                </div>
              )}

              {/* Profile Photo Section
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profilePhoto" className="text-right">Profile Photo</Label>
                <div className="col-span-3">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src={input.profilePhoto ? URL.createObjectURL(input.profilePhoto) : user?.profile?.profilePhoto} alt="Profile" />
                  </Avatar>
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={profilePhotoChangeHandler}
                  />
                  {input.profilePhoto && <div className="text-sm text-gray-500 mt-2">{input.profilePhoto.name}</div>}
                </div>
              </div> */}

            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">Update</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
