import { Button } from "@heroui/react";
import Link from "next/link";

const ServerErrorPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-danger-500">500</h1>
      <p className="text-xl text-default-500">Internal server error</p>
      <Button as={Link} href="/" color="danger">
        Go Home
      </Button>
    </div>
  );
};

export default ServerErrorPage;
