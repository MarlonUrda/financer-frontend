import { useRouter } from "next/router";

const TransactionPage = () => {
  const router = useRouter();
  const { transaction } = router.query;

  return (
    <div>
      <h1>Transaction Details</h1>
      <p>Transaction ID: {transaction}</p>
    </div>
  );
};

export default TransactionPage;
