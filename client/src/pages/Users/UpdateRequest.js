import React from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateRequest() {
  const { requestId } = useParams();
  console.log(requestId);
  return <div>Update Request</div>;
}
