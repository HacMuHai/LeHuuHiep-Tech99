import {
  CodeSandboxOutlined,
  DesktopOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { path } from "../routes/path";
import { Menu, MenuProps } from "antd";
import { Exercise1Page } from "../pages";
import Exercise4Page from "../pages/exercise/Exercise4Page";
import Exercise5Page from "../pages/exercise/Exercise5Page";
import Exercise6Page from "../pages/exercise/Exercise6Page";
import Exercise2Page from "../pages/exercise/Exercise2Page";
import Exercise3Page from "../pages/exercise/Exercise3Page";

type MenuItem = Required<MenuProps>["items"][number];

const selectedKeys = [
  [path.EXERCISE1],
  [path.EXERCISE2],
  [path.EXERCISE3],
  [path.EXERCISE4],
  [path.EXERCISE5],
  [path.EXERCISE6],
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = (pathname: string) => {
    for (const keys of selectedKeys) if (keys.includes(pathname)) return keys;

    return [pathname];
  };

  const getItem = useCallback(
    (
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[]
    ) => {
      return {
        key,
        icon,
        children,
        label,
        onClick: (item) => navigate(item.key),
      } as MenuItem;
    },
    [navigate]
  );

  const items: MenuItem[] = [
    {
      title: "Front-end",
      key: "Front-end",
      icon: <DesktopOutlined />,
      children: [
        {
          title: "Exercise 1",
          path: path.EXERCISE1,
          element: <Exercise1Page />,
        },
        {
          title: "Exercise 2",
          path: path.EXERCISE2,
          element: <Exercise2Page />,
        },
        {
          title: "Exercise 3",
          path: path.EXERCISE3,
          element: <Exercise3Page />,
        },
      ],
    },
    {
      title: "Back-end",
      key: "Back-end",
      icon: <CodeSandboxOutlined />,
      children: [
        {
          title: "Exercise 4",
          path: path.EXERCISE4,
          element: <Exercise4Page />,
        },
        {
          title: "Exercise 5",
          path: path.EXERCISE5,
          element: <Exercise5Page />,
        },
        {
          title: "Exercise 6",
          path: path.EXERCISE6,
          element: <Exercise6Page />,
        },
      ],
    },
  ].map((item: any) => {
    const children = item.children.map((child: any) => {
      return getItem(child.title, child.path);
    });

    return getItem(item.title, item.key, item.icon, children);
  });

  return (
    <Sider
      collapsible
      width={262}
      trigger={null}
      collapsed={collapsed}
      theme="light"
      className="drop-shadow-lg relative"
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        onClick={() => setCollapsed((prev) => !prev)}
        className="z-50 absolute bg-white cursor-pointer top-[75px] right-[-10px] w-[24px] h-[24px] leading-[24px] rounded-full shadow-sm text-center border-none hover:bg-amber-50"
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>
      {/* <div className="flex items-center justify-start py-5 ml-5">
        <div
          onClick={() => navigate(`${path.ROOT}`)}
          className="cursor-pointer"
        >
          LÊ HỮU HIỆP
        </div>
      </div> */}
      <Menu
        mode="inline"
        items={items}
        style={{
          minWidth: 0,
          flex: "auto",
          background: "transparent",
        }}
        defaultOpenKeys={location.state?.key ? [location.state.key] : []}
        selectedKeys={getSelectedKey(location.pathname)}
        onSelect={(e) => {
          navigate(e.keyPath[0], {
            state: { key: e.keyPath.length > 1 ? e.keyPath[1] : undefined },
          });
        }}
      />
    </Sider>
  );
};

export default Sidebar;
