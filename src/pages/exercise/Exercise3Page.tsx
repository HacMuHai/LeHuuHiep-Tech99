import { Typography } from "antd";

const Exercise3Page = () => {
  const { Title } = Typography;

  const codeSnippet = `
  1. interface WalletBalance: thêm trường blockchain(string), 
  => Vì ta có sử dụng blockchain với WalletBalance, không thêm trường blockchain sẽ gây ra lỗi TS
  ví dụ: getPriority(balance.blockchain)

  2.interface FormattedWalletBalance: kế thừa từ WalletBalance, thêm trường formatted(string), usdValue(number)
  => tái sử dụng các trường của WalletBalance giúp dễ đọc và đúng ngữ nghĩa hơn, thêm trường formatted 
  và usdValue để lưu giá trị đã được format và giá trị USD tương ứng

  3. Tối ưu hóa hàm getPriority bằng cách thay swich case bằng object map
  => giúp code dễ đọc và dễ bảo trì hơn

  4. Không nhất thiết phải dùng useMemo
  => hàm không quá phức tạp, các biến balances, prices không thay đổi nhiều

  5. Hàm filter và sort balances: sử dụng balance.blockchain nhưng không được khai báo,
  khai báo balancePriority nhưng lại dùng lhsPriority gây lỗi biến không tồn tại
  => thêm trường blockchain cho WalletBalance

  6. Viết lại filter và sort balances: sử dụng nhiều if else không cần thiết 
  => gọn và dễ hiểu hơn

  7. formattedBalances: tính toán luôn usdValue
  => tối ưu hóa code, giảm số lần tính 
  
  8. key của WalletRow: không nên dùng index
  => Vì index có thể thay đổi khi dữ liệu thay đổi, nên dùng date + index hoặc balance.currency
  `;

  const codeSnippet2 = `
  // thêm trường blockchain cho WalletBalance
  interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }

  //kế thừa từ WalletBalance
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
    usdValue: number;
  }

  interface Props extends BoxProps {}

  // Object map cho getPriority
  const priorityMap: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };

  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    // Tối ứu lại với object map
    const getPriority = (blockchain: string): number =>
      priorityMap[blockchain] ?? -99;

    // Lọc và sắp xếp balances được viết lại
    const sortedBalances = balances.filter(
      (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
    ).sort(
      (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
    );

    // Format balances (bao gồm USD value)
    const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
      (balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue: (prices[balance.currency] || 0) * balance.amount,
      })
    );

    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => (
      <WalletRow 
        className={classes.row}
        key={index} //có thể thành date + index nếu cần ví dụ: new Date().getTime() + index
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    ));

    return <div {...rest}>{rows}</div>;
  };  `;

  return (
    <div className="!pb-20 !p-5 mb-5 max-h-full overflow-auto">
      <Title level={3}>Exercise 3</Title>
      <Title level={5}>Nhận xét</Title>
      <pre className="bg-white !p-5 rounded-lg text-lg">
        <code>{codeSnippet}</code>
      </pre>
      <Title level={5}>Viết lại</Title>
      <pre className="bg-white !p-5 rounded-lg text-lg">
        <code>{codeSnippet2}</code>
      </pre>
    </div>
  );
};

export default Exercise3Page;
