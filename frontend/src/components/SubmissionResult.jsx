import React from "react";

function SubmissionResult({ lead }) {
  if (!lead) return null;

  return (
    <div className="text-left text-sm text-gray-200 mt-6">
      <h3 className="text-xl font-bold mb-2 text-green-400">Lead Details:</h3>
      <ul className="space-y-1">
        <li>
          <strong>Command:</strong> CreateLead
        </li>
        <li>
          <strong>Name:</strong> {lead.name}
        </li>
        <li>
          <strong>Source:</strong> {lead.source}
        </li>
        <li>
          <strong>Email:</strong> {lead.email || "N/A"}
        </li>
        <li>
          <strong>Phone:</strong> {lead.phone || "N/A"}
        </li>
        {lead.interestedProducts?.length > 0 && (
          <li>
            <strong>Interested Products:</strong>{" "}
            {lead.interestedProducts.join(", ")}
          </li>
        )}
        <li>
          <strong>Status:</strong> {lead.status}
        </li>
        <li>
          <strong>Notes:</strong> {lead.notes}
        </li>
      </ul>
    </div>
  );
}

export default SubmissionResult;
