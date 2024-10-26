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
} from "@material-tailwind/react";
import {
  Briefcase,
  User,
  Calendar,
  Phone,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ContractApplicants = () => {
  // Dummy project and applicant data
  const projects = [
    {
      id: 1,
      title: "Metro Station Construction",
      location: "Sector 18, Noida",
      applicants: [
        {
          name: "Ravi Kumar",
          experience: "5 years",
          contact: "+91 9876543210",
          appliedDate: "2024-10-25",
          role: "Skilled Mason",
        },
        {
          name: "Sita Devi",
          experience: "2 years",
          contact: "+91 9876543211",
          appliedDate: "2024-10-20",
          role: "General Worker",
        },
      ],
    },
    {
      id: 2,
      title: "Mall Construction",
      location: "Whitefield, Bangalore",
      applicants: [
        {
          name: "Amit Sharma",
          experience: "4 years",
          contact: "+91 9876543212",
          appliedDate: "2024-10-18",
          role: "Supervisor",
        },
      ],
    },
  ];

  const [openApplicantModal, setOpenApplicantModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const handleOpenApplicantModal = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenApplicantModal(true);
  };

  const toggleProject = (projectId) => {
    setExpandedProjectId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 overflow-y-scroll">
      {/* Header */}
      <Typography
        variant="h4"
        className="text-gray-900 font-bold mb-6 font-poppins"
      >
        Applicants by Project
      </Typography>

      {/* Project List */}
      {projects.map((project) => (
        <div key={project.id} className="mb-8 font-poppins">
          <Card className="shadow-lg transition-shadow rounded-lg border border-gray-200">
            <CardBody
              className="flex justify-between items-center cursor-pointer p-6 bg-gray-100 rounded-t-lg"
              onClick={() => toggleProject(project.id)}
            >
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {project.title}
                </Typography>
                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Briefcase className="h-4 w-4" />
                  Location: {project.location}
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {expandedProjectId === project.id
                    ? "Hide Applicants"
                    : "View Applicants"}
                </Typography>
                {expandedProjectId === project.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardBody>

            {/* Applicant Cards (visible only if project is expanded) */}
            {expandedProjectId === project.id && (
              <div className="space-y-4 mt-4 px-6 pb-6">
                {project.applicants.map((applicant, index) => (
                  <Card
                    key={index}
                    className="shadow-md border border-gray-200 rounded-lg"
                  >
                    <CardBody className="flex justify-between items-start bg-white p-4 rounded-lg">
                      <div>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-medium mb-1"
                        >
                          {applicant.name}
                        </Typography>
                        <Typography className="text-sm text-gray-600">
                          Role:{" "}
                          <span className="font-medium">{applicant.role}</span>
                        </Typography>
                        <Typography className="text-sm text-gray-600">
                          Experience:{" "}
                          <span className="font-medium">
                            {applicant.experience}
                          </span>
                        </Typography>
                        <Typography className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          Applied on:{" "}
                          {new Date(applicant.appliedDate).toLocaleDateString(
                            "en-IN"
                          )}
                        </Typography>
                      </div>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="blue"
                        onClick={() => handleOpenApplicantModal(applicant)}
                        className="border border-blue-500 text-blue-500"
                      >
                        View Details
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      ))}

      {/* Applicant Detail Modal */}
      <Dialog
        open={openApplicantModal}
        handler={() => setOpenApplicantModal(false)}
        className="sm:max-w-md"
      >
        {selectedApplicant && (
          <>
            <DialogHeader>Applicant Details</DialogHeader>
            <DialogBody divider>
              <div className="space-y-4">
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {selectedApplicant.name}
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    <span className="font-semibold">Role:</span>{" "}
                    {selectedApplicant.role}
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    <span className="font-semibold">Experience:</span>{" "}
                    {selectedApplicant.experience}
                  </Typography>
                  <Typography className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">Contact:</span>{" "}
                    {selectedApplicant.contact}
                  </Typography>
                </div>
                <Typography className="text-sm text-gray-600">
                  <Calendar className="h-4 w-4 inline-block mr-2" />
                  Applied on:{" "}
                  {new Date(selectedApplicant.appliedDate).toLocaleDateString(
                    "en-IN"
                  )}
                </Typography>
              </div>
            </DialogBody>
            <DialogFooter className=" flex flex-row gap-4">
              <Button
                variant="outlined"
                color="green"
                className="flex items-center gap-2"
                size="sm"
              >
                <Check className="h-4 w-4" />
                Accept
              </Button>
              <Button
                variant="outlined"
                color="red"
                className="flex items-center gap-2"
                size="sm"
                onClick={() => setOpenApplicantModal(false)}
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ContractApplicants;
