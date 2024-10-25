import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Cleaning Request", dueDate: "2024-11-01" },
    { id: 2, title: "Maintenance Job", dueDate: "2024-11-05" },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", content: "Can we reschedule?" },
    { id: 2, sender: "Anna Smith", content: "Is the job confirmed?" },
  ]);

  return (
    <div className="flex flex-col p-4 space-y-2 bg-[#f7f7f7] min-h-screen">
      {/* Welcome Section */}
      <div className="bg-primary text-white p-4 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold">Welcome, Service Provider</h1>
        <p className="text-sm mt-2">
          Here’s a quick overview of your activities.
        </p>
      </div>

      {/* Tasks Section */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-darkPrimary">Your Tasks</h2>
          <Link to="/tasks" className="text-primary text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-[#f1f1f1] rounded-lg flex justify-between items-center"
            >
              <span className="text-darkPrimary">{task.title}</span>
              <span className="text-sm text-gray-600">{task.dueDate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Section */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-darkPrimary">Messages</h2>
          <Link to="/messages" className="text-primary text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className="p-3 bg-[#f1f1f1] rounded-lg flex justify-between items-center"
            >
              <span className="text-darkPrimary">{message.sender}</span>
              <p className="text-sm text-gray-600 truncate">
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-darkPrimary">
            Notifications
          </h2>
          <Link
            to="/notifications"
            className="text-primary text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-[#f1f1f1] rounded-lg text-sm text-gray-600">
            <p>New job request received for cleaning service.</p>
          </div>
          <div className="p-3 bg-[#f1f1f1] rounded-lg text-sm text-gray-600">
            <p>Reminder: Upcoming maintenance job on 2024-11-05.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
