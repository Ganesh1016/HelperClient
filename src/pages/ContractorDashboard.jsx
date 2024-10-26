import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  Users,
  HardHat,
  Calendar,
  AlertCircle,
  TrendingUp,
  Clock,
  Building2,
  Phone,
} from "lucide-react";

const ContractorDashboard = () => {
  const [ongoingProjects, setOngoingProjects] = useState([
    {
      id: 1,
      title: "Metro Station Construction",
      location: "Sector 18, Noida",
      status: "In Progress",
      startDate: "2024-09-10",
      endDate: "2024-12-15",
      workforce: {
        skilled: 15,
        unskilled: 40,
        supervisors: 3,
      },
      urgentNeeds: "5 Skilled Masons",
      completion: 45,
    },
    {
      id: 2,
      title: "Mall Construction",
      location: "Whitefield, Bangalore",
      status: "Starting Soon",
      startDate: "2024-11-01",
      endDate: "2025-01-20",
      workforce: {
        skilled: 8,
        unskilled: 25,
        supervisors: 2,
      },
      urgentNeeds: "10 General Workers",
      completion: 0,
    },
  ]);

  const [openNewJobModal, setOpenNewJobModal] = useState(false);
  const [activeTab, setActiveTab] = useState("ongoing");
  const [openEmergencyModal, setOpenEmergencyModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Typography variant="h4" className="text-gray-900 font-bold">
            Site Manager Dashboard
          </Typography>
          <Typography color="gray" className="text-sm">
            Welcome back, Ganesh Gajelly | Last updated:{" "}
            {new Date().toLocaleTimeString()}
          </Typography>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 flex-1 md:flex-none"
            onClick={() => setOpenNewJobModal(true)}
          >
            <Users className="h-4 w-4" />
            Post New Requirement
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardBody className="flex items-center gap-4">
            <div className="rounded-full bg-blue-50 p-3">
              <HardHat className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Total Workforce
              </Typography>
              <Typography variant="h4" color="gray">
                93
              </Typography>
              <Typography className="text-sm text-gray-600">
                Active on sites
              </Typography>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardBody className="flex items-center gap-4">
            <div className="rounded-full bg-green-50 p-3">
              <Building2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Active Sites
              </Typography>
              <Typography variant="h4" color="gray">
                2
              </Typography>
              <Typography className="text-sm text-gray-600">
                In progress
              </Typography>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardBody className="flex items-center gap-4">
            <div className="rounded-full bg-orange-50 p-3">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Urgent Needs
              </Typography>
              <Typography variant="h4" color="gray">
                15
              </Typography>
              <Typography className="text-sm text-gray-600">
                Positions to fill
              </Typography>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardBody className="flex items-center gap-4">
            <div className="rounded-full bg-purple-50 p-3">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Monthly Budget
              </Typography>
              <Typography variant="h4" color="gray">
                ₹8.5L
              </Typography>
              <Typography className="text-sm text-gray-600">
                Labor costs
              </Typography>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Project Cards */}
      <div className="mb-8">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Active Construction Sites
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ongoingProjects.map((project) => (
            <Card
              key={project.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardBody>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                      {project.title}
                    </Typography>
                    <Typography className="text-sm text-gray-600 flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {project.location}
                    </Typography>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "In Progress"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Typography className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Start: {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      End: {new Date(project.endDate).toLocaleDateString()}
                    </Typography>
                  </div>

                  <div className="space-y-2">
                    <Typography className="text-sm font-medium">
                      Workforce Distribution:
                    </Typography>
                    <div className="text-sm text-gray-600">
                      <div>Skilled: {project.workforce.skilled}</div>
                      <div>Unskilled: {project.workforce.unskilled}</div>
                      <div>Supervisors: {project.workforce.supervisors}</div>
                    </div>
                  </div>
                </div>

                {project.urgentNeeds && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                    <Typography className="text-sm text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Urgent Need: {project.urgentNeeds}
                    </Typography>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-4">
                    <Typography className="text-sm text-gray-600 mb-1">
                      Project Completion: {project.completion}%
                    </Typography>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button variant="outlined" size="sm">
                    Manage Site
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* New Job Modal */}
      <Dialog
        size="lg"
        open={openNewJobModal}
        handler={() => setOpenNewJobModal(false)}
      >
        <DialogHeader>Post New Labor Requirement</DialogHeader>
        <form>
          <DialogBody divider className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Project Name"
                placeholder="Enter project name"
                required
              />
              <Input
                label="Location"
                placeholder="Enter site location"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Worker Type" required>
                <Option value="skilled">Skilled Labor</Option>
                <Option value="unskilled">Unskilled Labor</Option>
                <Option value="supervisor">Supervisor</Option>
              </Select>

              <Input type="number" label="Number Required" required />

              <Input type="number" label="Daily Wage (₹)" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="date" label="Start Date" required />
              <Input type="date" label="End Date" required />
            </div>

            <Select label="Shift Timing" required>
              <Option value="day">Day (8 AM - 5 PM)</Option>
              <Option value="night">Night (8 PM - 5 AM)</Option>
              <Option value="custom">Custom Shift</Option>
            </Select>

            <Textarea
              label="Job Description"
              placeholder="Enter work details, requirements, and any additional information..."
            />

            <div className="space-y-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Facilities Provided
              </Typography>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  Transportation
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  Accommodation
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  Food
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox" />
                  Safety Equipment
                </label>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" onClick={() => setOpenNewJobModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Post Requirement</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default ContractorDashboard;
