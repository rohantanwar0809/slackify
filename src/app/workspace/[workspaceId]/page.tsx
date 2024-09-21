"use client";

import { useParams } from "next/navigation";

const WorkspaceIdPage = () => {
  const { workspaceId } = useParams();
  return <div>Workspace ID: {workspaceId}</div>;
};

export default WorkspaceIdPage;
