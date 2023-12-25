import Layout from "@/components/Layout";

export default function Dashboard(props) {
  return (
    <div className="instructor-dashboard animate-opacity">
      <Layout page={"dashboard"} title={"Dashboard"} {...props} />
    </div>
  );
}
