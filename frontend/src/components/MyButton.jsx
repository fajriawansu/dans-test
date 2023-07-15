import { Spin } from "antd";

// eslint-disable-next-line react/prop-types
export default function MyButton({ label, onClick, isLoading }) {
  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={() => {
        if (onClick) onClick();
      }}
      className=" w-full text-center p-2 bg-blue-500 text-white hover:text-black hover:bg-white border border-blue-500 rounded-md cursor-pointer"
    >
      {isLoading ? <Spin /> : label}
    </button>
  );
}
