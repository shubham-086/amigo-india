"use client";
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
  const [userData, setUserData] = useState<ApiResponse | null>(null);
  const { data: session, status } = useSession();
  const user = session?.user as User;

  useEffect(() => {
    if (status === "loading" || !user) return;

    const fetchUserData = async () => {
      const response = await axios.post<ApiResponse>("/api/user/activity", {
        userId: user.id,
      });
      setUserData(response.data);
    };

    fetchUserData();
  }, [user, status]);

  if (status === "loading" || !userData) {
    return <Skeleton />;
  }

  const defaultQuizStats = {
    attempts: 0,
    completed: 0,
    averageScore: 0,
    lastAttempt: new Date().toISOString(),
  };

  const defaultLatestActivity = [
    {
      _id: "default",
      activityId: {
        title: "Sample Activity",
        level: "Beginner",
        category: { name: "General" },
      },
      createdAt: new Date().toISOString(),
    },
  ];

  const defaultUserActivities = [
    {
      _id: "default",
      activityId: {
        title: "Sample Activity",
        level: "Beginner",
      },
      activityTypeRef: "Quiz",
      createdAt: new Date().toISOString(),
    },
  ];

  const quizStats = userData?.data?.quizStats ?? defaultQuizStats;
  const latestUserActivity =
    userData?.data?.latestUserActivity ?? defaultLatestActivity;
  const userActivities =
    userData?.data?.userActivities ?? defaultUserActivities;

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
          {latestUserActivity.length > 0 ? (
            latestUserActivity.map((activity: any) => (
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
            ))
          ) : (
            <p className="text-gray-500 text-center">No activity yet.</p>
          )}
        </CardContent>
      </Card>

      {/* User Activities */}
      <Card>
        <CardHeader>
          <CardTitle>User Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {userActivities.length > 0 ? (
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
          ) : (
            <p className="text-gray-500 text-center">No activities found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
