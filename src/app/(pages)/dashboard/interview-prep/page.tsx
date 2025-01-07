"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import clsx from "clsx";

interface Question {
  id: number;
  question: string;
  answer: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface Role {
  role: string;
  questions: Question[];
}

const rolesWithQuestions: Role[] = [
  {
    role: "Frontend Developer",
    questions: [
      {
        id: 1,
        question: "Tell me about yourself.",
        answer: "Describe your background and experience briefly.",
        level: "Beginner",
      },
      {
        id: 2,
        question: "Why do you want this job?",
        answer: "Align your skills and career goals with the role.",
        level: "Beginner",
      },
      {
        id: 3,
        question: "What is React?",
        answer: "React is a library for building UIs.",
        level: "Intermediate",
      },
      {
        id: 4,
        question: "What are React Hooks?",
        answer: "Hooks are functions for state and lifecycle.",
        level: "Advanced",
      },
      {
        id: 5,
        question: "What is JSX?",
        answer:
          "JSX is a syntax extension for JavaScript, often used with React.",
        level: "Beginner",
      },
      {
        id: 6,
        question: "Explain the Virtual DOM.",
        answer:
          "The Virtual DOM is an in-memory representation of the actual DOM elements.",
        level: "Intermediate",
      },
      {
        id: 7,
        question: "What is the difference between props and state?",
        answer:
          "Props are immutable, passed from parent to child, while state is mutable and managed within a component.",
        level: "Intermediate",
      },
      {
        id: 8,
        question: "What are controlled and uncontrolled components?",
        answer:
          "A controlled component has its value controlled by React, while an uncontrolled component manages its value independently.",
        level: "Intermediate",
      },
      {
        id: 9,
        question: "How do you optimize performance in React?",
        answer:
          "You can optimize performance using techniques like memoization, lazy loading, and pure components.",
        level: "Advanced",
      },
      {
        id: 10,
        question: "Explain Redux and how it's used in React.",
        answer:
          "Redux is a state management library for React that provides a centralized store and predictable state flow.",
        level: "Advanced",
      },
    ],
  },
  {
    role: "Backend Developer",
    questions: [
      {
        id: 11,
        question: "Tell us about a challenging project.",
        answer: "Describe the project and your problem-solving approach.",
        level: "Intermediate",
      },
      {
        id: 12,
        question: "Where do you see yourself in 5 years?",
        answer: "Discuss your career goals and aspirations.",
        level: "Beginner",
      },
      {
        id: 13,
        question: "What is REST API?",
        answer: "REST is a stateless architecture for APIs.",
        level: "Intermediate",
      },
      {
        id: 14,
        question: "What is Node.js?",
        answer: "Node.js is a runtime for executing JavaScript on the server.",
        level: "Advanced",
      },
      {
        id: 15,
        question: "What is the difference between SQL and NoSQL?",
        answer:
          "SQL databases are relational, while NoSQL databases are non-relational and often more scalable.",
        level: "Beginner",
      },
      {
        id: 16,
        question: "What is middleware in Node.js?",
        answer:
          "Middleware functions in Node.js are used to process requests before they reach the final handler.",
        level: "Intermediate",
      },
      {
        id: 17,
        question: "Explain JWT (JSON Web Token).",
        answer:
          "JWT is a compact, URL-safe means of representing claims to be transferred between two parties.",
        level: "Advanced",
      },
      {
        id: 18,
        question: "How do you handle error management in Node.js?",
        answer:
          "Error handling in Node.js is typically done with try-catch blocks, or using a custom error-handling middleware.",
        level: "Intermediate",
      },
      {
        id: 19,
        question: "Explain the concept of callbacks and promises.",
        answer:
          "Callbacks are functions passed into other functions, while promises represent the completion (or failure) of an asynchronous operation.",
        level: "Intermediate",
      },
      {
        id: 20,
        question: "What is the event loop in Node.js?",
        answer:
          "The event loop is responsible for executing code, collecting and processing events, and executing queued sub-tasks in Node.js.",
        level: "Advanced",
      },
    ],
  },
  {
    role: "Full Stack Developer",
    questions: [
      {
        id: 21,
        question:
          "What is the difference between a full stack and a frontend or backend developer?",
        answer:
          "A full stack developer works on both the frontend and backend of a web application, while frontend and backend developers specialize in one area.",
        level: "Beginner",
      },
      {
        id: 22,
        question: "What are some advantages of using a full stack framework?",
        answer:
          "Full stack frameworks provide integrated tools and libraries for both frontend and backend development, improving productivity and consistency.",
        level: "Intermediate",
      },
      {
        id: 23,
        question: "What is the MEAN stack?",
        answer:
          "The MEAN stack is a JavaScript-based stack used for building dynamic web applications, consisting of MongoDB, Express.js, Angular, and Node.js.",
        level: "Intermediate",
      },
      {
        id: 24,
        question: "What is a microservice architecture?",
        answer:
          "Microservice architecture involves building applications as a set of small, independently deployable services, each responsible for a specific task.",
        level: "Advanced",
      },
      {
        id: 25,
        question:
          "How do you handle version control in full stack development?",
        answer:
          "Version control is typically managed with Git and GitHub, allowing developers to collaborate and track changes to both frontend and backend code.",
        level: "Intermediate",
      },
      {
        id: 26,
        question: "What is Cross-Origin Resource Sharing (CORS)?",
        answer:
          "CORS is a mechanism that allows restricted resources on a web server to be requested from a domain outside the domain from which the resource originated.",
        level: "Intermediate",
      },
      {
        id: 27,
        question: "How do you manage state in a full stack application?",
        answer:
          "State in a full stack app is often managed using global state management tools like Redux or context API, and can also be managed server-side.",
        level: "Intermediate",
      },
      {
        id: 28,
        question: "What are WebSockets?",
        answer:
          "WebSockets are a protocol for full-duplex communication channels over a single TCP connection, often used for real-time applications.",
        level: "Advanced",
      },
      {
        id: 29,
        question: "What is GraphQL?",
        answer:
          "GraphQL is a query language for APIs that allows clients to request exactly the data they need, and nothing more.",
        level: "Advanced",
      },
      {
        id: 30,
        question: "What is Docker, and how is it used in development?",
        answer:
          "Docker is a platform that allows developers to package applications and dependencies into containers, ensuring consistency across environments.",
        level: "Advanced",
      },
    ],
  },
  {
    role: "Data Scientist",
    questions: [
      {
        id: 31,
        question:
          "What is the difference between supervised and unsupervised learning?",
        answer:
          "Supervised learning uses labeled data for training models, while unsupervised learning works with unlabeled data to find hidden patterns.",
        level: "Beginner",
      },
      {
        id: 32,
        question: "What are decision trees?",
        answer:
          "A decision tree is a machine learning algorithm used for classification and regression, based on a tree-like model of decisions.",
        level: "Intermediate",
      },
      {
        id: 33,
        question: "What is cross-validation?",
        answer:
          "Cross-validation is a technique used to assess the performance of a model by dividing data into subsets for training and testing.",
        level: "Intermediate",
      },
      {
        id: 34,
        question: "Explain the concept of overfitting in machine learning.",
        answer:
          "Overfitting occurs when a model learns the details and noise in the training data to the extent that it negatively impacts performance on new data.",
        level: "Intermediate",
      },
      {
        id: 35,
        question: "What is feature engineering?",
        answer:
          "Feature engineering is the process of selecting, modifying, or creating new features from raw data to improve the performance of machine learning models.",
        level: "Intermediate",
      },
      {
        id: 36,
        question: "What is PCA (Principal Component Analysis)?",
        answer:
          "PCA is a dimensionality reduction technique used to reduce the number of variables while retaining most of the variance in the data.",
        level: "Advanced",
      },
      {
        id: 37,
        question: "What is the bias-variance tradeoff?",
        answer:
          "The bias-variance tradeoff refers to the balance between a model's ability to generalize (bias) and its complexity (variance).",
        level: "Advanced",
      },
      {
        id: 38,
        question:
          "What are the different types of machine learning algorithms?",
        answer:
          "The main types of machine learning algorithms are supervised, unsupervised, semi-supervised, and reinforcement learning.",
        level: "Beginner",
      },
      {
        id: 39,
        question: "What is deep learning?",
        answer:
          "Deep learning is a subset of machine learning involving neural networks with multiple layers to model high-level abstractions in data.",
        level: "Advanced",
      },
      {
        id: 40,
        question: "What is the difference between bagging and boosting?",
        answer:
          "Bagging reduces variance by training multiple models independently and combining their predictions, while boosting reduces bias by sequentially training models that focus on errors made by previous models.",
        level: "Advanced",
      },
    ],
  },
  {
    role: "DevOps Engineer",
    questions: [
      {
        id: 41,
        question: "What is continuous integration (CI)?",
        answer:
          "Continuous integration is a software development practice where code changes are automatically built, tested, and integrated into the main branch frequently.",
        level: "Beginner",
      },
      {
        id: 42,
        question: "What is continuous delivery (CD)?",
        answer:
          "Continuous delivery is the practice of automatically deploying code to production after passing through the CI pipeline.",
        level: "Intermediate",
      },
      {
        id: 43,
        question: "What is Docker used for in DevOps?",
        answer:
          "Docker is used to create containers that encapsulate applications and their dependencies, enabling consistent and scalable deployments across environments.",
        level: "Intermediate",
      },
      {
        id: 44,
        question: "What is Kubernetes?",
        answer:
          "Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.",
        level: "Advanced",
      },
      {
        id: 45,
        question: "What is Infrastructure as Code (IaC)?",
        answer:
          "IaC is the practice of managing and provisioning computing infrastructure using machine-readable configuration files rather than manual processes.",
        level: "Advanced",
      },
      {
        id: 46,
        question: "Explain the concept of load balancing.",
        answer:
          "Load balancing is the process of distributing incoming network traffic across multiple servers to ensure no single server is overwhelmed.",
        level: "Intermediate",
      },
      {
        id: 47,
        question: "What is monitoring in a DevOps environment?",
        answer:
          "Monitoring involves tracking the performance and health of systems to ensure they are operating efficiently and to identify issues before they affect users.",
        level: "Intermediate",
      },
      {
        id: 48,
        question:
          "What are the benefits of using a microservices architecture in DevOps?",
        answer:
          "Microservices provide flexibility, scalability, and faster deployments by breaking down an application into smaller, independently deployable services.",
        level: "Advanced",
      },
      {
        id: 49,
        question: "What is version control, and why is it important?",
        answer:
          "Version control is the process of managing changes to source code, enabling teams to collaborate and track code modifications efficiently.",
        level: "Beginner",
      },
      {
        id: 50,
        question: "What are the most common tools used in DevOps?",
        answer:
          "Common DevOps tools include Jenkins, Docker, Kubernetes, Git, Ansible, and Terraform.",
        level: "Advanced",
      },
    ],
  },
];

const InterviewPreparation: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>("All");
  const [showQuestions, setShowQuestions] = useState(false);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    setShowQuestions(false); // Hide questions when changing the role
  };

  const handleLevelSelection = (level: string) => {
    setSelectedLevel(level);
    setShowQuestions(true); // Show questions when level is selected
  };

  const filteredQuestions = selectedRole
    ? rolesWithQuestions
        .find((role) => role.role === selectedRole)
        ?.questions.filter(
          (q) => selectedLevel === "All" || q.level === selectedLevel
        ) || []
    : [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation</h1>

      <div className="grid grid-cols-2 gap-3 md:max-w-xl">
        {/* Step 1: Select Role */}

        <div className="mb-6">
          <Select onValueChange={handleRoleSelection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select job role" />
            </SelectTrigger>
            <SelectContent>
              {rolesWithQuestions.map((role) => (
                <SelectItem key={role.role} value={role.role}>
                  {role.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 2: Select Experience Level */}
        <div className="mb-6">
          <Select onValueChange={handleLevelSelection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Step 3: Display Questions based on Role and Level */}
      {showQuestions && selectedRole && filteredQuestions.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedRole} - {selectedLevel} Level Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {filteredQuestions.map((question) => (
              <AccordionItem
                key={question.id}
                value={`question-${question.id}`}
                className="border rounded-lg"
              >
                <AccordionTrigger className="p-4 text-left w-full">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-gray-50">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : showQuestions ? (
        <p className="text-gray-500 mt-4">
          No questions found for this role and experience level.
        </p>
      ) : (
        <p className="text-gray-500 mt-4">
          Please select a job role and experience level to see the questions.
        </p>
      )}
    </div>
  );
};

export default InterviewPreparation;
