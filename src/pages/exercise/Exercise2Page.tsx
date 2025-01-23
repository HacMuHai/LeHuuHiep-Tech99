import { useState } from "react";
import { Card, Input, Button, Typography, Form, Flex } from "antd";
import "antd/dist/reset.css";
import { useForm } from "antd/es/form/Form";

const { Title, Text } = Typography;

const Exercise2Page = () => {
  const [form] = useForm();
  const [result, setResult] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();

  function formatNumber(number: number, format = "vi-VN", unit?: number) {
    if (number === undefined || number === null) {
      return "-";
    } else {
      const numberString = new Intl.NumberFormat(format, {
        minimumFractionDigits: 0,
        maximumFractionDigits:
          unit != undefined ? Math.ceil(Math.log(unit) / Math.LN10) : 6,
      }).format(number);
      return `${numberString}`;
    }
  }

  const handleOnChangeNumberWithDecimal = (value: any) => {
    // console.log('first value', value.target.value);
    const newValue = value.target.value;
    const name = value.target.id;

    if (newValue == "") {
      form.setFields([{ name: name, errors: [], value: "" }]);
      return;
    }

    const valueFormatted = newValue.split(",");
    if (valueFormatted.length > 2) {
      form.setFields([{ name: name, errors: [""] }]);
      setMessage(`Invalid decimal format`);
      return;
    }

    valueFormatted[0] = valueFormatted[0].replace(/\./g, "");
    if (
      valueFormatted[0] !== "" &&
      !/^-?$|^-?(?:\d{1,3}(?:\.\d{3})*|\d+)(,\d+)?$/.test(valueFormatted[0])
    ) {
      form.setFields([{ name: name, errors: [""] }]);
      setMessage("Only numbers are allowed");
      return;
    }

    if (valueFormatted[1] && !/^\d+$/.test(valueFormatted[1])) {
      form.setFields([{ name: name, errors: [""] }]);
      setMessage("Invalid decimal format");
      return;
    }

    const numericValue = Number(valueFormatted[0]);
    if (!isNaN(numericValue)) {
      form.setFields([
        {
          name: name,
          errors: [],
          value:
            valueFormatted?.length == 1
              ? formatNumber(numericValue)
              : formatNumber(numericValue) +
                `,${valueFormatted[1] ? valueFormatted[1] : ""}`,
        },
      ]);
      setMessage(undefined);
    } else {
      form.setFieldsValue({ [name]: undefined });
      setMessage(undefined);
    }
  };

  const handleConvert = (value: any) => {
    const { exchangeRate, amount } = value;
    if (exchangeRate && amount) {
      const exchangeRateNumber = parseFloat(
        exchangeRate.toString().replace(/\./g, "").replace(",", ".")
      );
      const amountNumber = parseFloat(
        amount.toString().replace(/\./g, "").replace(",", ".")
      );
      setResult(formatNumber(exchangeRateNumber * amountNumber));
    } else {
      setResult(undefined);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      className="h-full bg-[#f5f5f5] p-5 pb-0"
    >
      <Card className="shadow-[#0000001a] shadow w-[500px] p-5 rounded-lg">
        <Title level={3} style={{ color: "#3875f6", textAlign: "center" }}>
          Currency Converter
        </Title>
        {/* print message center here */}
        {message && (
          <Title level={5} className="!leading-1 !text-red-500 text-center">
            {message}
          </Title>
        )}
        <Form form={form} layout="vertical" onFinish={handleConvert}>
          <Form.Item
            label="Exchange Rate (1 USD to VND):"
            name={"exchangeRate"}
          >
            <Input
              allowClear
              size="large"
              className={`w-full`}
              placeholder="e.g..,"
              onChange={handleOnChangeNumberWithDecimal}
            />
          </Form.Item>
          <Form.Item label="Amount (in USD):" name={"amount"}>
            <Input
              allowClear
              size="large"
              className={`w-full`}
              placeholder="e.g..,"
              onChange={handleOnChangeNumberWithDecimal}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: "#3875f6", borderColor: "#3875f6" }}
          >
            Convert
          </Button>
        </Form>
        {result !== undefined && (
          <div className="mt-5 text-center p-2 bg-[#e8f0fe] rounded-md">
            <Text style={{ color: "#3875f6", fontWeight: "bold" }}>
              Converted Amount: {result} VND
            </Text>
          </div>
        )}
      </Card>
    </Flex>
  );
};

export default Exercise2Page;
