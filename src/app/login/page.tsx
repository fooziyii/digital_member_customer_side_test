// src/app/login/page.tsx

'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {EyeInvisibleOutlined, EyeOutlined, LoginOutlined} from '@ant-design/icons';
import './LoginPage.css';
import {Form, Button, Input, Alert, ConfigProvider, message, FormProps} from 'antd';
import Image from "next/image";

type FieldType = {
    memberPhone?: number;
    memberPassword?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [wrongInfo, setWrongInfo] = useState(false);

    const handleSubmit: FormProps<FieldType>['onFinish'] = async (values: any) => {
        setWrongInfo(false);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/#`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify({member_phone: values.memberPhone, member_password: values.memberPassword}),
        });
        if (response.ok) {
            router.push('/dashboard');
        } else {
            const errorData = await response.json();
            console.error('Login error:', errorData.error);
            setWrongInfo(true);
        }
    };

    const handleSignup = () => {
        router.push('/signup');
    };

    return (

        <ConfigProvider theme={{token: {colorPrimary: '#FFF1D0'}}}>
            <div className="w-screen h-screen">
                <div className="relative w-full h-full overflow-auto">
                    <img src={"/Login-background.png"} alt="" className="object-cover w-screen h-screen"
                         id="signup-page-bg"></img>
                    <div
                        className="absolute left-0 top-0 w-full h-full px-3 pt-1 flex flex-col items-center justify-center pb-20">
                        <div className="logo-section items-center justify-center flex pb-4">
                            <div className="logo-wrapper">
                                <Image
                                    src="/membi-logo-standard.png"
                                    alt="MM9 Creative Co. Logo"
                                    width={200} height={200} sizes='100vh'
                                    id="logo-image"
                                />
                            </div>
                        </div>

                        <div
                            className="login-container w-full max-h-fit bg-[#FFF1D0] border-[#FAB24F] border-8 rounded-xl pt-10 pb-10 px-5">
                            <div className="form-container">
                                <Form
                                    form={form}
                                    onFinish={handleSubmit}
                                    onFinishFailed={onFinishFailed}
                                    layout="vertical"
                                    className="login-form"
                                >
                                    <Form.Item className='form-title'><h1
                                        className="text-right font-black text-[#131313] text-3xl">登入帳戶</h1>
                                    </Form.Item>
                                    <Form.Item<FieldType> name="memberPhone" className="ant-form-item-field">
                                        <Input placeholder="電話號碼" className="input-field" type='tel'/>
                                    </Form.Item>
                                    <Form.Item<FieldType> name="memberPassword" className="ant-form-item-field">
                                        <Input.Password
                                            placeholder="密碼"
                                            type={showPassword ? 'text' : 'password'}
                                            className="input-field-password"
                                            iconRender={(visible) => (visible ?
                                                <EyeOutlined style={{color: "#D74D03"}} width={20} height={14}/> :
                                                <EyeInvisibleOutlined style={{color: "#D74D03"}} width={20}
                                                                      height={14}/>)}
                                        />
                                    </Form.Item>
                                    <Form.Item className="login-button-container flex flex-row-reverse" label={null}>
                                        <Button color="default" variant="solid" htmlType="submit" id='login-btn'
                                                style={{backgroundColor: "#131313"}}>
                                            <p className="text-xs">登入</p>
                                            <LoginOutlined id="login-svg" style={{color: "#D74D03"}} width={24}
                                                           height={24}/>
                                        </Button>
                                    </Form.Item>
                                </Form>
                                {wrongInfo ? <div><Alert message="電話號碼或密碼錯誤" type="error"/></div> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="create-account" className="absolute bottom-0 w-full h-20">
                    <Button type="link" onClick={handleSignup} id="signup-button" style={{
                        borderRadius: 0,
                        backgroundColor: "#131313",
                        width: "100%",
                        height: "100%",
                        padding: "5px"
                    }}>
                        <h2 className="text-white text-4xl font-black text-center">創建帳戶</h2>
                    </Button>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default LoginPage;