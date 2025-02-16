// src/app/signup/page.tsx

"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Form, Input, Button, DatePicker, message} from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import "./signup_page.css";
import {LoginOutlined} from "@ant-design/icons";
import {bgBlack, bgBlue} from "next/dist/lib/picocolors";

const SignupPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/#`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        member_name: values.member_name,
                        member_birthday: values.member_birthday.format("YYYY-MM-DD"),
                        member_phone: values.member_phone,
                        referrer_phone: values.referrer_phone,
                        member_password: values.member_password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                message.success("Signup successful! Redirecting to login page...");
                router.push("/login");
            } else {
                console.log(data.message);
                message.error(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            message.error("Signup failed due to an unexpected error");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <div className="w-screen h-screen">
            <div className="relative w-full h-full overflow-auto lg:pb-60 pb-20">
                <img src={"/Login-background.png"} alt="" className="object-cover w-screen h-screen"
                     id="signup-page-bg"></img>
                <div className="absolute left-0 top-0 bottom-0 w-full max-h-fit px-3 pt-1">
                    <div id="login-container"
                         className="w-full h-full bg-[#131313] border-[#737277] border-8 rounded-xl px-5">
                        <Form form={form} onFinish={onFinish} layout="vertical">
                            <div id="signup-form-title" className="flex flex-row items-baseline justify-between pb-4">
                                <h2 className="text-4xl font-black text-white">建立帳戶</h2>
                                <Image src={"/membi-logo-standard.png"} alt="Membi Logo" width={90} height={90}
                                       sizes="100vh" id="membi-logo"/>
                            </div>
                            <Form.Item
                                name="member_name"
                                label={<label>名稱</label>}
                                rules={[{required: true, message: "請輸入名稱"}]}
                                className="form-item"
                            >
                                <Input placeholder="請輸入名稱" className="form-item-input"/>
                            </Form.Item>
                            <Form.Item
                                name="member_birthday"
                                label={<label>生日</label>}
                                rules={[{required: true, message: "請選擇生日"}]}
                                className="form-item"
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    style={{width: "100%"}}
                                    placeholder="請選擇生日"
                                    className="form-item-input"
                                />
                            </Form.Item>
                            <Form.Item
                                name="member_phone"
                                label={<label>電話號碼</label>}
                                rules={[
                                    {required: true, message: "請輸入電話號碼"},
                                    {pattern: /^\d{8}$/, message: "電話號碼必須是8位數字"},
                                ]}
                                className="form-item"
                            >
                                <Input placeholder="請輸入電話號碼" className="form-item-input"/>
                            </Form.Item>
                            <Form.Item
                                name="member_password"
                                label={<label>密碼</label>}
                                rules={[{required: true, message: "請輸入密碼"}]}
                                hasFeedback
                                className="form-item"
                            >
                                <Input.Password placeholder="請輸入密碼" className="form-item-input"/>
                            </Form.Item>
                            <Form.Item
                                name="confirm_password"
                                label={<label>確認密碼</label>}
                                dependencies={["member_password"]}
                                hasFeedback
                                rules={[
                                    {required: true, message: "請確認密碼"},
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("member_password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("兩次輸入的密碼不一致"));
                                        },
                                    }),
                                ]}
                                className="form-item"
                            >
                                <Input.Password placeholder="請再次輸入密碼" className="form-item-input"/>
                            </Form.Item>
                            <Form.Item
                                name="referrer_phone"
                                label={<label>推薦人電話（如有）</label>}
                                rules={[
                                    {required: false},
                                    // { pattern: /^\d{8}$/, message: '電話號碼必須是8位數字' },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("member_phone") !== value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error("推薦人電話號碼不能與您的電話號碼相同呢")
                                            );
                                        },
                                    }),
                                ]}
                                className="form-item"
                            >
                                <Input placeholder="請輸入推薦人電話號碼（可選）" className="form-item-input"/>
                            </Form.Item>
                            <Form.Item className="signup-form-submit flex flex-row-reverse">
                                <Button type="primary" htmlType="submit" loading={loading} id="signup-submit-btn"
                                        style={{backgroundColor: "#D74D03"}}>
                                    <p className="text-xs text-white">確定</p>
                                    <LoginOutlined id="login-svg-link"
                                                   style={{color: "#0B49A0", height: "24px", width: "24px"}}/>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <div id="login-account" className="absolute bottom-0 w-full h-20">
                <Button type="link" onClick={handleLogin} id="login-button"
                        style={{
                            borderRadius: 0,
                            backgroundColor: "#FFF1D0",
                            width: "100%",
                            height: "100%",
                            padding: "5px"
                        }}>
                    <h2 className="text-[#131313] text-4xl font-black text-center">登入帳戶</h2>
                </Button>
            </div>
        </div>
    );
};

export default SignupPage;
