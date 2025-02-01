import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { profile } = user || {};
  const isResume = !!profile?.resume;

  // Check if user is a recruiter
  const isRecruiter = user?.role === 'recruiter';

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {/* Profile Header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname || 'User'}</h1>
              <p>{profile?.bio || 'No bio available'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || 'Email not provided'}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || 'Phone number not provided'}</span>
          </div>
        </div>

        {/* Skills Section - Show only if user is not a recruiter */}
        {!isRecruiter && (
          <div className="my-5">
            <h1 className="font-bold text-lg mb-3">Skills</h1>
            <div className="flex items-center gap-1">
              {Array.isArray(profile?.skills) && profile.skills.length > 0
                ? profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                : <span>No skills added</span>}
            </div>
          </div>
        )}

        {/* Resume Section - Show only if user is not a recruiter */}
        {!isRecruiter && (
          <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={profile.resume}
                className="text-blue-500 hover:underline"
              >
                {profile.resumeOriginalName}
              </a>
            ) : (
              <span>No resume uploaded</span>
            )}
          </div>
        )}
      </div>

      {/* Applied Jobs Section - Show only if user is not a recruiter */}
      {!isRecruiter && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-5">
          <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      )}

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
