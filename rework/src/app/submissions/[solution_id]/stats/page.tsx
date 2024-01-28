"use client";

import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Solutions } from "..../../../../types";
import { Bar, Chart, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import twColors from "tailwindcss/colors";
import useTheme from "@/app/hooks/useTheme";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function Stats({ params }: { params: { solution_id: string } }) {
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(true);
  const [solutions, setSolutions] = useState<any>([]);
  const [codeLengths, setCodeLengths] = useState<number[]>([]);
  const [acSolutions, setAcSolutions] = useState();
  const router = useRouter();

  const handleBgColor = (props: any, options: any) => {
    const index = props.dataIndex;
    const curSolIndex = solutions.findIndex(
      (val: Solutions, idx: number) => val.solution_id === params.solution_id
    );
    const data = props.dataset.data[index];
    return curSolIndex === index
      ? twColors.pink[500] + "80"
      : twColors.blue[500] + "40";
  };

  const handleBorderColor = (props: any, options: any) => {
    const index = props.dataIndex;
    const curSolIndex = solutions.findIndex(
      (val: Solutions, idx: number) => val.solution_id === params.solution_id
    );
    const data = props.dataset.data[index];
    return curSolIndex === index ? twColors.pink[500] : twColors.blue[500];
  };

  useEffect(() => {
    fetch(`/api/problems/submissions/?solution_id=${params.solution_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) {
          toast.error(res.status);
          router.back();
        } else {
          setSolutions(res.solutions);
          setCodeLengths(
            res.solutions
              .filter((val: Solutions) => val.verdict === "accepted")
              .map((val: Solutions) => val.code.length)
          );
        }
        setLoading(false);
      });
  }, [params.solution_id, params, router]);

  if (loading) return <Loading />;

  return (
    <div className="py-8 px-20">
      <div className="flex flex-col flex-wrap items-center justify-center">
        <Chart
          type="bar"
          data={{
            labels: solutions.map(() => ""),
            datasets: [
              {
                type: "line",
                fill: true,
                label: "Execution Time (ms)  ",
                data: solutions
                  .filter((val: Solutions) => val.verdict === "accepted")
                  .map((val: Solutions) => val!.execution_time || 0),
                borderWidth: 2,
                borderColor: handleBorderColor,
                backgroundColor: handleBorderColor,
              },
              {
                type: "bar",
                label: "Execution Time (ms)  ",
                data: solutions
                  .filter((val: Solutions) => val.verdict === "accepted")
                  .map((val: Solutions) => val!.execution_time || 0),
                borderWidth: 2,
                borderColor: handleBgColor,
                backgroundColor: handleBgColor,
              },
            ],
          }}
          options={{
            responsive: true,
            color:
              theme === "light" ? twColors.slate[400] : twColors.slate[600],
            borderColor:
              theme === "light" ? twColors.slate[400] : twColors.slate[600],
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                font: {
                  size: 20,
                },
                color: twColors.blue[500],
                display: true,
                text: "Execution Time",
              },
            },
          }}
        />

        <Chart
          type="bar"
          data={{
            labels: solutions.map(() => ""),
            datasets: [
              {
                type: "line",
                fill: true,
                label: "Memory Usage (KB)  ",
                data: solutions
                  .filter((val: Solutions) => val.verdict === "accepted")
                  .map((val: Solutions) => val!.memory_taken || 0),
                borderWidth: 2,
                borderColor: handleBorderColor,
                backgroundColor: handleBorderColor,
              },
              {
                type: "bar",
                label: "Memory Usage (KB)  ",
                data: solutions
                  .filter((val: Solutions) => val.verdict === "accepted")
                  .map((val: Solutions) => val!.memory_taken || 0),
                borderWidth: 2,
                borderColor: handleBgColor,
                backgroundColor: handleBgColor,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                font: {
                  size: 20,
                },
                color: twColors.blue[500],
                display: true,
                text: "Memory Usage",
              },
            },
          }}
        />
        <Chart
          type="bar"
          data={{
            labels: solutions.map(() => ""),
            datasets: [
              {
                type: "line",
                label: "Code Size (B)",
                fill: true,
                data: codeLengths,
                borderWidth: 2,
                borderColor: handleBorderColor,
                backgroundColor: handleBorderColor,
              },
              {
                type: "bar",
                label: "Code Size (B)",
                data: codeLengths,
                borderWidth: 2,
                borderColor: handleBgColor,
                backgroundColor: handleBgColor,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                font: {
                  size: 20,
                },
                color: twColors.blue[500],
                display: true,
                text: "Code size",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
