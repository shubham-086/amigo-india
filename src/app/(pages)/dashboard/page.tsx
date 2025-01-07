"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default function Page() {
  const [userData, setUserData] = useState<any | null>(null);
  const { data: session, status } = useSession();
  const user = session?.user as User;

  useEffect(() => {
    if (status === "loading" || !user) return;

    const fetchUserData = async () => {
      const response = await axios.post<ApiResponse>("/api/user/activity", {
        userId: user.id,
      });
      // console.log("User Data: ", response.data);
      setUserData(response.data.data);
    };

    fetchUserData();
  }, [user, status]);

  if (status === "loading" || !userData) {
    return <Skeleton />;
  }

  const { userActivities, quizStats, latestUserActivity } = userData;
  console.log(userData);

  return (
    <div className="p-6 space-y-6">
      {/* Quiz Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg text-center">
              <h2 className="text-xl font-semibold">Attempts</h2>
              <p className="text-lg">{quizStats.attempts}</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <h2 className="text-xl font-semibold">Completed</h2>
              <p className="text-lg">{quizStats.completed}</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg text-center">
              <h2 className="text-xl font-semibold">Average Score</h2>
              <p className="text-lg">{quizStats.averageScore.toFixed(2)}%</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg text-center">
              <h2 className="text-xl font-semibold">Last Attempt</h2>
              <p className="text-lg">
                {new Date(quizStats.lastAttempt).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Latest Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {latestUserActivity.map((activity: any) => (
            <div
              key={activity._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4"
            >
              <div>
                <h3 className="font-medium text-lg">
                  {activity.activityId.title} ({activity.activityId.level})
                </h3>
                <p className="text-gray-500 text-sm">
                  {activity.activityId.category.name}
                </p>
              </div>
              <p className="text-gray-400 text-sm">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* User Activities */}
      <Card>
        <CardHeader>
          <CardTitle>User Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userActivities.map((activity: any) => (
                <TableRow key={activity._id}>
                  <TableCell>{activity.activityId.title}</TableCell>
                  <TableCell>{activity.activityId.level}</TableCell>
                  <TableCell>{activity.activityTypeRef}</TableCell>
                  <TableCell>
                    {new Date(activity.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
