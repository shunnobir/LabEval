import Layout from "@/components/Layout";
import MdEditor from "@/components/markdown/MdEditor";
import { labevalMarkdownParser } from "@/components/markdown/mdParser";
import Table from "@/components/Table";
import {
  BackButton,
  CancelIcon,
  ClockIcon,
  DeleteIcon,
  EditIcon,
  FileAddIcon,
  ProblemCreateIcon,
  ProblemCreateYesIcon,
  ShortTextIcon,
} from "@/icons";
import { random_string } from "@/utility";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CreateTestcase({ setShow, setNotification, testcases, setTestcases }) {
  const [inputFile, setInputFile] = useState("");
  const [outputFile, setOutputFile] = useState("");
  const [isSample, setIsSample] = useState(false);

  const handleInputFile = (file) => {
    setInputFile(file);
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      setInputFile((prev) => {
        let n = prev;
        n.content = fr.result;
        return n;
      });
    });
    fr.readAsText(file);
  };

  const handleOutputFile = (file) => {
    setOutputFile(file);
    let fr = new FileReader();
    fr.addEventListener("load", () => {
      setOutputFile((prev) => {
        let n = prev;
        n.content = fr.result;
        return n;
      });
    });
    fr.readAsText(file);
  };

  const handleAddTestcase = () => {
    if (!inputFile || !outputFile) {
      setNotification({
        header: "No file was selected",
        body: [
          <span key={0}>
            {" "}
            Both input and output files should be selected.{" "}
          </span>,
        ],
        interval: 3000,
        type: "error",
        save: false,
        render: true,
        page: "/instructor/events",
      });
      return;
    }

    setTestcases((prev) => {
      let n = [
        ...prev,
        {
          input_file: inputFile.name,
          output_file: outputFile.name,
          input_size: inputFile.size,
          output_size: outputFile.size,
          input_content: inputFile.content,
          output_content: outputFile.content,
          is_sample: isSample,
        },
      ];
      return n;
    });
    setInputFile(undefined);
    setOutputFile(undefined);
    setIsSample(false);
    document.querySelector(".input-file").value = "";
    document.querySelector(".output-file").value = "";
  };

  const handleDelete = (index) => {
    setTestcases((prev) => {
      let n = prev.filter((_, ind) => ind !== index);
      return n;
    });
  };

  return (
    <div className="add-testcase px-[10%] py-4 flex flex-col gap-4">
      <button
        className="w-8 h-8 bg-blue-500 flex flex-row items-center justify-center rounded-full cursor-pointer hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] duration-[350ms]"
        title="Go back"
        onClick={() => setShow(false)}
      >
        <BackButton height="20" width="20" color="#f8fafc" />
      </button>
      <div className="test-cases-list">
        <Table
          heads={[
            {
              content: "No",
              className: "w-[5%]",
              style: { textAlign: "center" },
            },
            { content: "File Name", className: "w-[70%]" },
            { content: "Size", className: "" },
            {
              content: "Sample",
              className: "w-[5%]",
              style: { textAlign: "center" },
            },
            { content: "", className: "w-[5%]" },
          ]}
          className="w-full"
          empty={testcases.length === 0}
        >
          {testcases.map((testcase, index) => {
            return (
              <tr key={index} style={{ backgroundColor: "var(--slate-50)" }}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ padding: "0" }}>
                  <div className="flex flex-col">
                    <span className="px-4 py-2">{testcase.input_file}</span>
                    <span className="px-4 py-2 border-t border-solid border-slate-300 bg-slate-100">
                      {testcase.output_file}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "0" }}>
                  <div className="flex flex-col">
                    <span className="px-4 py-2">{testcase.input_size}</span>
                    <span className="px-4 py-2 border-t border-solid border-slate-300 bg-slate-100">
                      {testcase.output_size}
                    </span>
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  {testcase.is_sample ? "YES" : "NO"}
                </td>
                <td>
                  <div className="flex flex-row gap-2 w-full items-center justify-center">
                    <button
                      className="w-8 h-8 border border-solid border-slate-500 flex flex-row items-center justify-center rounded-full"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon width="20" height="20" color="#64748b" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
      <div className="test-case-add flex flex-row w-full gap-4">
        <div className="input-field flex flex-col gap-1">
          <label className="text-sm font-medium">
            Input file
            <span className="text-red-500"> * </span>
          </label>
          <div
            className={
              "input flex flex-row pl-2 pr-4 h-10 w-fit border border-solid border-slate-300 rounded-[5px] items-center" +
              (inputFile ? " bg-slate-500 text-slate-50" : "")
            }
          >
            <div
              className="file-remove-button"
              onClick={() => {
                let elem = document.querySelector(".input-file");
                if (inputFile) {
                  setInputFile(undefined);
                  elem.value = "";
                } else {
                  elem.click();
                }
              }}
            >
              {inputFile ? (
                <CancelIcon
                  heoght="16"
                  width="16"
                  color="#f8fafc"
                  className="cursor-pointer"
                />
              ) : (
                <FileAddIcon
                  height="24"
                  width="24"
                  color="#64748b"
                  className="cursor-pointer"
                />
              )}
            </div>
            <label
              className={
                "cursor-pointer pl-2" +
                (inputFile ? " text-slate-50" : " text-slate-400")
              }
            >
              <span>{inputFile ? inputFile?.name : "Choose a file"}</span>
              <input
                type="file"
                required={true}
                className="input-file h-10 border-0 bg-red-500 text-slate-50 hidden w-fit"
                accept=".in, .input, .txt, .text"
                onChange={(e) => {
                  handleInputFile(e.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
        <div className="input-field flex flex-col gap-1">
          <label className="text-sm font-medium">
            Output file
            <span className="text-red-500"> * </span>
          </label>
          <div
            className={
              "input flex flex-row pl-2 pr-4 h-10 w-fit border border-solid border-slate-300 rounded-[5px] items-center" +
              (outputFile ? " bg-slate-500 text-slate-50" : "")
            }
          >
            <div
              className="file-remove-button"
              onClick={() => {
                let elem = document.querySelector(".input-file");
                if (outputFile) {
                  setOutputFile(undefined);
                  elem.value = "";
                } else {
                  elem.click();
                }
              }}
            >
              {outputFile ? (
                <CancelIcon
                  heoght="16"
                  width="16"
                  color="#f8fafc"
                  className="cursor-pointer"
                />
              ) : (
                <FileAddIcon
                  height="24"
                  width="24"
                  color="#64748b"
                  className="cursor-pointer"
                />
              )}
            </div>
            <label
              className={
                "cursor-pointer pl-2" +
                (outputFile ? " text-slate-50" : " text-slate-400")
              }
            >
              <span>{outputFile ? outputFile?.name : "Choose a file"}</span>
              <input
                type="file"
                required={true}
                className="output-file h-10 border-0 bg-red-500 text-slate-50 hidden w-fit"
                accept=".out, .output, .txt, .text"
                onChange={(e) => {
                  handleOutputFile(e.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
        <div className="input-field flex flex-col gap-1 mt-auto">
          <div className="input flex flex-row px-4 h-10 w-full gap-2 border border-solid border-slate-300 rounded-[5px] items-center overflow-visible">
            {/* <ShortTextIcon height="28" width="28" color="#64748b" /> */}
            <input
              type="checkbox"
              pattern={/.+/}
              maxLength="80"
              size="80"
              required={true}
              placeholder="Problem Title"
              className="h-10 border-0"
              checked={isSample}
              onChange={() => {
                setIsSample(!isSample);
              }}
            />
            <label className="text-sm">Sample Testcase</label>
          </div>
        </div>
        <div className="input-field flex flex-col gap-1 ml-auto mt-auto">
          <div
            className="flex flex-row gap-2 items-center h-10 px-4 bg-blue-500 hover:bg-blue-600 text-slate-50 rounded-[5px] text-sm cursor-pointer"
            onClick={() => handleAddTestcase()}
          >
            <ProblemCreateYesIcon height="28" width="28" color="#f8fafc" />
            <span> Add Testcases </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateProblemPopup({ setShow, setNotification, reload, event_id }) {
  const [title, setTitle] = useState(
    sessionStorage.getItem("problem-title") || ""
  );
  const [problemRunTime, setProblemRunTime] = useState(
    sessionStorage.getItem("problem-time") || ""
  );
  const [points, setPoints] = useState(
    sessionStorage.getItem("problem-points") || ""
  );
  const [value, setValue] = useState(
    sessionStorage.getItem("problem-statement") || ""
  );
  const [showAddTestcase, setShowAddTestcase] = useState(false);
  const [testcases, setTestcases] = useState([]);

  const handleCreate = () => {
    let problem_id = random_string(20);
    axios
      .post(`/api/instructor/events/${event_id}/?type=create_problem`, {
        problem_id: problem_id,
        title: title,
        statement: value,
        points: Number(points),
        time_limit: Number(problemRunTime),
        event_id: event_id,
      })
      .then((res) => {
        if (res.data === "Successfully Created") {
          testcases.forEach((value) => {
            value.testcase_id = random_string(20);
            value.problem_id = problem_id;
            axios.post(
              `/api/instructor/events/${event_id}/?type=create_testcase`,
              value
            );
          });
        }
      });
    reload();
    setShow(false);
  };

  return (
    <div className="problem-popup w-screen h-screen fixed inset-0 bg-slate-50 rounded-[5px] flex flex-col overflow-y-auto">
      <div className="top flex flex-row bg-blue-500 h-16 justify-between items-center p-4 rounded-t-[ 5px] px-[10%]">
        <div className="left flex flex-row gap-4">
          <ProblemCreateIcon height="24" width="24" color="#f8fafc" />
          <span className="text-xl text-slate-50"> Create Problem </span>
        </div>
        <div className="right">
          <button
            className="close text-2xl text-slate-50 w-8 h-8 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] rounded-full"
            onClick={() => setShow(false)}
          >
            &times;
          </button>
        </div>
      </div>
      {!showAddTestcase ? (
        <div className="flex flex-col h-full w-full">
          <div className="middle flex flex-col gap-4 py-4 px-[10%] h-full mx-4">
            <div className="top flex flex-row gap-4 flex-wrap w-full">
              <div className="input-field flex flex-col gap-1 w-full">
                <label className="text-sm font-medium">
                  Problem Title
                  <span className="text-red-500"> * </span>
                </label>
                <div className="input flex flex-row px-2 h-10 w-full gap-1 border border-solid border-slate-300 rounded-[5px] items-center overflow-visible">
                  <ShortTextIcon height="28" width="28" color="#64748b" />
                  <input
                    type="text"
                    pattern={/.+/}
                    maxLength="65"
                    size="65"
                    required={true}
                    placeholder="Problem Title"
                    className="h-10 border-0"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      sessionStorage.setItem("problem-title", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="times flex flex-row gap-4 items-end w-full">
                <div className="input-field flex flex-col gap-1">
                  <label className="text-sm font-medium">
                    Time Limit Per Test Case (in seconds)
                    <span className="text-red-500"> * </span>
                  </label>
                  <div className="input flex flex-row px-2 h-10 w-full border border-solid border-slate-300 rounded-[5px] items-center">
                    <ShortTextIcon height="28" width="28" color="#64748b" />
                    <input
                      type="text"
                      pattern={/\d+/}
                      required={true}
                      placeholder="e.g. 2"
                      maxLength="3"
                      className="h-10 border-0"
                      value={problemRunTime}
                      onChange={(e) => {
                        setProblemRunTime(e.target.value);
                        sessionStorage.setItem("problem-time", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="input-field flex flex-col gap-1">
                  <label className="text-sm font-medium">
                    Points
                    <span className="text-red-500"> * </span>
                  </label>
                  <div className="input flex flex-row px-2 h-10 w-full border border-solid border-slate-300 rounded-[5px] items-center">
                    <ShortTextIcon height="28" width="28" color="#64748b" />
                    <input
                      type="text"
                      pattern={/\d+/}
                      required={true}
                      placeholder="e.g. 200"
                      maxLength="5"
                      className="h-10 border-0"
                      value={points}
                      onChange={(e) => {
                        setPoints(e.target.value);
                        sessionStorage.setItem(
                          "problem-points",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="input-field flex flex-col gap-1 ml-auto">
                  <div
                    className="flex flex-row gap-2 items-center h-10 px-4 bg-blue-500 hover:bg-blue-600 text-slate-50 rounded-[5px] text-sm cursor-pointer relative"
                    onClick={() => setShowAddTestcase(true)}
                  >
                    <ProblemCreateIcon height="24" width="24" color="#f8fafc" />
                    <span className="hidden lg:inline-block">
                      Add Testcases
                    </span>
                    <span className="absolute text-sm font-medium bg-green-600 rounded-full w-6 h-6 flex items-center justify-center right-0 top-[-25%] shadow-[0_0_0.5rem_rgba(0,0,0,0.2)] z-10" title={`${testcases.length} test(s) added`}>{testcases.length}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-field flex flex-col gap-1 h-full">
              <label className="text-sm font-medium">
                Problem Statement
                <span className="text-red-500"> * </span>
              </label>
              <MdEditor
                value={value}
                onChange={(value) => {
                  setValue(value);
                  sessionStorage.setItem("problem-statement", value);
                }}
              />
            </div>
          </div>
          <div className="bottom mx-4 mb-2 px-[10%] pb-4 flex flex-row gap-4 items-center justify-end">
            <div
              className="flex flex-row gap-2 items-center h-10 px-4 bg-blue-500 hover:bg-blue-600 text-slate-50 rounded-[5px] text-sm cursor-pointer"
              onClick={() => handleCreate()}
            >
              <ProblemCreateYesIcon height="24" width="24" color="#f8fafc" />
              <span> Create </span>
            </div>
            <div
              className="flex flex-row gap-2 items-center h-10 px-4 bg-slate-200 hover:bg-slate-300 rounded-[5px] text-sm cursor-pointer"
              onClick={() => setShow(false)}
            >
              <CancelIcon height="20" width="20" />
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <CreateTestcase
          setNotification={setNotification}
          setShow={setShowAddTestcase}
          testcases={testcases}
          setTestcases={setTestcases}
        />
      )}
    </div>
  );
}

export default function Event(props) {
  const [eventId, setEventId] = useState("");
  const [event, setEvent] = useState({
    event_id: "",
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    created_by: "",
  });
  const [problemList, setProblemList] = useState([]);
  const [showCreateProblemPopup, setShowCreateProblemPopup] = useState(false);
  const [curTime, setCurTime] = useState(new Date().getTime());
  const interval = setInterval(() => setCurTime(new Date().getTime()), 1000);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
    running: false,
    color: "text-slate-900",
  });
  const router = useRouter();

  const setTime = (event) => {
    let st = new Date(event.start_time).getTime();
    let et = new Date(event.end_time).getTime();
    let diff =
      st >= curTime ? st - curTime : et >= curTime ? et - curTime : 0;
    let color =
      st >= curTime
      ? "text-slate-900"
      : et >= curTime
      ? "text-blue-500"
      : "text-red-500";
    let running =
      st >= curTime
      ? false
      : et >= curTime
      ? true
      : false
    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 60 * 1000;
    let seconds = Math.floor(diff / 1000);
    let finished =
      hours === 0 && minutes === 0 && seconds === 0 && et < curTime;
    setTimeRemaining({ hours, minutes, seconds, finished, running, color });
  };

  const getEvent = (id) => {
    axios
      .get(`/api/instructor/events/${id}/?type=info`)
      .then((res) => res.data[0])
      .then((res) => {
        if (res) {
          setEvent(res);
          setTime(res);
        }
      });
  };

  const getProblemList = (id) => {
    axios
      .get(`/api/instructor/events/${id}/?type=problem_list`)
      .then((res) => res.data)
      .then((res) => {
        if (res) setProblemList(res);
      });
  };

  const handleDeleteProblem = (id) => {
    axios
      .delete(`/api/instructor/events/${eventId}/?problem_id=${id}`)
      .then((res) => res.data)
      .then((res) => {
        // Set notification for successful deletion
        router.reload();
      });
  };

  const handleEditProblem = (id) => {
    router.push(`/instructor/events/${eventId}/problems/${id}/edit`);
  };

  useEffect(() => {
    if (router.query?.event_id) {
      setEventId(router.query.event_id);
      getEvent(router.query.event_id);
      getProblemList(router.query.event_id);
    }
  }, [router.query]);

  useEffect(() => {
    setTime(event);
  }, [curTime]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    }
  }, []);

  return eventId ? (
    <Layout page="events" {...props}>
      <div className="labeval-event flex flex-row gap-4 animate-opacity w-full">
        <div className="left flex flex-col gap-4 w-3/4">
          <button
            className="w-8 h-8 bg-blue-500 flex flex-row items-center justify-center rounded-full cursor-pointer hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] duration-[350ms]"
            title="Go back"
            onClick={() => router.back()}
          >
            <BackButton height="20" width="20" color="#f8fafc" />
          </button>
          <h1 className="flex items-center"> {event.title}
            {timeRemaining.running || timeRemaining.finished ? <span className="ml-4 px-2 text-[1rem] bg-red-50 border border-solid border-red-200 text-red-500 rounded-[1rem]">
                {timeRemaining.running ? "Running" : "Finished"}
            </span> : null}
          </h1>
          <div className="time-group flex flex-row gap-4 items-center">
            <span className="flex flex-row items-center gap-2">
              <span className="font-bold">Start time:</span>
              <span>{event.start_time}</span>
              <ClockIcon height="20" width="20" />
            </span>
            <span className="flex flex-row items-center gap-2">
              <span className="font-bold">End time:</span>
              <span>{event.end_time}</span>
              <ClockIcon height="20" width="20" />
            </span>
          </div>
          <div className="event-description bg-slate-100 p-4 rounded-[5px]">
            {labevalMarkdownParser(event.description)}
          </div>
          <div className="event-problemlist flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <span className="text-2xl"> Problems </span>
              {new Date(event.start_time).getTime() > new Date().getTime() ||
                true ? (
                <button
                  className="bg-blue-500 flex flex-row items-center gap-2 px-4 rounded-[5px] h-10 text-slate-50 hover:bg-blue-600 duration-[350ms] disabled:bg-slate-400"
                  onClick={() => setShowCreateProblemPopup(true)}
                  disabled={timeRemaining.running || timeRemaining.finished}
                  title={timeRemaining.running || timeRemaining.finished ? "Can not add problems now" : "Add problems"}
                >
                  <ProblemCreateIcon height="24" width="24" color="#f8fafc" />
                  New Problem
                </button>
              ) : null}
            </div>
            <Table
              heads={[
                { content: "No", className: "w-[5%]" },
                {
                  content: "Problem Title",
                  className: "text-center",
                },
                { content: "", className: "w-[5%]" },
              ]}
              empty={problemList.length === 0}
              className="w-full"
            >
              {problemList.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{String.fromCharCode(65 + index)}</td>
                    <td>
                      <Link
                        href={`/instructor/events/${eventId}/problems/${value.problem_id
                          }?order=${String.fromCharCode(65 + index)}`}
                        className="text-blue-500 flex flex-row"
                      >
                        {value.title}
                        <button
                          className="w-6 h-6 flex flex-row items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProblem(value.problem_id);
                          }}
                        >
                          <EditIcon width="16" height="16" color="#64748b" />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <div className="flex flex-row gap-2 w-full items-center justify-center">
                        <button
                          className="w-6 h-6 border border-solid border-slate-500 flex flex-row items-center justify-center rounded-full"
                          onClick={() => handleDeleteProblem(value.problem_id)}
                        >
                          <DeleteIcon width="16" height="16" color="#64748b" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </div>
        <div className="right flex flex-col gap-4 w-[25%]">
          <div className="top flex flex-col w-full border border-solid border-slate-300 rounded-xl">
            <span className="px-4 py-2 text-xl font-semibold text-blue-600 border-b border-solid border-slate-300"> {timeRemaining.color === "text-slate-900" ? "Time to Start" : "Time Remaining"} </span>
            <span className={timeRemaining.color + " text-2xl text-center p-4 font-medium"}>
              {timeRemaining.finished
                ? "Contest Finished"
                : String(timeRemaining.hours).padStart(2, 0) +
                ":" +
                String(timeRemaining.minutes).padStart(2, 0) +
                ":" +
                String(timeRemaining.seconds).padStart(2, 0)}
            </span>
          </div>
        </div>
        {showCreateProblemPopup ? (
          <CreateProblemPopup
            setShow={setShowCreateProblemPopup}
            setNotification={props.setNotification}
            event_id={router.query.event_id}
            reload={() => getProblemList(eventId)}
          />
        ) : null}
      </div>
    </Layout>
  ) : (
    <div className="page-loader w-screen h-screen flex flex-col gap-4 items-center justify-center bg-blue-500">
      <span className="text-xl text-slate-50">Loading...</span>
      <span className="animate-loader w-12 h-12 rounded-full border-2 border-solid border-slate-50 border-b-transparent"></span>
    </div>
  );
}
