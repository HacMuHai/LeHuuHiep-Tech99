import { Layout } from "antd";
import Sidebar from "../layout/Sidebar";
import MainHeader from "../layout/MainHeader";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <Layout className="h-screen w-screen">
      <Sidebar />
      <Layout className="mt-0">
        <MainHeader />
        <div className="pt-2 pb-5 px-7 bg-sub h-full flex flex-col">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default Root;
