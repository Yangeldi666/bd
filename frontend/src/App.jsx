import React, { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const [token, setToken] = useState("mock-token"); // token fictício
  return <AppRoutes token={token} />;
}
