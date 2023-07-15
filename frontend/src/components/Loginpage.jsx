import { Button, Form, Input } from "antd";
import { useRef, useState } from "react";
import MyButton from "./MyButton";
import Apiservice from "../services/Apiservice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Loginpage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const submitRef = useRef();
  const onFinish = async (val) => {
    try {
      setIsLoading(true);
      if(isLogin){
        const resp = await Apiservice.UserService.userLogin(val.username, val.password);
        if(resp.status == 200){
          toast.success("Authenticated!")
          navigate("/job")
        } else toast.error(resp?.data?.errors?.msg ?? "error")
        setIsLoading(false);
      } else {
        const resp = await Apiservice.UserService.userRegister(val.username, val.password);
        if(resp.status === 200){
          toast.success("Registered! Please Login Again");
          setTimeout(() => {
            window.location.reload();
            setIsLoading(false);
          }, 2000);
        }
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    console.log("failed");
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center w-1/2">
      <div>DANS TEST FULLSTACK DEV</div>
      <div className="flex gap-2 items-end">
        <div className=" font-bold text-2xl">{isLogin ? "LOGIN" : "Create Account"}</div>
      </div>
      <Form
        layout="vertical"
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: "100%" }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              validator: (_, value) =>
                !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject(new Error("No spaces allowed"))
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: (_, value) =>
                !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject(new Error("No spaces allowed"))
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button
          ref={submitRef}
          type="primary"
          htmlType="submit"
          className="hidden"
        >
          Submit
        </Button>
      </Form>
      <div className="flex gap-2 items-end w-full justify-center">
        <div className="w-40">
          <MyButton
            onClick={() => submitRef?.current?.click()}
            label={isLogin ? "Login" : "Register"}
            isLoading={isLoading}
          />
        </div>
        {!isLoading && <>
          <div>or</div>
          <div
            className="hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "create account" : "sign in"}
          </div>
        </>}
      </div>
    </div>
  );
}
