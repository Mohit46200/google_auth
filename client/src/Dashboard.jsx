const Dashboard = () => {
  const token = localStorage.getItem("token");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Dashboard</h1>
      <p>Your JWT Token:</p>
      <textarea value={token} rows={5} cols={50} readOnly />
    </div>
  );
};

export default Dashboard;