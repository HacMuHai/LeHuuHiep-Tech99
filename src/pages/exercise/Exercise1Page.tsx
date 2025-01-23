import { Typography } from "antd";

const Exercise1Page = () => {
  const { Title } = Typography;
  const codeSnippet = `
  var sum_to_n_a = function (n) {
    if (n <= 0) return 0;
    return (n * (n + 1)) / 2;
  };

  var sum_to_n_b = function (n: number) {
    if (n <= 0) return 0;
    let sum = n;
    for (var i = 1; i < n; i++) {
      sum += i;
    }
    return sum;
  };

  var sum_to_n_c = function (n) {
    if (n <= 0) return 0;
    return sum_to_n_c(n - 1) + n;
  };
 `;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Exercise 1</Title>
      <pre
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          fontSize: "16px",
          overflowX: "auto",
        }}
      >
        <code>{codeSnippet}</code>
      </pre>
    </div>
  );
};

export default Exercise1Page;
