import Layout from "@/components/Layout";
import { useRouter } from "../../../../../../../../node_modules/next/router";

function SubmissionViewerInternal(props) {
  return (
    <div className="submission-viewer w-full h-full border border-solid border-blue-600">

    </div>);
}

export default function SubmissionViewer({ setNotification }) {
  const router = useRouter();
  return (
    <Layout setNotification={setNotification} page="events" title={`Submission #${router.query.submission_id}`}>
      <SubmissionViewerInternal setNotification={setNotification} router={router}/>
    </Layout>
  );
}
