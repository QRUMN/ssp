import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  Mail,
  Phone,
  Globe,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Button } from '../../components/ui/Button';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'rejected';
  icon: React.ElementType;
  required: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
}

const verificationSteps: VerificationStep[] = [
  {
    id: '1',
    title: 'Basic Information',
    description: 'Organization details and contact information',
    status: 'completed',
    icon: Building2,
    required: true
  },
  {
    id: '2',
    title: 'Document Verification',
    description: 'Legal documents and certificates',
    status: 'pending',
    icon: FileText,
    required: true
  },
  {
    id: '3',
    title: 'Contact Verification',
    description: 'Email and phone verification',
    status: 'pending',
    icon: Mail,
    required: true
  },
  {
    id: '4',
    title: 'Website Verification',
    description: 'Website ownership verification',
    status: 'pending',
    icon: Globe,
    required: false
  }
];

const requiredDocuments = [
  {
    id: '1',
    name: 'Business Registration',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-12-20'
  },
  {
    id: '2',
    name: 'Tax Certificate',
    type: 'PDF',
    status: 'pending',
    uploadDate: '2023-12-21'
  },
  {
    id: '3',
    name: 'Organization Charter',
    type: 'PDF',
    status: 'rejected',
    uploadDate: '2023-12-22'
  }
];

export function OrganizationVerification() {
  const [activeStep, setActiveStep] = useState('1');
  const [documents, setDocuments] = useState<Document[]>(requiredDocuments);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Organization Verification</h1>
          <p className="text-ink/60">
            Review and verify organization details and documents
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Verification Progress</h2>
            <span className="text-sm text-ink/60">2 of 4 steps completed</span>
          </div>
          <div className="w-full bg-ink/10 rounded-full h-2 mb-6">
            <div
              className="bg-teal h-2 rounded-full"
              style={{ width: '50%' }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-ink/60">Organization Name</span>
              <p className="font-medium">Cultural Arts Center</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-ink/60">Submission Date</span>
              <p className="font-medium">Dec 20, 2023</p>
            </div>
          </div>
        </div>

        {/* Verification Steps */}
        <div className="space-y-4 mb-8">
          {verificationSteps.map((step) => {
            const StatusIcon = getStatusIcon(step.status);
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  p-6 rounded-xl border transition-colors cursor-pointer
                  ${
                    activeStep === step.id
                      ? 'bg-teal/5 border-teal'
                      : 'bg-paper/5 border-ink/10 hover:border-ink/20'
                  }
                `}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-paper/10">
                      <step.icon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {step.title}
                        {step.required && (
                          <span className="ml-2 text-xs text-red-500">Required</span>
                        )}
                      </h3>
                      <p className="text-sm text-ink/60 mt-1">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`flex items-center ${getStatusColor(step.status)}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                    </span>
                    <ChevronRight className="w-5 h-5 text-ink/40" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Document Upload Section */}
        <div className="bg-paper/5 border border-ink/10 rounded-xl p-6">
          <h2 className="font-medium mb-4">Required Documents</h2>
          <div className="space-y-4">
            {documents.map((doc) => {
              const StatusIcon = getStatusIcon(doc.status);
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-paper/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-paper/20">
                      <FileText className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-ink/60">
                        Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`flex items-center ${getStatusColor(doc.status)}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">
            Request Changes
          </Button>
          <Button>
            Approve Organization
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
