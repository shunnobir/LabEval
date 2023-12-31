import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "../../../node_modules/next/router";
import Table from "@/components/Table";
import axios from "../../../node_modules/axios/index";

function SubmissionsBody(props) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const getSubmissions = () => {
    axios
      .post(
        `/api/participant/submissions/?type=all`,
        {
          user_id: JSON.parse(sessionStorage.getItem('user')).user_id,
        }
      )
      .then((res) => res.data)
      .then((res) => {
        setSubmissions(res.submissions);
      });

  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div className="border border-solid border-slate-300 border-b-0 rounded-t-xl flex flex-col">
      <span className="text-xl font-semibold text-blue-600 bg-slate-100 px-4 py-2 border-b border-solid border-slate-300 rounded-t-xl"> Submissions </span>
      <Table
        heads={[
          { content: "Submission" },
          { content: "When" },
          { content: "Problem" },
          { content: "Points" },
          { content: "Language" },
          { content: "Verdict" },
          { content: "Time" },
          { content: "Memory" },
        ]}
        className="h-full w-full"
        style={{ marginBottom: "0" }}
        empty={submissions?.length === 0}
      >
        {submissions.map((submission, index) => {
          let time = new Date(submission.submission_time);
          return (<tr key={index}>
            <td className="text-blue-500 font-semibold cursor-pointer" onClick={() => router.push(`/participant/events/${submission.event_id}/problems/${submission.problem_id}/submission/${submission.submission_id}`)}> {submission.submission_id} </td>
            <td> {`${time.getDay().toString().padStart(2, 0)}/${time.getMonth().toString().padStart(2, 0)}/${time.getFullYear()} ${time.getHours().toString().padStart(2, 0)}:${time.getMinutes().toString().padStart(2, 0)}:${time.getSeconds().toString().padStart(2, 0)}`} </td>
            <td className="font-semibold text-blue-600 cursor-pointer" onClick={() => router.push(`/participant/events/${submission.event_id}/problems/${submission.problem_id}`)}> {submission.title} </td>
            <td> {submission.points} </td>
            <td> {submission.language} </td>
            <td className={"font-semibold " + (submission.verdict === "Accepted" ? "text-green-600" : "text-red-500")}> {submission.verdict === "Accepted" ? "Accepted" : "Wrong Answer"} </td>
            <td> {submission.time} ms </td>
            <td> {submission.memory} KB </td>
          </tr>);
        })}
      </Table>
    </div>

  );
}

export default function Submissions(props) {
  return (
    <div className="instructor-submissions animate-opacity">
      <Layout page={"submissions"} title="Submissions" {...props}>
        <SubmissionsBody />
      </Layout>
    </div>
  );
}
