import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "../../../../../../../../node_modules/next/link";

function SubmissionViewerInternal(props) {
  const router = props.router;
  const [submission, setSubmission] = useState([]);
  const [codeLines, setCodeLines] = useState([]);

  const getSubmission = (submissionId) => {
    if (!submissionId) return;
    axios
      .post(
        `/api/participant/submissions/?type=single`,
        {
          submission_id: submissionId,
        }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res.submission);
        setSubmission(res.submission);
        setCodeLines(String(res?.submission?.code).split("\n"));
      });

  };

  useEffect(() => {
    getSubmission(router.query.submission_id);
  }, [router.query.submission_id]);

  useEffect(() => { }, [submission]);

  return (
    <div className="submission-viewer w-full h-fit flex flex-col gap-2">
      <div className="flex gap-2">
        <span title="Verdict: Accepted" className={"font-semibold " + (submission?.verdict == "Accepted" ? "text-green-500" : "text-red-500")}>
          {submission?.verdict}
        </span>
        <span className="ml-auto font-semibold text-blue-500 bg-blue-100 rounded-full px-3 w-fit">
          <Link href={`/participant/events/${submission?.event_id}`}>
            #{submission?.event_title}
          </Link>
        </span>
        <span className="font-semibold text-green-500 bg-green-100 rounded-full px-3 w-fit">
          <Link href={`/participant/events/${submission?.event_id}/problems/${submission?.problem_id}`}>
            @{submission?.problem_title}
          </Link>
        </span>
      </div>
      <div className="code-viewer flex-1 whitespace-pre font-mono border border-solid border-slate-300 rounded-xl">
        {codeLines.map((line, index) => {
          return (
            <div className="code-line flex gap-2" key={index}>
              <span className="bg-slate-200 px-2">{String(index + 1).padStart(Math.log10(codeLines.length) + 2, ' ')}</span>
              <span>{line}</span>
            </div>
          )

        })}
      </div>
    </div>);
}

export default function SubmissionViewer({ setNotification }) {
  const router = useRouter();
  return (
    <Layout setNotification={setNotification} page="events" title={`Submission #${router.query.submission_id}`}>
      <SubmissionViewerInternal setNotification={setNotification} router={router} />
    </Layout>
  );
}
