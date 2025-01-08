"use client";
import React, { useState } from "react";

const MyCourses = () => {
  const [courses, setCourses] = useState<string[]>([]); // Initially empty array

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Courses</h1>
      {courses.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">You have not enrolled in any courses yet.</p>
          <p className="mt-2">Explore courses and start learning today!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {courses.map((course, index) => (
            <li
              key={index}
              className="p-4 bg-blue-100 rounded-lg shadow-md text-blue-800"
            >
              {course}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
